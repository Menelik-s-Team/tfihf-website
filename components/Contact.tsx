"use client";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

type ContactProps = {
  address?: string
  city?: string
  phone?: string
  email?: string
  twitter?: string
  instagram?: string
}

export default function Contact({
  address = "1445 Woodmont LN STE 1905",
  city = "Atlanta, GA 30318",
  phone = "+1 770-946-2629",
  email = "admin@tfihf.com",
  twitter = "TFIHFoundation",
  instagram = "tfihf2003",
}: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Reach Out
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
            Contact Us
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
            Whether you want to donate, partner, volunteer, or just learn more — we want to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-[#C8102E] text-5xl mb-4">✓</div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/60">We&apos;ll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-sm font-medium block mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={fields.firstName}
                      onChange={(e) => setFields((f) => ({ ...f, firstName: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8102E]/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm font-medium block mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={fields.lastName}
                      onChange={(e) => setFields((f) => ({ ...f, lastName: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8102E]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8102E]/50"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-medium block mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how you'd like to get involved..."
                    value={fields.message}
                    onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8102E]/50 resize-none"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8 justify-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={22} color="#C8102E" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Address</p>
                <p className="text-white/60">
                  {address}<br />{city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                <Phone size={22} color="#C8102E" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Phone</p>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-white/60 hover:text-[#C8102E] transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                <Mail size={22} color="#C8102E" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-white/60 hover:text-[#C8102E] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white font-bold mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C8102E]/40 hover:bg-[#C8102E]/10 transition-all text-[#C8102E]"
                >
                  <XIcon />
                </a>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#C8102E]/40 hover:bg-[#C8102E]/10 transition-all text-[#C8102E]"
                >
                  <IGIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
