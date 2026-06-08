"use client";
import React, { useContext, useEffect, useState } from "react";
import { BookOpen, Infinity as InfinityIcon, Loader2 } from "lucide-react";
import { SubscriptionContext } from "@/app/_context/SubscriptionContext";
import { getUsage } from "@/config/billingService";

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent || "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function UsageOverview({ refreshKey }) {
  const { email } = useContext(SubscriptionContext);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    getUsage(email)
      .then((data) => setUsage(data.usage))
      .catch((e) => console.error("Failed to load usage:", e))
      .finally(() => setLoading(false));
  }, [email, refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!usage) {
    return (
      <p className="text-sm text-muted-foreground text-center py-10">
        Usage data is unavailable right now.
      </p>
    );
  }

  const { used, limit, unlimited, remaining, percentUsed, plan } = usage;
  const near = !unlimited && percentUsed >= 80;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Current plan" value={plan === "pro" ? "Pro" : "Free"} />
        <StatCard label="Courses created" value={used} />
        <StatCard
          label="Remaining"
          value={unlimited ? "∞" : remaining}
          accent={near ? "text-amber-500" : undefined}
        />
      </div>

      <div className="rounded-xl border border-border bg-background/60 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="h-4 w-4 text-blue-500" />
            Course generation
          </div>
          <span className="text-sm text-muted-foreground">
            {unlimited ? (
              <span className="inline-flex items-center gap-1 text-purple-500">
                <InfinityIcon className="h-4 w-4" /> Unlimited
              </span>
            ) : (
              `${used} / ${limit}`
            )}
          </span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              unlimited
                ? "bg-purple-500"
                : near
                ? "bg-amber-500"
                : "bg-blue-500"
            }`}
            style={{ width: `${unlimited ? 100 : percentUsed}%` }}
          />
        </div>

        {!unlimited && near && (
          <p className="text-xs text-amber-500 mt-3">
            You're approaching your course limit. Upgrade to Pro for unlimited
            generation.
          </p>
        )}
        {unlimited && (
          <p className="text-xs text-muted-foreground mt-3">
            You're on Pro — generate as many courses as you like.
          </p>
        )}
      </div>
    </div>
  );
}

export default UsageOverview;
