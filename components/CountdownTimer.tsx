"use client";
import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-10-16T08:00:00-05:00");

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    started: false,
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2744 50%, #0a1628 100%)", borderBottom: "2px solid #00B4A6" }} className="py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00B4A6] animate-pulse" />
          <span className="text-[#00B4A6] text-xs font-bold uppercase tracking-widest">
            Upcoming Event
          </span>
        </div>
        <h3 className="text-white text-xl md:text-2xl font-black mb-1">
          Train the Trainer Program
        </h3>
        <p className="text-white/40 text-sm mb-8">
          Oct 16–18 · In Person & Zoom · The Future Is Here Foundation
        </p>

        {time.started ? (
          <p className="text-[#00B4A6] text-2xl font-black">The event has started — join now!</p>
        ) : (
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-8">
            {[
              { value: time.days, label: "Days" },
              { value: time.hours, label: "Hours" },
              { value: time.minutes, label: "Minutes" },
              { value: time.seconds, label: "Seconds" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-4 md:gap-8">
                <div className="text-center">
                  <div
                    className="rounded-xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center"
                    style={{ background: "rgba(0,180,166,0.15)", border: "2px solid #00B4A6", boxShadow: "0 0 20px rgba(0,180,166,0.25)" }}
                  >
                    <span className="text-[#00B4A6] text-2xl sm:text-3xl md:text-4xl font-black tabular-nums">
                      {pad(value)}
                    </span>
                  </div>
                  <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-2">{label}</p>
                </div>
                {i < 3 && (
                  <span className="text-[#00B4A6] text-2xl sm:text-3xl font-black mb-6 hidden xs:block">:</span>
                )}
              </div>
            ))}
          </div>
        )}

        <a
          href="/camp-registration?event=train-the-trainer"
          className="inline-block mt-8 px-8 py-3 rounded-full font-black text-sm text-white hover:opacity-80 transition-all"
          style={{ background: "#00B4A6" }}
        >
          Register Before It&apos;s Full →
        </a>
      </div>
    </div>
  );
}
