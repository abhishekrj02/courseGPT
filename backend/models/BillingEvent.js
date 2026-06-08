import mongoose from "mongoose";

// An append-only audit log of billing-related activity, surfaced to the user
// as a timeline. Mirrors the kind of event stream a real provider would emit
// via webhooks.
const BillingEventSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            index: true,
        },
        type: {
            type: String,
            enum: [
                "subscription_created",
                "subscription_canceled",
                "invoice_paid",
                "payment_method_added",
                "payment_method_removed",
                "payment_method_default_changed",
            ],
            required: true,
        },
        description: { type: String, default: "" },
        metadata: { type: Object, default: {} },
    },
    { timestamps: true }
);

export default mongoose.model("BillingEvent", BillingEventSchema);
