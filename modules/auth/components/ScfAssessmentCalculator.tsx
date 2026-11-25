"use client";

import React, { useState } from "react";
import {
  UkmAssessmentInput,
  SektorUsaha,
  BentukBadanHukum,
  StatusLaporanKeuangan,
  TargetPendanaan,
} from "../types";
import { evaluasiKesiapanScf } from "../utils/calculator";

export default function ScfAssessmentCalculator() {
  const [inputData, setInputData] = useState<UkmAssessmentInput>({
    namaBisnis: "Kopi Nusantara Sejahtera",
    sektor: "fnb",
    badanHukum: "PT",
    usiaOperasionalTahun: 3,
    laporanKeuangan: "internal_2_tahun",
    targetPendanaan: "500jt_2m",
  });

  const [copied, setCopied] = useState(false);

  const hasilEvaluasi = evaluasiKesiapanScf(inputData);

  const handleCopySummary = () => {
    const text = `=== RINGKASAN DIAGNOSA KESIAPAN SCF - SCOUT ===
Bisnis: ${inputData.namaBisnis} (${inputData.sektor.toUpperCase()})
Badan Hukum: ${inputData.badanHukum}
Lama Beroperasi: ${inputData.usiaOperasionalTahun} Tahun
Target Dana: ${inputData.targetPendanaan}

Skor Kesiapan SCF: ${hasilEvaluasi.skorKesiapan}/100 (${hasilEvaluasi.labelTingkat})
Rekomendasi Instrumen: ${hasilEvaluasi.labelInstrumen}
Estimasi Waktu Persiapan: ${hasilEvaluasi.estimasiPersiapanMinggu} Minggu
Platform Teratas: ${hasilEvaluasi.platformRekomendasi[0].nama} (${hasilEvaluasi.platformRekomendasi[0].matchScore}% Match)

Cek kelayakan berkas Anda di SCOUT (Platform Pendamping SCF)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="diagnosa" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 scroll-mt-16 border-y border-slate-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5170FF]/20 bg-[#5170FF]/5 px-3.5 py-1 text-xs font-semibold text-[#5170FF] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5170FF] animate-pulse" />
            Document Assessment Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Kalkulator Diagnosa <span className="text-[#5170FF]">Kesiapan SCF</span>
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Simulasikan tingkat kelayakan berkas UKM Anda sebelum mengajukan kurasi resmi ke platform penyelenggara SCF berizin OJK.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Input UKM */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-black flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5170FF] text-white text-xs font-bold">
                  1
                </span>
                Profil & Karakteristik UKM
              </h3>
              <span className="text-xs text-slate-400">Parameter POJK 57/2020</span>
            </div>

            <div className="space-y-5">
              {/* Nama Usaha */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Nama Bisnis / Brand
                </label>
                <input
                  type="text"
                  value={inputData.namaBisnis}
                  onChange={(e) => setInputData({ ...inputData, namaBisnis: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#5170FF] focus:outline-none focus:ring-1 focus:ring-[#5170FF] transition"
                  placeholder="Contoh: PT Kopi Nusantara Sejahtera"
                />
              </div>

              {/* Sektor Industri & Badan Hukum */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Sektor Industri
                  </label>
                  <select
                    value={inputData.sektor}
                    onChange={(e) => setInputData({ ...inputData, sektor: e.target.value as SektorUsaha })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-black bg-white focus:border-[#5170FF] focus:outline-none focus:ring-1 focus:ring-[#5170FF]"
                  >
                    <option value="fnb">Kuliner / F&B</option>
                    <option value="ritel">Ritel & Waralaba</option>
                    <option value="manufaktur">Manufaktur & Pabrikasi</option>
                    <option value="jasa">Jasa & Kreatif</option>
                    <option value="agrikultur">Pertanian & Agrikultur</option>
                    <option value="kesehatan">Kesehatan & Farmasi</option>
                    <option value="teknologi">Teknologi & Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Bentuk Badan Usaha
                  </label>
                  <select
                    value={inputData.badanHukum}
                    onChange={(e) => setInputData({ ...inputData, badanHukum: e.target.value as BentukBadanHukum })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-black bg-white focus:border-[#5170FF] focus:outline-none focus:ring-1 focus:ring-[#5170FF]"
                  >
                    <option value="PT">Perseroan Terbatas (PT)</option>
                    <option value="CV">CV / Firma</option>
                    <option value="BELUM_BERBADAN_HUKUM">Belum Berbadan Hukum</option>
                  </select>
                </div>
              </div>

              {/* Usia Operasional Usaha Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Lama Operasional Usaha
                  </label>
                  <span className="text-xs font-bold text-[#5170FF] bg-[#5170FF]/10 px-2.5 py-0.5 rounded-md">
                    {inputData.usiaOperasionalTahun} Tahun
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={inputData.usiaOperasionalTahun}
                  onChange={(e) => setInputData({ ...inputData, usiaOperasionalTahun: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Baru / &lt; 1 Thn</span>
                  <span>2 Thn (Standar OJK)</span>
                  <span>5+ Thn (Mapan)</span>
                </div>
              </div>

              {/* Status Laporan Keuangan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Kesiapan Laporan Keuangan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "audited_2_tahun", label: "Audited KAP (2 Tahun)", desc: "Standar tertinggi kurasi SCF" },
                    { id: "internal_2_tahun", label: "Internal Rapi (2 Tahun)", desc: "Laba Rugi & Neraca lengkap" },
                    { id: "internal_1_tahun", label: "Internal (1 Tahun)", desc: "Butuh penambahan periode" },
                    { id: "sederhana_kas", label: "Catatan Arus Kas Kasir", desc: "Wajib restrukturisasi pembukuan" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInputData({ ...inputData, laporanKeuangan: item.id as StatusLaporanKeuangan })}
                      className={`text-left p-3 rounded-xl border transition cursor-pointer ${
                        inputData.laporanKeuangan === item.id
                          ? "border-[#5170FF] bg-[#5170FF]/5 text-black ring-1 ring-[#5170FF]"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                      }`}
                    >
                      <p className="text-xs font-bold text-black">{item.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Pendanaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Target Nominal Dana Dibutuhkan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "bawah_500jt", label: "< Rp 500 Jt" },
                    { id: "500jt_2m", label: "Rp 500 Jt - 2 M" },
                    { id: "2m_5m", label: "Rp 2 M - 5 M" },
                    { id: "5m_10m", label: "Rp 5 M - 10 M" },
                  ].map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setInputData({ ...inputData, targetPendanaan: target.id as TargetPendanaan })}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        inputData.targetPendanaan === target.id
                          ? "border-[#5170FF] bg-[#5170FF] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Kolom Hasil Diagnosa Real-Time */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Kartu Skor Kesiapan Utama */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Hasil Diagnosa Dokumen
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${hasilEvaluasi.warnaBadge}`}>
                  {hasilEvaluasi.labelTingkat}
                </span>
              </div>

              {/* Skor Besar */}
              <div className="py-5 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tight text-black">
                  {hasilEvaluasi.skorKesiapan}
                </span>
                <span className="text-slate-400 font-bold text-lg">/ 100</span>
                <span className="ml-auto text-xs font-semibold text-[#5170FF]">
                  Target Kurasi: &ge; 75
                </span>
              </div>

              {/* Progress Bar Kesiapan */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
                <div
                  className="bg-[#5170FF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${hasilEvaluasi.skorKesiapan}%` }}
                />
              </div>

              {/* Instrumen Rekomendasi */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Rekomendasi Instrumen Efek
                </p>
                <p className="text-sm font-bold text-black mt-0.5">
                  {hasilEvaluasi.labelInstrumen}
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {hasilEvaluasi.penjelasanInstrumen}
                </p>
              </div>

              {/* Platform Terbaik */}
              <div className="bg-blue-50/50 rounded-xl p-3.5 border border-[#5170FF]/20 mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-black">
                    Platform SCF Paling Cocok
                  </span>
                  <span className="text-xs font-extrabold text-[#5170FF]">
                    {hasilEvaluasi.platformRekomendasi[0].matchScore}% Match
                  </span>
                </div>
                <p className="text-sm font-bold text-[#5170FF]">
                  {hasilEvaluasi.platformRekomendasi[0].nama}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {hasilEvaluasi.platformRekomendasi[0].keunggulan}
                </p>
              </div>

              {/* Checklist Singkat Dokumen */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-slate-700">Checklist Berkas Pokok:</p>
                {hasilEvaluasi.checklistDokumen.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-600 truncate max-w-[200px]" title={doc.nama}>
                      {doc.nama}
                    </span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                        doc.status === "LENGKAP"
                          ? "bg-emerald-50 text-emerald-600"
                          : doc.status === "PERLU_REVISI"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {doc.status === "LENGKAP" ? "Lengkap" : doc.status === "PERLU_REVISI" ? "Revisi" : "Belum Ada"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full rounded-xl bg-black py-3 px-4 text-center text-xs font-bold text-white hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied ? "Tersalin ke Clipboard!" : "Salin Ringkasan Diagnosa"}
                </button>
                <a
                  href="#dashboard"
                  className="block w-full rounded-xl bg-[#5170FF] py-3 px-4 text-center text-xs font-bold text-white hover:bg-[#3d57e8] transition shadow-sm"
                >
                  Buka Dasbor Simulasi
                </a>
              </div>
            </div>

            {/* Note Edukasi Regulasi */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 leading-relaxed">
              <strong className="text-black">Kepatuhan Regulasi:</strong> Sesuai POJK 57/2020, penghimpunan dana efek saham hanya dapat dilakukan oleh UKM berbadan hukum PT dengan batas emisi maksimal Rp 10 Miliar per 12 bulan.
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

