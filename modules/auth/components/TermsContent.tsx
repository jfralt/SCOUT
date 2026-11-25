"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TermsContent() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<number | null>(1); // Default bagian 1 terbuka (W-BL.3)

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#5170FF] text-xs font-semibold mb-3">
            Dokumentasi Hukum & Kepatuhan
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D2063] tracking-tight">
            Syarat dan Ketentuan Pemakaian SCOUT
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Harap baca aturan pemakaian dan batasan layanan platform SCOUT secara saksama.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          
          {/* 1. Batas Layanan (Paling Atas & Terbuka Default) */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(1)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-amber-950 text-sm cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-white flex items-center justify-center text-xs">!</span>
                <span>1. Batas Layanan & Penyangkalan (Disclaimer)</span>
              </div>
              <span className="text-lg font-mono">{openSection === 1 ? "[-]" : "[+]"}</span>
            </button>
            {openSection === 1 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed border-t border-amber-200 pt-3">
                <p>
                  <strong>Hasil Bersifat Indikatif:</strong> Seluruh rekomendasi, analisis kepatuhan dokumen, dan skor kesiapan (<em>SCF Readiness Score</em>) yang dihasilkan oleh platform SCOUT bersifat indikatif. Hasil ini <strong>TIDAK MENJAMIN</strong> bahwa usaha atau permohonan pendanaan Anda akan disetujui atau diterima oleh platform penyelenggara Securities Crowdfunding (SCF).
                </p>
                <p>
                  <strong>Bukan Rekomendasi Investasi:</strong> SCOUT tidak menyediakan saran, opini, analisis kelayakan investasi, atau ajakan membeli dan menjual efek. Skor kesiapan semata-mata mengukur kelengkapan administratif dan kesesuaian format dokumen bisnis.
                </p>
                <p>
                  <strong>Bukan Penyelenggara SCF:</strong> SCOUT beroperasi sebagai platform teknologi pendamping persiapan (<em>enabler</em>). SCOUT bukan lembaga penerbit izin dan bukan penyelenggara SCF resmi berizin OJK. Pengajuan resmi penerbitan efek wajib dilakukan langsung melalui platform penyelenggara SCF mitra berizin.
                </p>
              </div>
            )}
          </div>

          {/* 2. Tentang SCOUT */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(2)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-800 text-sm cursor-pointer select-none"
            >
              <span>2. Tentang Platform SCOUT</span>
              <span className="text-lg font-mono text-slate-400">{openSection === 2 ? "[-]" : "[+]"}</span>
            </button>
            {openSection === 2 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed border-t border-slate-100 pt-3">
                <p>
                  SCOUT adalah akselerator dan pemandu UKM Indonesia dalam mempersiapkan kelengkapan dokumen legalitas dan keuangan sesuai standar POJK No. 57/POJK.04/2020.
                </p>
                <p>
                  Layanan kami mencakup Document Tracking (pelacakan berkas), Document Assessment (diagnosa kesiapan), dan Platform Matchmaking (pencocokan profil usaha dengan penyelenggara SCF).
                </p>
              </div>
            )}
          </div>

          {/* 3. Data dan Privasi */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(3)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-800 text-sm cursor-pointer select-none"
            >
              <span>3. Data dan Kerahasiaan Berkas</span>
              <span className="text-lg font-mono text-slate-400">{openSection === 3 ? "[-]" : "[+]"}</span>
            </button>
            {openSection === 3 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed border-t border-slate-100 pt-3">
                <p>
                  Seluruh data profil bisnis, laporan keuangan, dan berkas identitas yang diunggah pengguna dilindungi dan hanya dapat diakses oleh pemilik akun yang sah.
                </p>
                <p>
                  SCOUT tidak akan membagikan dokumen rahasia perusahaan Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda saat memilih pengajuan matchmaking.
                </p>
              </div>
            )}
          </div>

          {/* 4. Kewajiban Pengguna */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(4)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-800 text-sm cursor-pointer select-none"
            >
              <span>4. Kewajiban Pengguna</span>
              <span className="text-lg font-mono text-slate-400">{openSection === 4 ? "[-]" : "[+]"}</span>
            </button>
            {openSection === 4 && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed border-t border-slate-100 pt-3">
                <p>
                  Pengguna bertanggung jawab penuh atas keaslian, keabsahan hukum, dan akurasi seluruh dokumen dan data yang diunggah ke platform SCOUT.
                </p>
                <p>
                  Penggunaan identitas palsu atau manipulasi laporan keuangan merupakan pelanggaran hukum yang dapat mengakibatkan penutupan akun secara permanen.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Back Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            ← Kembali ke Halaman Sebelumnya
          </button>
          <Link
            href="/"
            className="text-xs font-semibold text-[#5170FF] hover:underline"
          >
            Ke Beranda Utama
          </Link>
        </div>

      </div>
    </div>
  );
}
