import React from "react";
import DisclaimerBanner from "./DisclaimerBanner";

export default function HowItWorks() {
  const steps = [
    {
      stage: "PREPARE",
      number: "01",
      title: "Persiapan & Inventarisasi",
      desc: "Unggah berkas legalitas (Akta PT, NIB RBA) dan laporan keuangan historis ke dasbor Document Tracking untuk memetakan kelengkapan awal.",
    },
    {
      stage: "ASSESS",
      number: "02",
      title: "Evaluasi & Diagnosa Kesiapan",
      desc: "Mesin Document Assessment menganalisis berkas, menerbitkan SCF Readiness Score, dan memberikan panduan perbaikan konkret sebelum diajukan.",
    },
    {
      stage: "MATCH",
      number: "03",
      title: "Pencocokan Penyelenggara",
      desc: "Sistem mencocokkan profil UKM, sektor bisnis, dan target pendanaan dengan platform penyelenggara SCF mitra berizin OJK yang paling tepat.",
    },
    {
      stage: "ONBOARD",
      number: "04",
      title: "Pengajuan Resmi Kurasi",
      desc: "Langkah akhir persiapan prospektus bisnis untuk diserahkan ke platform SCF pilihan guna memulai proses due diligence dan penawaran efek.",
    },
  ];

  return (
    <section id="cara-kerja" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-t border-slate-100 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
            Empat Tahap Layanan SCOUT
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Empat Langkah Menuju <span className="text-[#5170FF]">Kelolosan Kurasi SCF</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Proses pendampingan terstruktur: PREPARE, ASSESS, MATCH, dan ONBOARD untuk mengakselerasi penerbitan efek UKM.
          </p>
        </div>

        {/* Steps Grid: 4 Kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between relative hover:border-[#5170FF]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#5170FF] tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                    {step.stage}
                  </span>
                  <span className="text-2xl font-black text-slate-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pernyataan Resmi: SCOUT Bukan Penyelenggara SCF (US-14 AC4 & US-18) */}
        <div className="max-w-4xl mx-auto">
          <DisclaimerBanner />
        </div>

      </div>
    </section>
  );
}
