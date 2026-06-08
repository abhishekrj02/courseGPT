import PaymentMethod from "../models/PaymentMethod.js";
import BillingEvent from "../models/BillingEvent.js";
import AppError from "../utils/error.util.js";
import {
    maskCardNumber,
    detectCardBrand,
    validateCardInput,
} from "../utils/billing.util.js";

const normalizeEmail = (email) => (email || "").toLowerCase().trim();

const logEvent = async (email, type, description, metadata = {}) => {
    try {
        await BillingEvent.create({ email, type, description, metadata });
    } catch (error) {
        console.error("Failed to record billing event:", error.message);
    }
};

const serializeMethod = (method) => ({
    id: method._id,
    brand: method.brand,
    last4: method.last4,
    expMonth: method.expMonth,
    expYear: method.expYear,
    holderName: method.holderName,
    isDefault: method.isDefault,
    createdAt: method.createdAt,
});

// Lists a user's saved payment methods, default first then newest.
const listPaymentMethods = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const methods = await PaymentMethod.find({ email }).sort({
            isDefault: -1,
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            paymentMethods: methods.map(serializeMethod),
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Adds a (mock) payment method. Only the last four digits and metadata are
// stored — never the full card number or CVC.
const addPaymentMethod = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.body.email);
        const { cardNumber, expMonth, expYear, cvc, holderName } = req.body;

        if (!email) return next(new AppError("Email is required", 400));

        const validationError = validateCardInput({
            cardNumber,
            expMonth,
            expYear,
            cvc,
        });
        if (validationError) return next(new AppError(validationError, 400));

        // First card added becomes the default automatically.
        const existingCount = await PaymentMethod.countDocuments({ email });
        const isDefault = existingCount === 0;

        const method = await PaymentMethod.create({
            email,
            brand: detectCardBrand(cardNumber),
            last4: maskCardNumber(cardNumber),
            expMonth: Number(expMonth),
            expYear: Number(expYear),
            holderName: holderName || "",
            isDefault,
        });

        await logEvent(
            email,
            "payment_method_added",
            `Added ${method.brand} card ending in ${method.last4}`,
            { paymentMethodId: method._id }
        );

        res.status(201).json({
            success: true,
            message: "Payment method added",
            paymentMethod: serializeMethod(method),
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Promotes a payment method to the default, clearing the flag on all others.
const setDefaultPaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const email = normalizeEmail(req.body.email);
        if (!email) return next(new AppError("Email is required", 400));

        const method = await PaymentMethod.findById(id);
        if (!method || method.email !== email) {
            return next(new AppError("Payment method not found", 404));
        }

        await PaymentMethod.updateMany({ email }, { isDefault: false });
        method.isDefault = true;
        await method.save();

        await logEvent(
            email,
            "payment_method_default_changed",
            `Set ${method.brand} card ending in ${method.last4} as default`,
            { paymentMethodId: method._id }
        );

        res.status(200).json({
            success: true,
            message: "Default payment method updated",
            paymentMethod: serializeMethod(method),
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Removes a payment method. If the default was removed, the most recently added
// remaining card is promoted to default.
const removePaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const email = normalizeEmail(req.body.email);
        if (!email) return next(new AppError("Email is required", 400));

        const method = await PaymentMethod.findById(id);
        if (!method || method.email !== email) {
            return next(new AppError("Payment method not found", 404));
        }

        const wasDefault = method.isDefault;
        await method.deleteOne();

        if (wasDefault) {
            const replacement = await PaymentMethod.findOne({ email }).sort({
                createdAt: -1,
            });
            if (replacement) {
                replacement.isDefault = true;
                await replacement.save();
            }
        }

        await logEvent(
            email,
            "payment_method_removed",
            `Removed ${method.brand} card ending in ${method.last4}`,
            { paymentMethodId: method._id }
        );

        res.status(200).json({
            success: true,
            message: "Payment method removed",
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {
    listPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod,
};
