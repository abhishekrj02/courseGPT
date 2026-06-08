import express from "express";
import {
    getSubscription,
    subscribe,
    cancelSubscription,
    getUsage,
    getBillingEvents,
} from "../controllers/billing.controller.js";
import {
    listInvoices,
    getInvoice,
} from "../controllers/invoice.controller.js";
import {
    listPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod,
} from "../controllers/paymentMethod.controller.js";

const router = express.Router();

// Subscription lifecycle
router.get("/", getSubscription);
router.post("/subscribe", subscribe);
router.post("/cancel", cancelSubscription);

// Usage metering & activity log
router.get("/usage", getUsage);
router.get("/events", getBillingEvents);

// Invoices
router.get("/invoices", listInvoices);
router.get("/invoices/:id", getInvoice);

// Payment methods
router.get("/payment-methods", listPaymentMethods);
router.post("/payment-methods", addPaymentMethod);
router.patch("/payment-methods/:id/default", setDefaultPaymentMethod);
router.delete("/payment-methods/:id", removePaymentMethod);

export default router;
