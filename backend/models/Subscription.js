import mongoose from "mongoose";

// A user's billing state, keyed by the email Clerk identifies them with
// (the same identity used for course ownership via `createdBy`). Decoupled
// from the password-required `User` model so Clerk-authenticated users can
// own a subscription without a backend credential record.
const SubscriptionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        plan: { type: String, enum: ["free", "pro"], default: "free" },
        status: { type: String, enum: ["active", "canceled"], default: "active" },
        // null => unlimited
        courseLimit: { type: Number, default: 15 },
        currentPeriodEnd: { type: Date, default: null },
    },
    { timestamps: true }
);

export default mongoose.model("Subscription", SubscriptionSchema);
