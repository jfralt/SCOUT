"use client";

import React from "react";
import Link from "next/link";

export default function CTASection() {
  const scrollToDiagnosa = () => {
    const el = document.getElementById("diagnosa");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="cta-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/80 p-8 sm:p-14 text-center shadow-xs">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5170FF]/20 bg-[#5170FF]/8 px-3.5 py-1 text-xs font-semibold text-[#5170FF] mb-5">
            Mulai Langkah Persiapan Hari Ini
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight max-w-2xl mx-auto leading-tight">
            Siap Menembus Kurasi <span className="text-[#5170FF]">Pendanaan SCF?</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Buat akun SCOUT untuk mengelola profil bisnis, melacak kelengkapan dokumen, dan mencocokkan target pendanaan dengan platform SCF berizin OJK.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#5170FF] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#3d57e8] hover:scale-[1.02] cursor-pointer"
            >
              <span>Daftar Akun Baru</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition"
            >
              Masuk ke Akun
            </Link>
          </div>

          <div className="mt-4">
            <button
              onClick={scrollToDiagnosa}
              className="text-xs text-slate-500 hover:text-slate-800 underline transition cursor-pointer"
            >
              Atau coba kalkulator diagnosa dulu (Lihat-lihat saja)
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Gratis • Tanpa Komitmen Awal • Sesuai Regulasi OJK POJK No. 57/POJK.04/2020
          </p>
        </div>
      </div>
    </section>
  );
}
