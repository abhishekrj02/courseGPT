import mongoose from "mongoose";

// An immutable record of a single billing charge. Created whenever a user
// subscribes to (or renews) a paid plan. Amounts are stored in integer cents
// to avoid floating-point rounding.
const InvoiceSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            index: true,
        },
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        plan: { type: String, enum: ["free", "pro"], required: true },
        amountCents: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "USD" },
        status: {
            type: String,
            enum: ["paid", "refunded", "void"],
            default: "paid",
        },
        description: { type: String, default: "" },
        periodStart: { type: Date, default: null },
        periodEnd: { type: Date, default: null },
    },
    { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
