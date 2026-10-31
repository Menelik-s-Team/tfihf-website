"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0D0D0D] placeholder:text-gray-400 focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all";

const labelClass = "block text-sm font-semibold text-[#0D0D0D] mb-2";

const AREAS = [
  "Basketball Coaching",
  "Event Coordination",
  "Youth Mentorship",
  "Administrative Support",
  "Marketing & Social Media",
  "Fundraising",
  "Photography / Videography",
  "Transportation / Logistics",
  "Other",
];

export default function VolunteerPage() {
  const [fields, setFields] = useState({
    firstName: "", lastName: "", sex: "", age: "",
    phone: "", email: "", talent: "", areaOfInterest: "", howToServe: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/forms/volunteer", {
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
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        {/* Header */}
        <div className="bg-[#0D0D0D] py-20 text-center">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">Get Involved</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3">Volunteer With Us</h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Bring your skills, time, and passion to a community that needs it. TFIHF volunteers
            are on the ground making real change happen.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16">
          {submitted ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="text-[#C8102E] text-6xl mb-6">✓</div>
              <h2 className="text-2xl font-black text-[#0D0D0D] mb-3">Application Received!</h2>
              <p className="text-[#0D0D0D]/60 mb-8">
                Thank you for stepping up. The TFIHF team will review your application and
                reach out to you within 3-5 business days.
              </p>
              <a
                href="/"
                className="inline-block bg-[#C8102E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all"
              >
                Back to Home
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-black text-[#0D0D0D] border-b border-gray-100 pb-4">
                Personal Information
              </h2>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input required type="text" placeholder="John" value={fields.firstName} onChange={set("firstName")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input required type="text" placeholder="Doe" value={fields.lastName} onChange={set("lastName")} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Gender</label>
                  <select value={fields.sex} onChange={set("sex")} className={inputClass}>
                    <option value="">Select...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Age</label>
                  <input type="number" min="16" max="99" placeholder="25" value={fields.age} onChange={set("age")} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input required type="tel" placeholder="+1 (770) 000-0000" value={fields.phone} onChange={set("phone")} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <input required type="email" placeholder="you@example.com" value={fields.email} onChange={set("email")} className={inputClass} />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h2 className="text-xl font-black text-[#0D0D0D] mb-6">Volunteer Details</h2>
              </div>

              <div>
                <label className={labelClass}>Your Talent / Skills</label>
                <input type="text" placeholder="e.g. Basketball coaching, graphic design, photography" value={fields.talent} onChange={set("talent")} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Area of Interest</label>
                <select value={fields.areaOfInterest} onChange={set("areaOfInterest")} className={inputClass}>
                  <option value="">Select an area...</option>
                  {AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>How can you be of service? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe how you'd like to contribute to TFIHF's mission..."
                  value={fields.howToServe}
                  onChange={set("howToServe")}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
