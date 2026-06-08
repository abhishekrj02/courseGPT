import Subscription from "../models/Subscription.js";
import AppError from "../utils/error.util.js";
import { PLANS, isValidPlan } from "../config/plans.js";

const normalizeEmail = (email) => (email || "").toLowerCase().trim();

// Mock 30-day billing period for paid plans; free plans have no period end.
const periodEndFor = (plan) =>
    plan === "free" ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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

// Mock checkout: marks the user as subscribed to the requested plan. No real
// payment provider is contacted — swap this body for a Stripe Checkout Session
// later without changing the route contract.
const subscribe = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.body.email);
        const { plan } = req.body;

        if (!email) return next(new AppError("Email is required", 400));
        if (!isValidPlan(plan)) return next(new AppError("Invalid plan", 400));

        const planConfig = PLANS[plan];
        const subscription = await Subscription.findOneAndUpdate(
            { email },
            {
                email,
                plan,
                status: "active",
                courseLimit: planConfig.courseLimit,
                currentPeriodEnd: periodEndFor(plan),
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({
            success: true,
            message: `Subscribed to ${planConfig.name}`,
            subscription,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Downgrades the user back to the free plan.
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

        res.status(200).json({
            success: true,
            message: "Subscription canceled",
            subscription,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export { getSubscription, subscribe, cancelSubscription };
