import mongoose from "mongoose";

// A saved (mock) payment method. Only non-sensitive fields are persisted —
// never the full PAN or CVC. In a real integration these would be opaque
// tokens returned by the payment provider.
const PaymentMethodSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            index: true,
        },
        brand: { type: String, default: "card" },
        last4: {
            type: String,
            required: true,
            match: [/^\d{4}$/, "last4 must be exactly 4 digits"],
        },
        expMonth: { type: Number, required: true, min: 1, max: 12 },
        expYear: { type: Number, required: true },
        holderName: { type: String, default: "", trim: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("PaymentMethod", PaymentMethodSchema);
