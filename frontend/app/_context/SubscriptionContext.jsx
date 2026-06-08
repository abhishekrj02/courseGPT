import { createContext } from "react";

// Shares the current user's billing state (plan, course limit) across the
// dashboard sub-tree so the sidebar quota and upgrade page stay in sync.
export const SubscriptionContext = createContext();
