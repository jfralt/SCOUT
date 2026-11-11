"use client";

import React from "react";

export default function Hero() {
  const scrollToEstimasi = () => {
    const el = document.getElementById("estimasi");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white text-black">
      {/* Subtle blue gradient background */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-50 via-white to-white pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#5170FF]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#5170FF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5170FF]/30 bg-[#5170FF]/8 px-4 py-1.5 text-xs font-semibold text-[#5170FF] mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#5170FF] animate-pulse" />
              Platform Resmi Pendamping SCF untuk UKM Indonesia
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-black">
              Akselerasi Penggalangan Dana UKM Melalui{" "}
              <span className="text-[#5170FF]">
                Securities Crowdfunding
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              SCOUT mendampingi UKM Anda mempersiapkan seluruh dokumen, menghitung skor kesiapan, dan mencocokkan Anda dengan platform SCF berizin OJK yang paling sesuai.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToEstimasi}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-[#5170FF] px-8 py-4 text-base font-extrabold text-white transition-all duration-300 hover:bg-[#3d57e8] hover:scale-105 hover:shadow-[0_8px_30px_rgba(81,112,255,0.35)] cursor-pointer"
              >
                <span>Mulai Konsultasi</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("cara-kerja");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 hover:border-[#5170FF]/40 hover:text-[#5170FF] transition-all cursor-pointer"
              >
                <svg className="h-5 w-5 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pelajari Cara Kerja
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#5170FF]">500+</p>
                <p className="text-xs text-slate-400 mt-0.5">UKM Terdampingi</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-black">30+</p>
                <p className="text-xs text-slate-400 mt-0.5">Platform SCF Mitra</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#5170FF]">OJK</p>
                <p className="text-xs text-slate-400 mt-0.5">Sesuai POJK 57/2020</p>
              </div>
            </div>
          </div>

          {/* Right — SCF Readiness Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#5170FF] to-blue-400 opacity-20 blur-xl" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl">
                {/* Card header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#5170FF]/10 border border-[#5170FF]/20 flex items-center justify-center text-[#5170FF] font-bold text-lg">
                      📋
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Profil Kesiapan SCF</p>
                      <h4 className="text-sm font-bold text-black">CV Maju Bersama</h4>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200">
                    Layak • 88/100
                  </span>
                </div>

                {/* Score display */}
                <div className="py-5">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">SCF Readiness Score</p>
                  <div className="text-4xl sm:text-5xl font-black text-black mt-1">
                    88<span className="text-xl text-slate-400 font-bold">/100</span>
                  </div>
                  <p className="text-xs text-[#5170FF] mt-1 flex items-center gap-1 font-medium">
                    <span>Target Dana: Rp 2,5 Miliar</span>
                    <span>• Instrumen: Saham</span>
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-2 mb-5">
                  {[
                    { label: "Legalitas (NIB, Akta PT)", done: true },
                    { label: "Laporan Keuangan 2 Tahun", done: true },
                    { label: "Izin Usaha & NPWP", done: true },
                    { label: "Prospektus Draft", done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                          item.done
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {item.done ? "✓" : "○"}
                      </span>
                      <span className={item.done ? "text-black" : "text-slate-400"}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Quick action */}
                <button
                  onClick={scrollToEstimasi}
                  className="mt-2 w-full rounded-xl bg-[#5170FF] py-2.5 text-center text-xs font-bold text-white hover:bg-[#3d57e8] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Cek Kesiapan UKM Anda</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-lg hidden sm:flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#5170FF] flex items-center justify-center text-white font-extrabold text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Rekomendasi Platform</p>
                  <p className="text-[11px] text-slate-400">3 Platform SCF Cocok</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
