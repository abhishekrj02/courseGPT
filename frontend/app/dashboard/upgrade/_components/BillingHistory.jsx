"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  ArrowDownCircle,
  Receipt,
} from "lucide-react";
import { SubscriptionContext } from "@/app/_context/SubscriptionContext";
import { getInvoices, getBillingEvents } from "@/config/billingService";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const STATUS_STYLES = {
  paid: "text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/30",
  refunded: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  void: "text-muted-foreground bg-muted border-border",
};

const EVENT_ICONS = {
  subscription_created: CheckCircle2,
  subscription_canceled: ArrowDownCircle,
  invoice_paid: Receipt,
  payment_method_added: CreditCard,
  payment_method_removed: XCircle,
  payment_method_default_changed: CreditCard,
};

function InvoiceRow({ invoice }) {
  const statusClass = STATUS_STYLES[invoice.status] || STATUS_STYLES.void;
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {invoice.invoiceNumber}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {invoice.description || `${invoice.plan} plan`} ·{" "}
            {formatDate(invoice.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className={`text-[11px] font-medium border px-2 py-0.5 rounded-full capitalize ${statusClass}`}
        >
          {invoice.status}
        </span>
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {invoice.amountFormatted}
        </span>
      </div>
    </div>
  );
}

function EventRow({ event }) {
  const Icon = EVENT_ICONS[event.type] || Clock;
  return (
    <div className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0">
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-foreground">{event.description}</p>
        <p className="text-xs text-muted-foreground">
          {formatDate(event.createdAt)}
        </p>
      </div>
    </div>
  );
}

function BillingHistory({ refreshKey }) {
  const { email } = useContext(SubscriptionContext);
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    Promise.all([getInvoices(email), getBillingEvents(email)])
      .then(([invoiceData, eventData]) => {
        setInvoices(invoiceData.invoices || []);
        setSummary(invoiceData.summary || null);
        setEvents(eventData.events || []);
      })
      .catch((e) => console.error("Failed to load billing history:", e))
      .finally(() => setLoading(false));
  }, [email, refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Invoices</h3>
          {summary && summary.count > 0 && (
            <span className="text-xs text-muted-foreground">
              {summary.count} invoice{summary.count === 1 ? "" : "s"} ·{" "}
              {summary.totalPaidFormatted} total
            </span>
          )}
        </div>
        <div className="rounded-xl border border-border bg-background/60 overflow-hidden">
          {invoices.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No invoices yet. Upgrade to Pro to see your first invoice here.
            </p>
          ) : (
            invoices.map((invoice) => (
              <InvoiceRow key={invoice.id} invoice={invoice} />
            ))
          )}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Activity log
        </h3>
        <div className="rounded-xl border border-border bg-background/60 overflow-hidden">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No billing activity yet.
            </p>
          ) : (
            events.map((event) => <EventRow key={event._id} event={event} />)
          )}
        </div>
      </section>
    </div>
  );
}

export default BillingHistory;
