"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BBTV_CAMPS = [
  "Bring Back the Village — Girls Camp & Boys AI (Buguma, 19th–20th)",
  "Bring Back the Village — Invitation Tournament (PHC, 24th–25th)",
];

const SECRET_KEYWORD = "village 23";

const TTT_VALUE = "Train the Trainer Program — Oct 16–18 (In Person & Zoom)";

const inputClass =
  "w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0D0D0D] placeholder:text-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all";
const campInputClass =
  "w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0D0D0D] placeholder:text-gray-400 focus:outline-none focus:border-[#C8102E] transition-all";
const labelClass = "block text-sm font-bold text-[#0D0D0D] mb-1.5";

/* ── TTT Form ─────────────────────────────────────────────── */
function TTTForm() {
  const [fields, setFields] = useState({
    name: "", phone: "", email: "", team: "",
    skillSet: "", bio: "", aspirations: "", agreeWaiver: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) => setFields((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.agreeWaiver) { setError("You must agree to the terms to register."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/forms/ttt-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <SuccessCard />;

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      {/* TTT banner */}
      <div className="rounded-xl p-5 mb-8" style={{ background: "linear-gradient(135deg, #0a1628, #1a0a3d)", border: "2px solid rgba(124,58,237,0.4)" }}>
        <p className="text-[#7C3AED] text-xs font-bold uppercase tracking-widest mb-1">Coaching Clinic · Oct 16–18</p>
        <h3 className="text-white text-xl font-black mb-1">Train the Trainer Program</h3>
        <p className="text-white/50 text-sm">A 3-day masterclass curated to equip coaches with updated basketball terminologies to train players efficiently.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#7C3AED]">Coach Information</h3>
          <div className="space-y-4">
            <div><label className={labelClass}>Full Name *</label><input required className={inputClass} value={fields.name} onChange={e => set("name", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Phone *</label><input required type="tel" className={inputClass} value={fields.phone} onChange={e => set("phone", e.target.value)} /></div>
              <div><label className={labelClass}>Email *</label><input required type="email" className={inputClass} value={fields.email} onChange={e => set("email", e.target.value)} /></div>
            </div>
            <div><label className={labelClass}>Team *</label><input required className={inputClass} placeholder="Name of your team or organization" value={fields.team} onChange={e => set("team", e.target.value)} /></div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#7C3AED]">Coaching Background</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Player&apos;s Skill Set — Category of players you coach *</label>
              <div className="space-y-2 mt-2">
                {["Primary School", "Secondary School", "College", "Professional basketball"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="skillSet"
                      value={opt}
                      checked={fields.skillSet === opt}
                      onChange={() => set("skillSet", opt)}
                      className="w-4 h-4 shrink-0"
                      style={{ accentColor: "#7C3AED" }}
                      required
                    />
                    <span className="text-sm text-[#0D0D0D]/80 group-hover:text-[#7C3AED] transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Short Bio *</label>
              <textarea required rows={4} className={inputClass} placeholder="Tell us about yourself as a coach…" value={fields.bio} onChange={e => set("bio", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>What are your basketball aspirations? *</label>
              <textarea required rows={3} className={inputClass} placeholder="Where do you see yourself going in basketball…" value={fields.aspirations} onChange={e => set("aspirations", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: "#F5F0EB" }}>
          <p className="text-[#0D0D0D]/70 text-sm leading-relaxed mb-4">
            By submitting this form, I confirm that the information provided is accurate and I agree to participate in the TFIHF Train the Trainer Program.
          </p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input required type="checkbox" checked={fields.agreeWaiver} onChange={e => set("agreeWaiver", e.target.checked)} className="w-4 h-4" style={{ accentColor: "#7C3AED" }} />
            <span className="text-sm font-bold text-[#0D0D0D]">I agree to the above terms *</span>
          </label>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full font-black text-lg text-white hover:opacity-80 transition-all disabled:opacity-60"
          style={{ background: "#7C3AED" }}
        >
          {loading ? "Submitting…" : "Submit Registration"}
        </button>

        <p className="text-center text-[#0D0D0D]/40 text-xs">
          Your registration goes directly to TFIHF at admin@tfihf.com.
        </p>
      </form>
    </div>
  );
}

/* ── Camp / BBTV Form ─────────────────────────────────────── */
function CampForm({ initialCamp }: { initialCamp: string }) {
  const [fields, setFields] = useState({
    playerFirstName: "", playerLastName: "", dob: "", gender: "",
    position: "", height: "", weight: "",
    parentFirstName: "", parentLastName: "", parentEmail: "", parentPhone: "",
    emergencyName: "", emergencyPhone: "", emergencyRelation: "",
    camp: initialCamp, shirtSize: "", medicalNotes: "", agreeWaiver: false,
    secretWord: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) => setFields((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.agreeWaiver) { setError("You must agree to the waiver to register."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/forms/camp-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <SuccessCard />;

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Event Selection */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#C8102E]">Select Event *</h3>
          <div className="space-y-3">
            {BBTV_CAMPS.map((camp) => (
              <label key={camp} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio" name="camp" value={camp}
                  checked={fields.camp === camp}
                  onChange={() => set("camp", camp)}
                  className="mt-1 w-4 h-4 shrink-0" style={{ accentColor: "#C8102E" }}
                  required
                />
                <span className="text-sm text-[#0D0D0D]/80 group-hover:text-[#C8102E] transition-colors leading-relaxed">{camp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Player Info */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#C8102E]">Player / Participant Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>First Name *</label><input required className={campInputClass} value={fields.playerFirstName} onChange={e => set("playerFirstName", e.target.value)} /></div>
            <div><label className={labelClass}>Last Name *</label><input required className={campInputClass} value={fields.playerLastName} onChange={e => set("playerLastName", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>Date of Birth</label><input type="date" className={campInputClass} value={fields.dob} onChange={e => set("dob", e.target.value)} /></div>
            <div>
              <label className={labelClass}>Gender</label>
              <select className={campInputClass} value={fields.gender} onChange={e => set("gender", e.target.value)}>
                <option value="">Select</option>
                <option>Male</option><option>Female</option><option>Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className={labelClass}>Position</label><input className={campInputClass} placeholder="PG, SG…" value={fields.position} onChange={e => set("position", e.target.value)} /></div>
            <div><label className={labelClass}>Height</label><input className={campInputClass} placeholder="5ft 10in" value={fields.height} onChange={e => set("height", e.target.value)} /></div>
            <div><label className={labelClass}>Weight</label><input className={campInputClass} placeholder="160 lbs" value={fields.weight} onChange={e => set("weight", e.target.value)} /></div>
          </div>
        </div>

        {/* Parent / Guardian */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#C8102E]">Parent / Guardian</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>First Name *</label><input required className={campInputClass} value={fields.parentFirstName} onChange={e => set("parentFirstName", e.target.value)} /></div>
            <div><label className={labelClass}>Last Name *</label><input required className={campInputClass} value={fields.parentLastName} onChange={e => set("parentLastName", e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelClass}>Email *</label><input required type="email" className={campInputClass} value={fields.parentEmail} onChange={e => set("parentEmail", e.target.value)} /></div>
            <div><label className={labelClass}>Phone *</label><input required type="tel" className={campInputClass} value={fields.parentPhone} onChange={e => set("parentPhone", e.target.value)} /></div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#C8102E]">Emergency Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>Full Name</label><input className={campInputClass} value={fields.emergencyName} onChange={e => set("emergencyName", e.target.value)} /></div>
            <div><label className={labelClass}>Relationship</label><input className={campInputClass} placeholder="e.g. Uncle" value={fields.emergencyRelation} onChange={e => set("emergencyRelation", e.target.value)} /></div>
          </div>
          <div><label className={labelClass}>Phone</label><input type="tel" className={campInputClass} value={fields.emergencyPhone} onChange={e => set("emergencyPhone", e.target.value)} /></div>
        </div>

        {/* Additional */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#C8102E]">Additional Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelClass}>Shirt Size</label>
              <select className={campInputClass} value={fields.shirtSize} onChange={e => set("shirtSize", e.target.value)}>
                <option value="">Select</option>
                {["YS","YM","YL","YXL","S","M","L","XL","2XL","3XL"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div><label className={labelClass}>Medical Notes / Allergies</label><textarea rows={3} className={campInputClass} placeholder="Any medical conditions, allergies, or special needs…" value={fields.medicalNotes} onChange={e => set("medicalNotes", e.target.value)} /></div>
        </div>

        {/* Waiver */}
        <div className="bg-[#F5F0EB] rounded-xl p-5">
          <p className="text-[#0D0D0D]/70 text-sm leading-relaxed mb-4">
            By submitting this form, I confirm that the information provided is accurate and I give permission for the participant to attend TFIHF programming. I understand that TFIHF is not liable for injuries sustained during normal athletic activities.
          </p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input required type="checkbox" checked={fields.agreeWaiver} onChange={e => set("agreeWaiver", e.target.checked)} className="w-4 h-4 accent-[#C8102E]" />
            <span className="text-sm font-bold text-[#0D0D0D]">I agree to the above terms *</span>
          </label>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <button type="submit" disabled={loading} className="w-full bg-[#C8102E] text-white py-4 rounded-full font-black text-lg hover:bg-[#FDB927] hover:text-[#0D0D0D] transition-all disabled:opacity-60">
          {loading ? "Submitting…" : "Submit Registration"}
        </button>

        <p className="text-center text-[#0D0D0D]/40 text-xs">
          Your registration goes directly to TFIHF at admin@tfihf.com. You&apos;ll receive confirmation via the email provided.
        </p>
      </form>
    </div>
  );
}

/* ── Formal Dinner Form ───────────────────────────────────── */
function DinnerForm() {
  const [fields, setFields] = useState({
    name: "", nin: "", passport: "", dob: "", email: "", sex: "",
    address: "", phone: "", school: "", educationLevel: "", team: "",
    campExperience: "", bio: "", secretWord: "", agreeWaiver: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) => setFields((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (fields.secretWord.trim().toLowerCase() !== SECRET_KEYWORD) {
      setError("Incorrect secret word. This event is by invitation only."); return;
    }
    if (!fields.agreeWaiver) { setError("You must agree to the terms to register."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/forms/dinner-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <SuccessCard />;

  const dinnerInput = "w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0D0D0D] placeholder:text-gray-400 focus:outline-none focus:border-[#FDB927] transition-all";

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      {/* Invitation gate */}
      <div className="rounded-xl p-5 border-2 border-[#FDB927] bg-[#FDB927]/10 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-xl">🔒</span>
          <div>
            <p className="text-[#0D0D0D] font-black text-sm mb-1">Invitation Only — Formal Dinner Degema · Oct 23rd</p>
            <p className="text-[#0D0D0D]/70 text-sm leading-relaxed">
              This event is reserved for invited guests only. If you received an invitation, enter the secret word below to unlock registration.
            </p>
          </div>
        </div>
        <label className={labelClass}>Secret Word *</label>
        <input
          required
          className={dinnerInput}
          placeholder="Enter the secret word…"
          value={fields.secretWord}
          onChange={e => set("secretWord", e.target.value)}
          autoComplete="off"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#FDB927]">Personal Information</h3>
          <div className="space-y-4">
            <div><label className={labelClass}>Full Name *</label><input required className={dinnerInput} value={fields.name} onChange={e => set("name", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>NIN (National ID Number) *</label><input required className={dinnerInput} value={fields.nin} onChange={e => set("nin", e.target.value)} /></div>
              <div><label className={labelClass}>Date of Birth *</label><input required type="date" className={dinnerInput} value={fields.dob} onChange={e => set("dob", e.target.value)} /></div>
            </div>
            <div>
              <label className={labelClass}>International Passport *</label>
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="passport" value={opt} checked={fields.passport === opt} onChange={() => set("passport", opt)} required className="w-4 h-4" style={{ accentColor: "#FDB927" }} />
                    <span className="text-sm font-bold text-[#0D0D0D]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Sex *</label>
              <div className="flex gap-6 mt-2">
                {["Female", "Male"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sex" value={opt} checked={fields.sex === opt} onChange={() => set("sex", opt)} required className="w-4 h-4" style={{ accentColor: "#FDB927" }} />
                    <span className="text-sm font-bold text-[#0D0D0D]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Email *</label><input required type="email" className={dinnerInput} value={fields.email} onChange={e => set("email", e.target.value)} /></div>
              <div><label className={labelClass}>Phone Number *</label><input required type="tel" className={dinnerInput} value={fields.phone} onChange={e => set("phone", e.target.value)} /></div>
            </div>
            <div><label className={labelClass}>Address *</label><input required className={dinnerInput} value={fields.address} onChange={e => set("address", e.target.value)} /></div>
          </div>
        </div>

        {/* Education & Team */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#FDB927]">Education & Team</h3>
          <div className="space-y-4">
            <div><label className={labelClass}>Name of School *</label><input required className={dinnerInput} value={fields.school} onChange={e => set("school", e.target.value)} /></div>
            <div>
              <label className={labelClass}>Educational Level *</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Primary", "Secondary", "Graduated", "Not in School"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="educationLevel" value={opt} checked={fields.educationLevel === opt} onChange={() => set("educationLevel", opt)} required className="w-4 h-4 shrink-0" style={{ accentColor: "#FDB927" }} />
                    <span className="text-sm text-[#0D0D0D]/80 group-hover:text-[#C8102E] transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div><label className={labelClass}>Team *</label><input required className={dinnerInput} placeholder="Name of your team or organization" value={fields.team} onChange={e => set("team", e.target.value)} /></div>
          </div>
        </div>

        {/* Background */}
        <div>
          <h3 className="text-lg font-black text-[#0D0D0D] mb-4 pb-2 border-b-2 border-[#FDB927]">Background</h3>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>How was your previous camp experience? *</label>
              <textarea required rows={3} className={dinnerInput} placeholder="Tell us about your experience at previous camps…" value={fields.campExperience} onChange={e => set("campExperience", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Briefly tell us about yourself *</label>
              <textarea required rows={4} className={dinnerInput} placeholder="Share a little about who you are…" value={fields.bio} onChange={e => set("bio", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-[#F5F0EB] rounded-xl p-5">
          <p className="text-[#0D0D0D]/70 text-sm leading-relaxed mb-4">
            By submitting this form, I confirm that the information provided is accurate and I agree to attend the TFIHF Formal Dinner Degema as an invited guest.
          </p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input required type="checkbox" checked={fields.agreeWaiver} onChange={e => set("agreeWaiver", e.target.checked)} className="w-4 h-4" style={{ accentColor: "#FDB927" }} />
            <span className="text-sm font-bold text-[#0D0D0D]">I agree to the above terms *</span>
          </label>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

        <button type="submit" disabled={loading} className="w-full py-4 rounded-full font-black text-lg text-[#0D0D0D] hover:opacity-80 transition-all disabled:opacity-60" style={{ background: "#FDB927" }}>
          {loading ? "Submitting…" : "Submit Registration"}
        </button>

        <p className="text-center text-[#0D0D0D]/40 text-xs">
          Your registration goes directly to TFIHF at admin@tfihf.com.
        </p>
      </form>
    </div>
  );
}

function SuccessCard() {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-[#0D0D0D] mb-3">Registration Received!</h2>
      <p className="text-[#0D0D0D]/60 text-lg">
        TFIHF has received your registration. You&apos;ll be contacted at the email provided with next steps.
      </p>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
function CampRegistrationForm() {
  const searchParams = useSearchParams();
  const isTTT = searchParams.get("event") === "train-the-trainer";
  const [selectedType, setSelectedType] = useState<"bbtv" | "dinner" | "ttt">(isTTT ? "ttt" : "bbtv");

  useEffect(() => {
    if (isTTT) setSelectedType("ttt");
  }, [isTTT]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#F5F0EB]">
        <div className="bg-[#0D0D0D] py-20 text-center">
          <span className="text-[#C8102E] text-sm font-bold uppercase tracking-widest">
            Basketball Camps & Clinics
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3">Register Now</h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Fill out the form below and your registration goes directly to TFIHF.
          </p>
        </div>

        {/* Event flyers */}
        <div className="max-w-5xl mx-auto px-6 pt-12">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { src: "/images/flyer-bbtv.png", label: "Bring Back the Village" },
              { src: "/images/flyer-train-the-trainer.png", label: "Train the Trainer Program" },
            ].map((f) => (
              <div key={f.label} className="bg-[#0D0D0D] rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <img src={f.src} alt={f.label} className="w-full object-contain max-h-72 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-16">
          {/* Program selector tabs */}
          <div className="flex rounded-2xl overflow-hidden border-2 border-[#0D0D0D] mb-8">
            <button
              type="button"
              onClick={() => setSelectedType("bbtv")}
              className="flex-1 py-3 font-black text-xs sm:text-sm transition-all"
              style={selectedType === "bbtv" ? { background: "#C8102E", color: "#fff" } : { background: "#fff", color: "#0D0D0D" }}
            >
              Bring Back<br className="sm:hidden" /> the Village
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("dinner")}
              className="flex-1 py-3 font-black text-xs sm:text-sm transition-all border-x-2 border-[#0D0D0D]"
              style={selectedType === "dinner" ? { background: "#FDB927", color: "#0D0D0D" } : { background: "#fff", color: "#0D0D0D" }}
            >
              Formal Dinner<br className="sm:hidden" /> Degema
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("ttt")}
              className="flex-1 py-3 font-black text-xs sm:text-sm transition-all"
              style={selectedType === "ttt" ? { background: "#7C3AED", color: "#fff" } : { background: "#fff", color: "#0D0D0D" }}
            >
              Train the<br className="sm:hidden" /> Trainer
            </button>
          </div>

          {selectedType === "ttt" ? <TTTForm /> : selectedType === "dinner" ? <DinnerForm /> : <CampForm initialCamp="" />}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CampRegistrationPage() {
  return (
    <Suspense>
      <CampRegistrationForm />
    </Suspense>
  );
}
