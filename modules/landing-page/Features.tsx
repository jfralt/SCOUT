import React from "react";

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Document Tracking",
    desc: "Pantau siklus hidup dan kelengkapan berkas administratif, legalitas (NIB, Akta PT), serta dokumen keuangan secara terpusat dalam satu dasbor.",
    badge: "Dasbor Real-Time",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Document Assessment",
    desc: "Mesin diagnosa kelayakan berkas yang menghasilkan SCF Readiness Score (0–100) beserta panduan revisi konkret sebelum kurasi resmi di platform SCF.",
    badge: "Skor 0–100",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Platform Matchmaking",
    desc: "Algoritma pencocokan profil UKM (sektor, nominal target, instrumen saham vs sukuk) dengan platform penyelenggara SCF berizin OJK yang paling relevan.",
    badge: "30+ Platform Mitra",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black relative">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5170FF] mb-3">
            Tiga Fitur Utama
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
            Semua yang Anda Butuhkan untuk{" "}
            <span className="text-[#5170FF]">Lolos Kurasi SCF</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500">
            SCOUT menyediakan tiga modul terintegrasi yang mendampingi UKM dari tahap persiapan dokumen hingga pencocokan dengan platform SCF berizin OJK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => (
            <div
              key={item.title}
              className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-[#5170FF]/30 hover:shadow-[0_10px_40px_rgba(81,112,255,0.1)] hover:-translate-y-1"
            >
              {/* Step number */}
              <div className="absolute top-6 right-6 text-4xl font-black text-slate-50 select-none">
                {String(idx + 1).padStart(2, "0")}
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5170FF]/10 border border-[#5170FF]/15 mb-5 transition-transform group-hover:scale-110">
                {item.icon}
              </div>

              <span className="inline-block rounded-full bg-[#5170FF]/8 px-2.5 py-1 text-[11px] font-bold text-[#5170FF] mb-3">
                {item.badge}
              </span>

              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[#5170FF] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
