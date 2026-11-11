import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tentukan Target & Kebutuhan",
      desc: "Pilih kategori impian Anda (misalnya DP rumah, pernikahan, atau dana darurat) dan tetapkan angka nominal yang ingin dicapai.",
    },
    {
      number: "02",
      title: "Sesuaikan Durasi & Bunga",
      desc: "Geser durasi menabung yang realistis sesuai kondisi penghasilan bulanan serta tentukan instrumen imbal hasil yang digunakan.",
    },
    {
      number: "03",
      title: "Dapatkan Rencana Bulanan",
      desc: "Kalkulator secara instan menghitung setoran per bulan yang wajib disisihkan, lengkap dengan estimasi keuntungan bunga majemuk.",
    },
  ];

  return (
    <section id="cara-kerja" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">
            Langkah Sederhana
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Cara Kerja <span className="text-yellow-400">Simulasi Tabungan</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Hanya butuh waktu kurang dari 1 menit untuk merencanakan strategi finansial masa depan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.number} 
              className="relative rounded-3xl border border-zinc-800 bg-black/50 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-yellow-400 font-mono">
                    {step.number}
                  </span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-yellow-400/50">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

