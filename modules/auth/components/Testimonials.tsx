import React from "react";

const TESTIMONIALS = [
  {
    name: "Hendro Wibowo",
    role: "Founder & Direktur Utama • PT Kopi Seduh Nusantara",
    sektor: "Kuliner / F&B",
    quote:
      "Sebelum memakai SCOUT, kami bingung menyusun CALK dan prospektus untuk kurasi SCF. Lewat modul Document Assessment, kami tahu persis rasio keuangan mana yang harus diperbaiki. Hasilnya, pengajuan pendanaan Rp 2,8 Miliar kami lolos di platform mitra.",
    avatar: "HW",
    pencapaian: "Lolos Emisi Saham Rp 2,8 M",
  },
  {
    name: "Siti Nurhaliza",
    role: "Managing Director • CV Karya Busana Mandiri",
    sektor: "Manufaktur & Garment",
    quote:
      "Fitur Platform Matchmaking sangat membuka wawasan. Awalnya kami berniat menerbitkan saham, tapi sistem merekomendasikan Sukuk Mudharabah karena bentuk usaha kami CV. Pengadaan mesin baru berjalan tanpa perlu melepaskan ekuitas perusahaan.",
    avatar: "SN",
    pencapaian: "Penerbitan Sukuk Rp 1,5 M",
  },
  {
    name: "Agus Pratama",
    role: "Chief Executive Officer • PT Ritel Jaya Sentosa",
    sektor: "Ritel & Waralaba",
    quote:
      "Dasbor Document Tracking SCOUT membuat kolaborasi antara tim legal, akuntan, dan manajemen berjalan rapi. Semua berkas NIB RBA dan laporan keuangan diaudit secara bertahap hingga meraih skor 92/100 sebelum kurasi resmi.",
    avatar: "AP",
    pencapaian: "Skor Kesiapan 92/100",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100 scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
            Studi Kasus & Keberhasilan
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Dipercaya Pelaku UKM Menembus <span className="text-[#5170FF]">Pasar Modal SCF</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Kisah nyata para pendiri usaha yang berhasil menstandarisasi berkas bisnis mereka untuk meraih pendanaan publik.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#5170FF] bg-[#5170FF]/8 px-2.5 py-0.5 rounded-md">
                    {t.sektor}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    {t.pencapaian}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
