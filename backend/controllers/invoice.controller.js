import Invoice from "../models/Invoice.js";
import AppError from "../utils/error.util.js";
import { formatAmount } from "../utils/billing.util.js";

const normalizeEmail = (email) => (email || "").toLowerCase().trim();

// Serializes an invoice document for the client, adding a pre-formatted amount
// string so the frontend doesn't reimplement currency formatting.
const serializeInvoice = (invoice) => ({
    id: invoice._id,
    invoiceNumber: invoice.invoiceNumber,
    plan: invoice.plan,
    amountCents: invoice.amountCents,
    currency: invoice.currency,
    amountFormatted: formatAmount(invoice.amountCents, invoice.currency),
    status: invoice.status,
    description: invoice.description,
    periodStart: invoice.periodStart,
    periodEnd: invoice.periodEnd,
    createdAt: invoice.createdAt,
});

// Lists a user's invoices, newest first.
const listInvoices = async (req, res, next) => {
    try {
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const limit = Math.min(Number(req.query.limit) || 50, 200);
        const invoices = await Invoice.find({ email })
            .sort({ createdAt: -1 })
            .limit(limit);

        const totalPaidCents = invoices
            .filter((i) => i.status === "paid")
            .reduce((sum, i) => sum + i.amountCents, 0);

        res.status(200).json({
            success: true,
            invoices: invoices.map(serializeInvoice),
            summary: {
                count: invoices.length,
                totalPaidCents,
                totalPaidFormatted: formatAmount(totalPaidCents),
            },
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Fetches a single invoice by id. Requires the owner's email to prevent users
// reading invoices that are not theirs.
const getInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const email = normalizeEmail(req.query.email);
        if (!email) return next(new AppError("Email is required", 400));

        const invoice = await Invoice.findById(id);
        if (!invoice || invoice.email !== email) {
            return next(new AppError("Invoice not found", 404));
        }

        res.status(200).json({ success: true, invoice: serializeInvoice(invoice) });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export { listInvoices, getInvoice };
