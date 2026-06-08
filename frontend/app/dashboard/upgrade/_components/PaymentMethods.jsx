"use client";
import React, { useContext, useEffect, useState } from "react";
import { CreditCard, Plus, Trash2, Loader2, Star, X } from "lucide-react";
import { SubscriptionContext } from "@/app/_context/SubscriptionContext";
import {
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  removePaymentMethod,
} from "@/config/billingService";

const BRAND_LABELS = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  discover: "Discover",
  card: "Card",
};

const EMPTY_FORM = {
  cardNumber: "",
  expMonth: "",
  expYear: "",
  cvc: "",
  holderName: "",
};

function MethodRow({ method, onSetDefault, onRemove, busy }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-12 items-center justify-center rounded-md border border-border bg-muted">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            {BRAND_LABELS[method.brand] || "Card"} •••• {method.last4}
            {method.isDefault && (
              <span className="ml-2 text-[11px] font-medium text-blue-500 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                Default
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            Expires {String(method.expMonth).padStart(2, "0")}/{method.expYear}
            {method.holderName ? ` · ${method.holderName}` : ""}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {!method.isDefault && (
          <button
            onClick={() => onSetDefault(method.id)}
            disabled={busy}
            title="Set as default"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition disabled:opacity-50"
          >
            <Star className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => onRemove(method.id)}
          disabled={busy}
          title="Remove"
          className="p-2 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PaymentMethods() {
  const { email } = useContext(SubscriptionContext);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const load = () => {
    if (!email) return;
    setLoading(true);
    getPaymentMethods(email)
      .then((data) => setMethods(data.paymentMethods || []))
      .catch((e) => console.error("Failed to load payment methods:", e))
      .finally(() => setLoading(false));
  };

  useEffect(load, [email]);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await addPaymentMethod(email, form);
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Could not add card. Check the details."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleSetDefault = async (id) => {
    setBusy(true);
    try {
      await setDefaultPaymentMethod(email, id);
      load();
    } catch (e) {
      console.error("Failed to set default:", e);
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (id) => {
    setBusy(true);
    try {
      await removePaymentMethod(email, id);
      load();
    } catch (e) {
      console.error("Failed to remove card:", e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Saved payment methods
        </h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition"
          >
            <Plus className="h-4 w-4" /> Add card
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-background/60 overflow-hidden">
          {methods.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No payment methods saved yet.
            </p>
          ) : (
            methods.map((method) => (
              <MethodRow
                key={method.id}
                method={method}
                onSetDefault={handleSetDefault}
                onRemove={handleRemove}
                busy={busy}
              />
            ))
          )}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="rounded-xl border border-border bg-background/60 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Add a card</h4>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setError("");
                setForm(EMPTY_FORM);
              }}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Cardholder name
            </label>
            <input
              type="text"
              value={form.holderName}
              onChange={update("holderName")}
              placeholder="Jane Doe"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Card number
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={form.cardNumber}
              onChange={update("cardNumber")}
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                Month
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.expMonth}
                onChange={update("expMonth")}
                placeholder="MM"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                Year
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.expYear}
                onChange={update("expYear")}
                placeholder="YYYY"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                CVC
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.cvc}
                onChange={update("cvc")}
                placeholder="123"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Save card
          </button>

          <p className="text-xs text-muted-foreground">
            Demo only — card details are validated and masked to the last 4
            digits. No real card data is stored or charged.
          </p>
        </form>
      )}
    </div>
  );
}

export default PaymentMethods;
