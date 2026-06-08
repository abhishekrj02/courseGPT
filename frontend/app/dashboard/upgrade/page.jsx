"use client";
import React, { useState } from "react";
import { Sparkles, LayoutGrid, BarChart3, CreditCard, Receipt } from "lucide-react";
import PlanSelector from "./_components/PlanSelector";
import UsageOverview from "./_components/UsageOverview";
import BillingHistory from "./_components/BillingHistory";
import PaymentMethods from "./_components/PaymentMethods";

const TABS = [
  { id: "plans", label: "Plans", icon: LayoutGrid },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "invoices", label: "Billing history", icon: Receipt },
  { id: "payment", label: "Payment methods", icon: CreditCard },
];

function Upgrade() {
  const [active, setActive] = useState("plans");
  // Bumped whenever a billing action changes server state so dependent tabs
  // (usage, history) refetch the next time they're shown.
  const [refreshKey, setRefreshKey] = useState(0);
  const bump = () => setRefreshKey((k) => k + 1);

  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
          <Sparkles className="h-6 w-6 text-purple-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Billing & subscription
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Manage your plan, track usage, review invoices and update your payment
          methods.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 mb-8 rounded-xl border border-border bg-background/60 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 min-w-max inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all whitespace-nowrap
                ${
                  isActive
                    ? "bg-muted text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {active === "plans" && <PlanSelector onChanged={bump} />}
      {active === "usage" && <UsageOverview refreshKey={refreshKey} />}
      {active === "invoices" && <BillingHistory refreshKey={refreshKey} />}
      {active === "payment" && <PaymentMethods />}
    </div>
  );
}

export default Upgrade;
