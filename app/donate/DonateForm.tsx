"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const DEFAULT_PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0D0D0D",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#C8102E" },
  },
};

function CheckoutForm({ presetAmounts = DEFAULT_PRESET_AMOUNTS }: { presetAmounts?: number[] }) {
  const stripe = useStripe();
  const elements = useElements();

  const [selectedAmount, setSelectedAmount] = useState<number>(presetAmounts[2] ?? 50);
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = useCustom
    ? Math.round(parseFloat(customAmount || "0") * 100)
    : selectedAmount * 100;

  const displayAmount = useCustom
    ? parseFloat(customAmount || "0").toFixed(2)
    : selectedAmount.toFixed(2);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (finalAmount < 100) {
      setError("Minimum donation is $1.00.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error("Card element not found");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: cardName || `${firstName} ${lastName}`,
            email,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Thank You!</h2>
        <p className="text-[#0D0D0D]/60 text-lg max-w-md mx-auto">
          Your ${displayAmount} donation to The Future Is Here Foundation has been received. A receipt has been sent to {email}.
        </p>
        <p className="text-[#0D0D0D]/40 text-sm mt-4">
          TFIHF is a registered 501(c)(3) nonprofit — EIN 83-1486115. Your contribution may be tax-deductible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-bold text-[#0D0D0D] uppercase tracking-widest mb-4">
          Donation Amount
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => { setSelectedAmount(amt); setUseCustom(false); }}
              className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                !useCustom && selectedAmount === amt
                  ? "bg-[#C8102E] text-white border-[#C8102E]"
                  : "bg-white text-[#0D0D0D] border-gray-200 hover:border-[#C8102E]"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]/50 font-bold">$</span>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setUseCustom(true); }}
            onFocus={() => setUseCustom(true)}
            className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 font-medium text-[#0D0D0D] outline-none transition-all ${
              useCustom ? "border-[#C8102E]" : "border-gray-200 hover:border-gray-300"
            }`}
          />
        </div>
      </div>

      {/* Personal Info */}
      <div>
        <label className="block text-sm font-bold text-[#0D0D0D] uppercase tracking-widest mb-4">
          Your Information
        </label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">First Name *</label>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C8102E] outline-none text-[#0D0D0D] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Last Name *</label>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C8102E] outline-none text-[#0D0D0D] transition-all"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Email Address *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C8102E] outline-none text-[#0D0D0D] transition-all"
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="w-4 h-4 accent-[#C8102E]"
          />
          <span className="text-sm text-[#0D0D0D]/60">Make this an anonymous donation</span>
        </label>
      </div>

      {/* Payment */}
      <div>
        <label className="block text-sm font-bold text-[#0D0D0D] uppercase tracking-widest mb-4">
          Payment Information
        </label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Cardholder Name *</label>
            <input
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C8102E] outline-none text-[#0D0D0D] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Card Number *</label>
            <div className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white">
              <CardNumberElement options={CARD_STYLE} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Expiration Date *</label>
              <div className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white">
                <CardExpiryElement options={CARD_STYLE} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">CVC *</label>
              <div className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white">
                <CardCvcElement options={CARD_STYLE} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-xs font-medium text-[#0D0D0D]/60 mb-1">Leave a Comment (optional)</label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share why you're donating..."
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C8102E] outline-none text-[#0D0D0D] transition-all resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Total + Submit */}
      <div className="bg-[#0D0D0D] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-white/60 font-medium">Donation Total</span>
          <span className="text-[#FDB927] text-2xl font-black">${displayAmount}</span>
        </div>
        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : `Donate $${displayAmount}`}
        </button>
        <div className="flex items-center justify-center gap-2 mt-4 text-white/40 text-xs">
          <Lock size={12} />
          <span>SSL encrypted · Powered by Stripe · 501(c)(3) EIN 83-1486115</span>
        </div>
      </div>
    </form>
  );
}

export default function DonateForm({ presetAmounts }: { presetAmounts?: number[] }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm presetAmounts={presetAmounts} />
    </Elements>
  );
}
