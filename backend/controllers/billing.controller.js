import Subscription from "../models/Subscription.js";
import Invoice from "../models/Invoice.js";
import BillingEvent from "../models/BillingEvent.js";
import Course from "../models/Course.js";
import AppError from "../utils/error.util.js";
import { PLANS, isValidPlan } from "../config/plans.js";
import {
    generateInvoiceNumber,
    addMonths,
    formatAmount,
} from "../utils/billing.util.js";

const normalizeEmail = (email) => (email || "").toLowerCase().trim();

// Mock 30-day billing period for paid plans; free plans have no period end.
const periodEndFor = (plan, from = new Date()) =>
    plan === "free" ? null : addMonths(from, 1);

// Records an entry in the append-only billing activity log. Best-effort: a
// logging failure must never break the primary billing action.
const logEvent = async (email, type, description, metadata = {}) => {
    try {
        await BillingEvent.create({ email, type, description, metadata });
    } catch (error) {
        console.error("Failed to record billing event:", error.message);
    }
};

// Returns the caller's subscription, creating a default "free" record on first
// access so every known user always has a billing state to read.
const ensureSubscription = async (email) => {
    let subscription = await Subscription.findOne({ email });
    if (!subscription) {
        subscription = await Subscription.create({
            email,
            plan: "free",
            status: "active",
            courseLimit: PLANS.free.courseLimit,
        });
    }
    return subscription;
};

const getSubscription = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const subscription = await ensureSubscription(email);

        res.status(200).json({ success: true, subscription, plans: PLANS });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Mock checkout: marks the user as subscribed to the requested plan, generates
// an invoice for paid plans, and logs the activity. No real payment provider is
// contacted — swap this body for a Stripe Checkout Session later without
// changing the route contract.
const subscribe = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.body.email);
        const { plan } = req.body;

        if (!email) return next(new AppError("Email is required", 400));
        if (!isValidPlan(plan)) return next(new AppError("Invalid plan", 400));

        const planConfig = PLANS[plan];
        const periodStart = new Date();
        const periodEnd = periodEndFor(plan, periodStart);

        const subscription = await Subscription.findOneAndUpdate(
            { email },
            {
                email,
                plan,
                status: "active",
                courseLimit: planConfig.courseLimit,
                currentPeriodEnd: periodEnd,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        let invoice = null;
        const amountCents = Math.round(planConfig.price * 100);
        if (amountCents > 0) {
            invoice = await Invoice.create({
                email,
                invoiceNumber: generateInvoiceNumber(),
                plan,
                amountCents,
                currency: "USD",
                status: "paid",
                description: `${planConfig.name} plan subscription`,
                periodStart,
                periodEnd,
            });
            await logEvent(
                email,
                "invoice_paid",
                `Paid ${formatAmount(amountCents)} for ${planConfig.name} plan`,
                { invoiceNumber: invoice.invoiceNumber }
            );
        }

        await logEvent(
            email,
            "subscription_created",
            `Subscribed to the ${planConfig.name} plan`,
            { plan }
        );

        res.status(200).json({
            success: true,
            message: `Subscribed to ${planConfig.name}`,
            subscription,
            invoice,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Downgrades the user back to the free plan and logs the cancellation.
const cancelSubscription = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.body.email);
        if (!email) return next(new AppError("Email is required", 400));

        const subscription = await Subscription.findOneAndUpdate(
            { email },
            {
                plan: "free",
                status: "canceled",
                courseLimit: PLANS.free.courseLimit,
                currentPeriodEnd: null,
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        await logEvent(
            email,
            "subscription_canceled",
            "Subscription canceled — reverted to Free plan"
        );

        res.status(200).json({
            success: true,
            message: "Subscription canceled",
            subscription,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Reports the user's current course usage against their plan limit. `limit` is
// null for unlimited (Pro). Used by the dashboard usage meter and as the basis
// for quota enforcement on course creation.
const getUsage = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const subscription = await ensureSubscription(email);
        const used = await Course.countDocuments({ createdBy: email });
        const limit = subscription.courseLimit ?? null;
        const unlimited = limit == null;
        const remaining = unlimited ? null : Math.max(limit - used, 0);
        const percentUsed = unlimited
            ? 0
            : Math.min(Math.round((used / limit) * 100), 100);

        res.status(200).json({
            success: true,
            usage: {
                plan: subscription.plan,
                used,
                limit,
                unlimited,
                remaining,
                percentUsed,
                canCreate: unlimited || used < limit,
            },
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Returns the billing activity timeline, newest first.
const getBillingEvents = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const limit = Math.min(Number(req.query.limit) || 25, 100);
        const events = await BillingEvent.find({ email })
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json({ success: true, events });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {
    getSubscription,
    subscribe,
    cancelSubscription,
    getUsage,
    getBillingEvents,
};
