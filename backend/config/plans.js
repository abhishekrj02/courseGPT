// Billing plan catalog. `courseLimit: null` means unlimited generation.
// Kept in one place so the controller and any future UI stay in sync.
export const PLANS = {
    free: {
        id: "free",
        name: "Free",
        price: 0,
        courseLimit: 15,
        features: [
            "Up to 15 AI-generated courses",
            "AI chapter content",
            "Community support",
        ],
    },
    pro: {
        id: "pro",
        name: "Pro",
        price: 9,
        courseLimit: null, // unlimited
        features: [
            "Unlimited AI-generated courses",
            "AI chapter content & video integration",
            "Priority generation",
            "Priority support",
        ],
    },
};

export const isValidPlan = (plan) => Object.prototype.hasOwnProperty.call(PLANS, plan);
