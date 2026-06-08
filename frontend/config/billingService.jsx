import axios from "axios";

// Backend billing API client. Uses the same server base URL as the rest of the
// app (NEXT_PUBLIC_SERVER_URL) and identifies the user by their Clerk email.
const BILLING_URL = (process.env.NEXT_PUBLIC_SERVER_URL || "") + "/api/billing";

/* -------------------------------- Subscription ------------------------------- */

export const getSubscription = async (email) => {
  const res = await axios.get(BILLING_URL, { params: { email } });
  return res.data; // { success, subscription, plans }
};

export const subscribePlan = async (email, plan) => {
  const res = await axios.post(`${BILLING_URL}/subscribe`, { email, plan });
  return res.data; // { success, message, subscription, invoice }
};

export const cancelSubscription = async (email) => {
  const res = await axios.post(`${BILLING_URL}/cancel`, { email });
  return res.data; // { success, message, subscription }
};

/* ---------------------------------- Usage ----------------------------------- */

export const getUsage = async (email) => {
  const res = await axios.get(`${BILLING_URL}/usage`, { params: { email } });
  return res.data; // { success, usage }
};

/* -------------------------------- Activity log ------------------------------- */

export const getBillingEvents = async (email, limit = 25) => {
  const res = await axios.get(`${BILLING_URL}/events`, {
    params: { email, limit },
  });
  return res.data; // { success, events }
};

/* --------------------------------- Invoices --------------------------------- */

export const getInvoices = async (email) => {
  const res = await axios.get(`${BILLING_URL}/invoices`, { params: { email } });
  return res.data; // { success, invoices, summary }
};

/* ------------------------------ Payment methods ----------------------------- */

export const getPaymentMethods = async (email) => {
  const res = await axios.get(`${BILLING_URL}/payment-methods`, {
    params: { email },
  });
  return res.data; // { success, paymentMethods }
};

export const addPaymentMethod = async (email, card) => {
  const res = await axios.post(`${BILLING_URL}/payment-methods`, {
    email,
    ...card,
  });
  return res.data; // { success, message, paymentMethod }
};

export const setDefaultPaymentMethod = async (email, id) => {
  const res = await axios.patch(
    `${BILLING_URL}/payment-methods/${id}/default`,
    { email }
  );
  return res.data; // { success, message, paymentMethod }
};

export const removePaymentMethod = async (email, id) => {
  const res = await axios.delete(`${BILLING_URL}/payment-methods/${id}`, {
    data: { email },
  });
  return res.data; // { success, message }
};

export default {
  getSubscription,
  subscribePlan,
  cancelSubscription,
  getUsage,
  getBillingEvents,
  getInvoices,
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  removePaymentMethod,
};
