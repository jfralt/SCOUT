"use client";

import React from "react";

export default function CTASection() {
  const scrollToCalculator = () => {
    const el = document.getElementById("kalkulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="cta-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background glow and circular gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-yellow-400/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="rounded-3xl border-2 border-yellow-400/40 bg-gradient-to-b from-zinc-900/90 via-black to-zinc-950 p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(250,204,21,0.2)]">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-1.5 text-xs font-bold text-yellow-300 border border-yellow-400/30 mb-6">
            ✨ Waktunya Bertindak Sekarang
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Siap Mewujudkan Target <span className="text-yellow-400">Finansial Anda?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Mulai dari langkah kecil hari ini. Gunakan kalkulator simulasi gratis kami dan temukan strategi menabung paling efektif untuk masa depan Anda.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToCalculator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-10 py-4 text-base font-extrabold text-black transition-all duration-300 hover:bg-yellow-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(250,204,21,0.5)] cursor-pointer"
            >
              <span>Mulai</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href="#hero"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 px-8 py-4 text-base font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all"
            >
              Kembali ke Atas
            </a>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Gratis • Tanpa Perlu Registrasi • Akses Langsung
          </p>
        </div>
      </div>
    </section>
  );
}

