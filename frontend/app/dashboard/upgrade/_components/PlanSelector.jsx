"use client";
import React, { useContext, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { SubscriptionContext } from "@/app/_context/SubscriptionContext";
import { subscribePlan, cancelSubscription } from "@/config/billingService";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "For getting started",
    features: [
      "Up to 15 AI-generated courses",
      "AI chapter content",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9,
    tagline: "For power learners",
    highlighted: true,
    features: [
      "Unlimited AI-generated courses",
      "AI chapter content & video integration",
      "Priority generation",
      "Priority support",
    ],
  },
];

function PlanSelector({ onChanged }) {
  const { subscription, setSubscription, email } = useContext(SubscriptionContext);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  const currentPlan = subscription?.plan ?? "free";

  const handleSelect = async (planId) => {
    if (!email) {
      setError("You must be signed in to manage billing.");
      return;
    }
    if (planId === currentPlan) return;

    setError("");
    setPending(planId);
    try {
      const data =
        planId === "free"
          ? await cancelSubscription(email)
          : await subscribePlan(email, planId);
      setSubscription(data.subscription);
      onChanged?.();
    } catch (e) {
      console.error("Billing action failed:", e);
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div>
      {error && <p className="text-sm text-red-500 text-center mb-6">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isPending = pending === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all
                ${
                  plan.highlighted
                    ? "border-purple-500/40 bg-purple-500/[0.03] shadow-lg shadow-purple-500/5"
                    : "border-border bg-background/60"
                }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 text-[11px] font-semibold uppercase tracking-wider text-purple-500 border border-purple-500/30 bg-background px-2.5 py-0.5 rounded-full">
                  Most popular
                </span>
              )}

              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                {isCurrent && (
                  <span className="text-[11px] font-medium text-green-600 dark:text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Current plan
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4">{plan.tagline}</p>

              <div className="mb-5">
                <span className="text-3xl font-bold text-foreground">
                  ${plan.price}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(plan.id)}
                disabled={isCurrent || isPending || !subscription}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed
                  ${
                    plan.highlighted
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isCurrent
                  ? "Your current plan"
                  : plan.id === "free"
                  ? "Downgrade to Free"
                  : "Upgrade to Pro"}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8">
        This is a demo billing flow — no real payment is processed.
      </p>
    </div>
  );
}

export default PlanSelector;
