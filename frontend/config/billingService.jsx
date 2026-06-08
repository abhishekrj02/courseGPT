import axios from "axios";

// Backend billing API client. Uses the same server base URL as the rest of the
// app (NEXT_PUBLIC_SERVER_URL) and identifies the user by their Clerk email.
const BILLING_URL = (process.env.NEXT_PUBLIC_SERVER_URL || "") + "/api/billing";

export const getSubscription = async (email) => {
  const res = await axios.get(BILLING_URL, { params: { email } });
  return res.data; // { success, subscription, plans }
};

export const subscribePlan = async (email, plan) => {
  const res = await axios.post(`${BILLING_URL}/subscribe`, { email, plan });
  return res.data; // { success, message, subscription }
};

export const cancelSubscription = async (email) => {
  const res = await axios.post(`${BILLING_URL}/cancel`, { email });
  return res.data; // { success, message, subscription }
};

export default { getSubscription, subscribePlan, cancelSubscription };
