"use client";

import React, { useState } from "react";

const FAQS = [
  {
    q: "Apa peran utama SCOUT dalam proses penggalangan dana SCF?",
    a: "SCOUT berperan sebagai enabler dan platform pendamping pra-kurasi (pre-due diligence tool). Kami mendampingi UKM mengaudit kelengkapan dokumen, menghitung skor kesiapan (SCF Readiness Score), serta mencocokkan profil usaha dengan platform penyelenggara berizin OJK yang paling sesuai.",
  },
  {
    q: "Apakah SCOUT menghimpun dana langsung dari masyarakat pemodal?",
    a: "Tidak. SCOUT bukan penyelenggara Securities Crowdfunding dan tidak menghimpun dana pemodal publik. Penggalangan dana resmi tetap dilakukan melalui platform penyelenggara SCF yang telah memiliki izin resmi dari Otoritas Jasa Keuangan (OJK).",
  },
  {
    q: "Berapa batas maksimal pendanaan yang dapat dihimpun melalui SCF?",
    a: "Sesuai POJK No. 57/POJK.04/2020 (dan perubahannya POJK No. 16/POJK.04/2021), satu penerbit (UKM) dapat menghimpun dana maksimal hingga Rp 10 Miliar dalam jangka waktu 12 bulan.",
  },
  {
    q: "Mengapa badan usaha berbadan hukum PT disyaratkan untuk menerbitkan saham?",
    a: "Berdasarkan regulasi pasar modal Indonesia dan UU Perseroan Terbatas, efek ekuitas (saham) hanya dapat diterbitkan oleh entitas berbadan hukum PT. Namun, bagi badan usaha seperti CV atau Firma, SCF membuka peluang pendanaan melalui penerbitan Efek Utang atau Sukuk.",
  },
  {
    q: "Bagaimana SCOUT menjaga keamanan dan kerahasiaan data keuangan UKM?",
    a: "Data laporan keuangan dan dokumen legalitas dienkripsi secara ketat dan hanya digunakan untuk keperluan kalkulasi skor kesiapan serta pencocokan kriteria platform. Kami tidak membagikan dokumen Anda ke pihak ketiga tanpa persetujuan eksplisit dari pihak UKM.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-t border-slate-100 scroll-mt-16">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
            Tanya Jawab & Edukasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Pertanyaan yang Sering <span className="text-[#5170FF]">Diajukan</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Pahami regulasi POJK 57/2020, batas kewenangan pendampingan, dan kesiapan berkas UKM Anda.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50/50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-black pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 ${isOpen ? "rotate-180 bg-[#5170FF] text-white" : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
