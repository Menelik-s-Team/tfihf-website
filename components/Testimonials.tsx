"use client";
import { useState, useRef } from "react";

const testimonials = [
  {
    name: "Jordan McGofflin",
    label: "NBA Player",
    file: "VIDEO-2026-09-29-21-39-08.mp4",
  },
  {
    name: "Dabra Amieyeofori",
    label: "2023 Camp",
    file: "VIDEO-2026-09-29-22-05-50.mp4",
  },
  {
    name: "Dabra Amieyeofori",
    label: "2026 Testimony",
    file: "VIDEO-2026-09-29-22-05-50-2.mp4",
  },
  {
    name: "Chigozie Ibe",
    label: "2025 Testimony",
    file: "VIDEO-2026-09-29-22-05-50-3.mp4",
  },
  {
    name: "Participant",
    label: "2025 Testimony",
    file: "VIDEO-2026-09-29-22-05-50-4.mp4",
  },
];

function VideoCard({ name, label, file }: { name: string; label: string; file: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  }

  return (
    <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/10 hover:border-[#FDB927]/30 transition-all duration-300">
      <div className="relative aspect-video bg-black">
        {!playing ? (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 group w-full"
          >
            <div className="w-16 h-16 rounded-full bg-[#FDB927] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#FDB927]/30">
              <span className="text-black text-2xl ml-1">▶</span>
            </div>
            <span className="text-white/60 text-sm">Tap to play</span>
          </button>
        ) : (
          <video
            ref={videoRef}
            src={`/api/video/${encodeURIComponent(file)}`}
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-white font-bold text-base">{name}</p>
        <p className="text-[#FDB927] text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[#FDB927] text-sm font-bold uppercase tracking-widest">
            Hear It From Them
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3">Testimonials</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-lg">
            Real stories from players and families who have experienced TFIHF firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <VideoCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
