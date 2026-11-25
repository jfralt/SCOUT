"use client";

import React from "react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 bg-white text-black">
      {/* Background Subtle Tint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#5170FF]" />
              <span>Pendamping Resmi Pra-Kurasi SCF • POJK No. 57/POJK.04/2020</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-black">
              Akselerasi Penggalangan Dana UKM Melalui{" "}
              <span className="text-[#5170FF]">
                Securities Crowdfunding
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              SCOUT memandu bisnis UKM mengelola berkas legalitas, mengevaluasi kelayakan via <em>SCF Readiness Score</em>, dan mencocokkan profil usaha dengan platform penyelenggara SCF berizin OJK.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => scrollToSection("diagnosa")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#5170FF] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#3d57e8] hover:scale-[1.02] cursor-pointer"
              >
                <span>Mulai Konsultasi</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => scrollToSection("dashboard")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer"
              >
                <span>Lihat Demo Dasbor</span>
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black">Rp 10 M</p>
                <p className="text-xs text-slate-500 mt-0.5">Batas Emisi per 12 Bulan</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#5170FF]">30+</p>
                <p className="text-xs text-slate-500 mt-0.5">Penyelenggara SCF Mitra</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-black">85%+</p>
                <p className="text-xs text-slate-500 mt-0.5">Target Rasio Lolos Kurasi</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual SaaS Card Preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-lg">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#5170FF]/10 flex items-center justify-center text-[#5170FF] font-black text-sm">
                    SC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black">Evaluasi Kesiapan Efek</h4>
                    <p className="text-xs text-slate-400">Profil Bisnis Riil UKM</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200">
                  Siap Kurasi
                </span>
              </div>

              {/* Score Display */}
              <div className="py-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  SCF Readiness Score
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-black">88</span>
                  <span className="text-slate-400 font-bold text-base">/ 100</span>
                  <span className="ml-auto text-xs font-semibold text-[#5170FF]">
                    Rekomendasi: Saham
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                  <div className="bg-[#5170FF] h-full w-[88%] rounded-full" />
                </div>
              </div>

              {/* Mini Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                {[
                  { name: "Legalitas Badan Hukum PT", status: "Lengkap", valid: true },
                  { name: "Laporan Keuangan 2 Tahun", status: "Valid", valid: true },
                  { name: "NIB OSS RBA Aktif", status: "Valid", valid: true },
                  { name: "Dokumen Prospektus Usaha", status: "Tahap Final", valid: false },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${item.valid ? "bg-emerald-500" : "bg-amber-500"}`} />
                      {item.name}
                    </span>
                    <span className={`font-semibold ${item.valid ? "text-slate-700" : "text-amber-600"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Matched Platform Teaser */}
              <div className="mt-5 rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Platform Paling Cocok</p>
                  <p className="text-xs font-bold text-black mt-0.5">Bizhare & Santara (95% Match)</p>
                </div>
                <button
                  onClick={() => scrollToSection("diagnosa")}
                  className="rounded-lg bg-[#5170FF] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#3d57e8] transition cursor-pointer"
                >
                  Hitung Ulang
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
