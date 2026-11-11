"use client";

import React, { useState } from "react";

const FAQS = [
  {
    q: "Apakah aplikasi simulasi tabungan ini sepenuhnya gratis?",
    a: "Ya, 100% gratis tanpa biaya tersembunyi. Anda tidak perlu memasukkan informasi kartu kredit, tidak ada langganan berbayar, dan bebas dari iklan yang mengganggu.",
  },
  {
    q: "Bagaimana cara kerja perhitungan bunga majemuk di kalkulator ini?",
    a: "Perhitungan menggunakan rumus Future Value Annuity dengan pemajemukan bulanan (monthly compounding). Hasil perhitungan memperhitungkan saldo awal Anda yang berkembang seiring waktu ditambah setoran rutin bulanan.",
  },
  {
    q: "Apakah data rencana keuangan saya aman dan terjaga kerahasiaannya?",
    a: "Sangat aman. Seluruh simulasi dan angka yang Anda masukkan diproses secara lokal di browser Anda. Kami tidak menyimpan data keuangan pribadi Anda ke server mana pun.",
  },
  {
    q: "Apakah angka hasil simulasi dijamin 100% sama dengan kenyataan?",
    a: "Hasil simulasi adalah estimasi matematis presisi berdasarkan persentase imbal hasil tahunan yang Anda tentukan. Dalam kondisi riil, imbal hasil deposito atau investasi dapat berfluktuasi sesuai kondisi pasar dan potongan pajak bunga yang berlaku.",
  },
  {
    q: "Apa perbedaan menabung di tabungan biasa vs instrumen berbunga?",
    a: "Tabungan tunai/biasa umumnya memiliki bunga mendekati 0% dan rentan tergerus inflasi. Mengalokasikan dana ke deposito atau reksadana memberikan potensi imbal hasil 4% hingga 9%+ per tahun yang membuat target tabungan Anda tercapai lebih cepat.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">
            Tanya Jawab
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Pertanyaan yang Sering <span className="text-yellow-400">Diajukan</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Temukan jawaban seputar kalkulasi, keamanan, dan tips memaksimalkan simulasi tabungan Anda.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-yellow-400/50 bg-black shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                    : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className={`text-base sm:text-lg font-bold transition-colors ${
                    isOpen ? "text-yellow-400" : "text-white"
                  }`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/50">
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

