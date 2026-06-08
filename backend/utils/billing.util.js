// Shared billing helpers used by the billing, invoice and payment-method
// controllers. Kept framework-free so they can be unit-tested in isolation.

// Generates a human-readable, time-sortable invoice number, e.g. INV-20260608-4F2A.
export const generateInvoiceNumber = () => {
    const now = new Date();
    const date =
        `${now.getFullYear()}` +
        `${String(now.getMonth() + 1).padStart(2, "0")}` +
        `${String(now.getDate()).padStart(2, "0")}`;
    const random = Math.random().toString(16).slice(2, 6).toUpperCase();
    return `INV-${date}-${random}`;
};

// Adds `months` calendar months to a date, returning a new Date.
export const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

// Formats an integer cent amount as a currency string, e.g. 900 -> "$9.00".
export const formatAmount = (amountCents, currency = "USD") => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };
    const symbol = symbols[currency] || "";
    return `${symbol}${(amountCents / 100).toFixed(2)}`;
};

// Masks a card number down to its last four digits for safe storage/display.
export const maskCardNumber = (cardNumber) => {
    const digits = String(cardNumber || "").replace(/\D/g, "");
    return digits.slice(-4);
};

// Naive card-brand detection from the leading digits. Good enough for the mock
// flow; a real integration would rely on the payment provider's metadata.
export const detectCardBrand = (cardNumber) => {
    const digits = String(cardNumber || "").replace(/\D/g, "");
    if (/^4/.test(digits)) return "visa";
    if (/^5[1-5]/.test(digits)) return "mastercard";
    if (/^3[47]/.test(digits)) return "amex";
    if (/^6(?:011|5)/.test(digits)) return "discover";
    return "card";
};

// Basic validation: 13-19 digit number, future-ish expiry, 3-4 digit CVC.
export const validateCardInput = ({ cardNumber, expMonth, expYear, cvc }) => {
    const digits = String(cardNumber || "").replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) {
        return "Card number must be between 13 and 19 digits";
    }
    const month = Number(expMonth);
    if (!month || month < 1 || month > 12) {
        return "Expiry month must be between 1 and 12";
    }
    const year = Number(expYear);
    const currentYear = new Date().getFullYear();
    if (!year || year < currentYear || year > currentYear + 20) {
        return "Expiry year is invalid";
    }
    const cvcDigits = String(cvc || "").replace(/\D/g, "");
    if (cvcDigits.length < 3 || cvcDigits.length > 4) {
        return "CVC must be 3 or 4 digits";
    }
    return null;
};
