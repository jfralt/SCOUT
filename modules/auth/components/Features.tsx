import React from "react";

const FEATURES = [
  {
    pilarNumber: "01",
    title: "Document Tracking",
    tagline: "Dasbor Pemantauan Siklus Hidup Berkas Terpusat",
    desc: "Kelola seluruh dokumen persyaratan SCF dalam satu dasbor terpadu. Pantau kelengkapan berkas legalitas, keuangan, perizinan, dan prospektus secara transparan dan terstruktur.",
    highlights: [
      "Indikator visual kelengkapan per kategori berkas",
      "Label status bertingkat: Lengkap, Butuh Revisi, Belum Diunggah",
      "Manajemen versi arsip (versioning) tanpa risiko dokumen tertukar",
      "Pengingat berkas kedaluwarsa (SPT, mutasi rekening, perizinan)",
    ],
  },
  {
    pilarNumber: "02",
    title: "Document Assessment",
    tagline: "Diagnosa Kelayakan Berkas & SCF Readiness Score",
    desc: "Mesin diagnosa pintar yang mengevaluasi kepatuhan berkas terhadap standar kurasi OJK (POJK No. 57/POJK.04/2020) dan menghasilkan skor kelayakan objektif 0–100.",
    highlights: [
      "SCF Readiness Score (0-100) berbasis algoritma kurasi platform",
      "Checklist kepatuhan regulasi mutlak badan hukum PT",
      "Rekomendasi tindakan korektif per berkas sebelum pengajuan",
      "Panduan restrukturisasi laporan keuangan standar SAK EMKM",
    ],
  },
  {
    pilarNumber: "03",
    title: "Platform Matchmaking",
    tagline: "Pencocokan Cerdas dengan Penyelenggara SCF Mitra",
    desc: "Algoritma pencocokan yang menghubungkan profil usaha Anda dengan platform penyelenggara SCF berizin OJK yang paling relevan dengan model bisnis dan kebutuhan permodalan Anda.",
    highlights: [
      "Pencocokan instrumen: Saham Ekuitas vs Sukuk / Efek Utang",
      "Kesesuaian sektor industri (F&B, Ritel, Manufaktur, Jasa)",
      "Katalog profil 30+ penyelenggara SCF berizin OJK",
      "Persentase kecocokan (match rate) dan riwayat sukses proyek",
    ],
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5170FF]/20 bg-[#5170FF]/5 px-3.5 py-1 text-xs font-semibold text-[#5170FF] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5170FF]" />
            Tiga Pilar Utama SCOUT
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Solusi Menyeluruh Persiapan <span className="text-[#5170FF]">Kurasi SCF</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Dirancang khusus untuk memandu pengurus UKM melewati proses kurasi due diligence yang rumit menjadi langkah-langkah persiapan yang terukur.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feat) => (
            <div
              key={feat.pilarNumber}
              className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs hover:shadow-md hover:border-[#5170FF]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-200">
                    {feat.pilarNumber}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#5170FF]" />
                </div>

                <h3 className="text-xl font-bold text-black mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs font-semibold text-[#5170FF] mb-4">
                  {feat.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {feat.desc}
                </p>

                <div className="space-y-2.5 pt-5 border-t border-slate-100">
                  {feat.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-[#5170FF] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#diagnosa"
                  className="text-xs font-bold text-[#5170FF] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Eksplorasi Fitur</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
