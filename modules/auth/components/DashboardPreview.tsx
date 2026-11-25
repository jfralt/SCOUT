"use client";

import React, { useState } from "react";

interface DokumenRow {
  id: string;
  nama: string;
  kategori: string;
  tipeFile: string;
  status: "VALID" | "REVISI" | "KOSONG" | "REVIEW";
  terakhirDiperbarui: string;
  catatan: string;
}

const DOKUMEN_DATA: DokumenRow[] = [
  {
    id: "D-01",
    nama: "Akta Pendirian PT & SK Kemenkumham (AHU)",
    kategori: "Legalitas",
    tipeFile: "PDF (2.4 MB)",
    status: "VALID",
    terakhirDiperbarui: "10 Nov 2026",
    catatan: "KBLI sesuai dengan kegiatan usaha utama.",
  },
  {
    id: "D-02",
    nama: "Nomor Induk Berusaha (NIB) Berbasis Risiko",
    kategori: "Legalitas",
    tipeFile: "PDF (1.1 MB)",
    status: "VALID",
    terakhirDiperbarui: "08 Nov 2026",
    catatan: "Terverifikasi aktif di sistem OSS RBA.",
  },
  {
    id: "D-03",
    nama: "Laporan Neraca & Laba Rugi (2024 - 2025)",
    kategori: "Keuangan",
    tipeFile: "XLSX (4.8 MB)",
    status: "REVISI",
    terakhirDiperbarui: "Kemarin, 14:20",
    catatan: "Perlu rincian catatan utang jangka pendek & rekonsiliasi kas bank.",
  },
  {
    id: "D-04",
    nama: "Rekening Koran Bank Operasional (6 Bulan)",
    kategori: "Keuangan",
    tipeFile: "PDF (6.2 MB)",
    status: "VALID",
    terakhirDiperbarui: "05 Nov 2026",
    catatan: "Arus kas konsisten dengan omzet bulanan.",
  },
  {
    id: "D-05",
    nama: "Prospektus Bisnis & Proyeksi Finansial",
    kategori: "Prospektus",
    tipeFile: "PDF (8.5 MB)",
    status: "REVIEW",
    terakhirDiperbarui: "Hari ini, 09:15",
    catatan: "Sedang dalam diagnosa kelayakan model bisnis.",
  },
  {
    id: "D-06",
    nama: "Surat Keterangan Bebas Pajak (SKB) / SPT Tahunan",
    kategori: "Legalitas",
    tipeFile: "-",
    status: "KOSONG",
    terakhirDiperbarui: "-",
    catatan: "Belum diunggah oleh pengurus UKM.",
  },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"semua" | "revisi" | "valid">("semua");
  const [filterKategori, setFilterKategori] = useState<string>("semua");

  const filteredDocs = DOKUMEN_DATA.filter((doc) => {
    if (activeTab === "revisi" && doc.status !== "REVISI" && doc.status !== "KOSONG") return false;
    if (activeTab === "valid" && doc.status !== "VALID") return false;
    if (filterKategori !== "semua" && doc.kategori.toLowerCase() !== filterKategori.toLowerCase()) return false;
    return true;
  });

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5170FF]/20 bg-[#5170FF]/5 px-3.5 py-1 text-xs font-semibold text-[#5170FF] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5170FF]" />
              Interactive Dashboard Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              Dasbor Manajemen & <span className="text-[#5170FF]">Tracking Dokumen SCF</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
              Pratinjau antarmuka kerja pelaku UKM dalam memantau siklus hidup berkas, skor kesiapan, dan rekomendasi platform sebelum kurasi resmi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Mode Pratinjau:</span>
            <span className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-black">
              Simulasi Profil UKM
            </span>
          </div>
        </div>

        {/* Dashboard Container (Card) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
          
          {/* Top Bar / Profile Overview */}
          <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#5170FF] flex items-center justify-center text-white font-black text-lg shadow-sm">
                PT
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-black">PT Kopi Nusantara Sejahtera</h3>
                  <span className="bg-blue-50 text-[#5170FF] border border-[#5170FF]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Sektor: F&B
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target: Rp 2.500.000.000 • Instrumen: Saham Ekuitas • Tahap: Audit Diagnosa
                </p>
              </div>
            </div>

            {/* Quick Metrics Header */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">SCF Readiness Score</p>
                <p className="text-2xl font-black text-black">
                  84<span className="text-sm font-semibold text-slate-400">/100</span>
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-right">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status Kelayakan</p>
                <span className="inline-block mt-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Siap Kurasi
                </span>
              </div>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-100 divide-x divide-y md:divide-y-0 divide-slate-100">
            <div className="p-5">
              <p className="text-xs text-slate-400 font-medium">Dokumen Lengkap & Valid</p>
              <p className="text-2xl font-extrabold text-black mt-1">3 <span className="text-xs text-slate-400 font-normal">dari 6 berkas</span></p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ Memenuhi syarat legal</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-400 font-medium">Dokumen Butuh Revisi</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">1 <span className="text-xs text-slate-400 font-normal">berkas</span></p>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">Perlu rincian catatan</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-400 font-medium">Platform Mitra Cocok</p>
              <p className="text-2xl font-extrabold text-[#5170FF] mt-1">3 <span className="text-xs text-slate-400 font-normal">penyelenggara</span></p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">Match rate s.d. 95%</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-400 font-medium">Estimasi Waktu Siap</p>
              <p className="text-2xl font-extrabold text-black mt-1">2 <span className="text-xs text-slate-400 font-normal">minggu</span></p>
              <p className="text-[11px] text-slate-400 font-semibold mt-1">Setelah revisi laporan</p>
            </div>
          </div>

          {/* Table Controls */}
          <div className="p-6 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 border border-slate-200 p-1 rounded-xl bg-slate-50 self-start">
              <button
                onClick={() => setActiveTab("semua")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  activeTab === "semua" ? "bg-white text-black shadow-xs" : "text-slate-500 hover:text-black"
                }`}
              >
                Semua Berkas (6)
              </button>
              <button
                onClick={() => setActiveTab("revisi")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  activeTab === "revisi" ? "bg-white text-amber-600 shadow-xs" : "text-slate-500 hover:text-black"
                }`}
              >
                Perlu Perhatian (2)
              </button>
              <button
                onClick={() => setActiveTab("valid")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  activeTab === "valid" ? "bg-white text-emerald-600 shadow-xs" : "text-slate-500 hover:text-black"
                }`}
              >
                Sudah Valid (3)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Kategori:</span>
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="text-xs font-semibold border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700"
              >
                <option value="semua">Semua Kategori</option>
                <option value="legalitas">Legalitas</option>
                <option value="keuangan">Keuangan</option>
                <option value="prospektus">Prospektus</option>
              </select>
            </div>
          </div>

          {/* Document Table */}
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 pr-4">Nama Dokumen Persyaratan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Status Kurasi</th>
                  <th className="py-3 px-4">Terakhir Diperbarui</th>
                  <th className="py-3 px-4">Catatan Tindakan</th>
                  <th className="py-3 pl-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 pr-4">
                      <p className="font-bold text-black text-xs sm:text-sm">{doc.nama}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.tipeFile}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {doc.kategori}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {doc.status === "VALID" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Lengkap & Valid
                        </span>
                      )}
                      {doc.status === "REVISI" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Perlu Revisi
                        </span>
                      )}
                      {doc.status === "REVIEW" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5170FF] bg-blue-50 border border-[#5170FF]/20 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5170FF]" />
                          Sedang Ditinjau
                        </span>
                      )}
                      {doc.status === "KOSONG" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          Belum Diunggah
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {doc.terakhirDiperbarui}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600 max-w-xs">
                      {doc.catatan}
                    </td>
                    <td className="py-4 pl-4 text-right whitespace-nowrap">
                      <button className="text-xs font-bold text-[#5170FF] hover:underline cursor-pointer">
                        {doc.status === "KOSONG" ? "Unggah" : "Detail"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Dashboard Footer Banner */}
          <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-[#5170FF]" />
              Penyelenggara SCF Mitra Terhubung: <strong>Bizhare</strong> (95% Match), <strong>Santara</strong> (92% Match), <strong>Shafiq</strong> (89% Match)
            </div>
            <a
              href="#diagnosa"
              className="text-xs font-bold text-[#5170FF] hover:underline"
            >
              Uji Coba Profil Usaha Anda &rarr;
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

