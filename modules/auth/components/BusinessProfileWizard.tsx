"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveBusinessProfileAction } from "../actions";
import { BusinessProfileRecord, ProfileActionResult } from "../types";

interface Props {
  initialData: BusinessProfileRecord | null;
}

export default function BusinessProfileWizard({ initialData }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [namaBisnis, setNamaBisnis] = useState(initialData?.nama_bisnis || "");
  const [badanHukum, setBadanHukum] = useState(initialData?.badan_hukum || "PT");
  const [sektor, setSektor] = useState(initialData?.sektor || "F&B / Kuliner");
  const [kondisiDokumen, setKondisiDokumen] = useState(initialData?.kondisi_dokumen || "Lengkap & Siap Audit");
  
  // Step 2 Fields
  const [kebutuhanDanaDisplay, setKebutuhanDanaDisplay] = useState(
    initialData?.kebutuhan_dana ? initialData.kebutuhan_dana.toLocaleString("id-ID") : "100.000.000"
  );
  const [kebutuhanDanaRaw, setKebutuhanDanaRaw] = useState(initialData?.kebutuhan_dana || 100000000);
  const [jangkaWaktu, setJangkaWaktu] = useState(initialData?.jangka_waktu_bulan || 12);
  const [tujuanPendanaan, setTujuanPendanaan] = useState(initialData?.tujuan_pendanaan || "Pengembangan Usaha");
  const [rencanaPenggunaan, setRencanaPenggunaan] = useState(initialData?.rencana_penggunaan || "Ekspansi Gerai & Cabang");
  const [penjelasanPenggunaan, setPenjelasanPenggunaan] = useState(
    initialData?.penjelasan_penggunaan || ""
  );
  const [dokumenName, setDokumenName] = useState(initialData?.dokumen_pendukung_url || "");
  const [actionType, setActionType] = useState<"submit" | "save_draft">("submit");

  const [state, formAction, isPending] = useActionState<ProfileActionResult | null, FormData>(
    saveBusinessProfileAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      if (state.data?.isDraft) {
        // Tetap di step saat ini dengan pesan draf
      } else {
        // Pindah ke step 3 (Konfirmasi Tersimpan)
        setCurrentStep(3);
      }
    }
  }, [state]);

  const handleKebutuhanDanaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(raw) || 0;
    setKebutuhanDanaRaw(num);
    setKebutuhanDanaDisplay(num ? num.toLocaleString("id-ID") : "");
  };

  const tujuanOptions = [
    "Pengembangan Usaha",
    "Pembelian Peralatan",
    "Pemasaran",
    "Modal Kerja",
    "Lainnya",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200/80">
        
        {/* Step Indicator (1 - 2 - 3) */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Step 1 */}
            <div
              onClick={() => setCurrentStep(1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors ${
                currentStep === 1
                  ? "bg-[#0D2063] text-white shadow-xs"
                  : currentStep > 1
                  ? "border border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border border-slate-300 text-slate-400 bg-white"
              }`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <div className={`w-12 sm:w-24 h-[1.5px] ${currentStep > 1 ? "bg-emerald-400" : "bg-slate-200"}`} />

            {/* Step 2 */}
            <div
              onClick={() => currentStep >= 2 && setCurrentStep(2)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep === 2
                  ? "bg-[#0D2063] text-white shadow-xs"
                  : currentStep > 2
                  ? "border border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border border-slate-300 text-slate-400 bg-white"
              }`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <div className={`w-12 sm:w-24 h-[1.5px] ${currentStep > 2 ? "bg-emerald-400" : "bg-slate-200"}`} />

            {/* Step 3 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 3
                  ? "bg-[#0D2063] text-white shadow-xs"
                  : "border border-slate-300 text-slate-400 bg-white"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {state?.message && (
          <div
            className={`mb-6 rounded-xl p-3.5 text-xs font-medium flex items-center gap-2 ${
              state.success
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-700"
            }`}
          >
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} noValidate>
          <input type="hidden" name="action_type" value={actionType} />
          <input type="hidden" name="kebutuhan_dana" value={kebutuhanDanaRaw} />
          <input type="hidden" name="tujuan_pendanaan" value={tujuanPendanaan} />
          <input type="hidden" name="dokumen_pendukung_name" value={dokumenName} />

          {/* ================= STEP 1: PROFIL & LEGALITAS ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D2063] tracking-tight">
                  Profil Usaha & Legalitas Bisnis
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Lengkapi identitas bisnis Anda agar SCOUT dapat memetakan instrumen dan checklist berkas yang relevan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Bisnis */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Nama Bisnis / Usaha UKM *
                  </label>
                  <input
                    type="text"
                    name="nama_bisnis"
                    value={namaBisnis}
                    onChange={(e) => setNamaBisnis(e.target.value)}
                    placeholder="Contoh: Kopi Nusantara Mandiri"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF]"
                  />
                  {state?.errors?.nama_bisnis && (
                    <p className="mt-1 text-[11px] text-rose-500 font-medium">
                      {state.errors.nama_bisnis[0]}
                    </p>
                  )}
                </div>

                {/* Badan Hukum */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Bentuk Badan Hukum *
                  </label>
                  <select
                    name="badan_hukum"
                    value={badanHukum}
                    onChange={(e) => setBadanHukum(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF] bg-white cursor-pointer"
                  >
                    <option value="PT">PT (Perseroan Terbatas) - Disukai SCF</option>
                    <option value="CV">CV (Persekutuan Komanditer)</option>
                    <option value="KOPERASI">Koperasi</option>
                    <option value="PERSEORANGAN">Perorangan / Belum Berbadan Hukum</option>
                  </select>
                </div>

                {/* Sektor Usaha */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Sektor Industri Usaha *
                  </label>
                  <select
                    name="sektor"
                    value={sektor}
                    onChange={(e) => setSektor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF] bg-white cursor-pointer"
                  >
                    <option value="F&B / Kuliner">F&B / Kuliner</option>
                    <option value="Ritel & Perdagangan">Ritel & Toko Modern</option>
                    <option value="Jasa & Teknologi">Jasa & Solusi Teknologi</option>
                    <option value="Manufaktur">Manufaktur & Pabrikasi</option>
                    <option value="Agrikultur">Agrikultur & Peternakan</option>
                    <option value="Kesehatan">Kesehatan & Farmasi</option>
                    <option value="Properti / Lainnya">Properti, Konstruksi & Lainnya</option>
                  </select>
                </div>

                {/* Kondisi Dokumen */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Kondisi Dokumen Saat Ini *
                  </label>
                  <select
                    name="kondisi_dokumen"
                    value={kondisiDokumen}
                    onChange={(e) => setKondisiDokumen(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF] bg-white cursor-pointer"
                  >
                    <option value="Lengkap & Siap Audit">Lengkap & Siap Audit (Akta PT, NIB, Laporan Keuangan)</option>
                    <option value="Sebagian Tersedia (Butuh Perapian)">Sebagian Tersedia (Butuh Bantuan Perapian)</option>
                    <option value="Belum Ada / Baru Memulai">Belum Lengkap / Baru Memulai Persiapan</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons Step 1 */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    onClick={() => setActionType("save_draft")}
                    disabled={isPending}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Simpan Draf
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    <span>Lanjut ke Target Dana</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: TARGET PENDANAAN (SCREENSHOT MATCH) ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D2063] tracking-tight">
                  Tentukan Target Pendanaan Anda
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Sesuaikan kebutuhan dana dengan rencana pengembangan usaha Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Jumlah Dana yang Dibutuhkan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Jumlah Dana yang Dibutuhkan *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={kebutuhanDanaDisplay}
                        onChange={handleKebutuhanDanaChange}
                        placeholder="Masukkan nominal dana yang dibutuhkan"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF]"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Minimum pengajuan is Rp 50.000.000
                    </p>
                    {state?.errors?.kebutuhan_dana && (
                      <p className="mt-1 text-[11px] text-rose-500 font-medium">
                        {state.errors.kebutuhan_dana[0]}
                      </p>
                    )}
                  </div>

                  {/* Tujuan Pendanaan (Cards Selection) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Tujuan Pendanaan *
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {tujuanOptions.slice(0, 4).map((tujuan) => (
                        <button
                          key={tujuan}
                          type="button"
                          onClick={() => setTujuanPendanaan(tujuan)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center gap-2.5 transition cursor-pointer ${
                            tujuanPendanaan === tujuan
                              ? "border-[#0D2063] bg-[#0D2063]/5 text-[#0D2063] font-bold"
                              : "border-slate-200 hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{tujuan}</span>
                        </button>
                      ))}
                    </div>
                    {/* Opsi Lainnya */}
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => setTujuanPendanaan("Lainnya")}
                        className={`w-full p-3 rounded-xl border text-xs font-medium text-left flex items-center gap-2.5 transition cursor-pointer ${
                          tujuanPendanaan === "Lainnya"
                            ? "border-[#0D2063] bg-[#0D2063]/5 text-[#0D2063] font-bold"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Lainnya</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Jangka Waktu Pendanaan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Jangka Waktu Pendanaan *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <select
                        name="jangka_waktu_bulan"
                        value={jangkaWaktu}
                        onChange={(e) => setJangkaWaktu(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF] bg-white cursor-pointer"
                      >
                        <option value={12}>12 Bulan (1 Tahun)</option>
                        <option value={24}>24 Bulan (2 Tahun)</option>
                        <option value={36}>36 Bulan (3 Tahun)</option>
                        <option value={48}>48 Bulan (4 Tahun)</option>
                      </select>
                    </div>
                  </div>

                  {/* Rencana Penggunaan Dana */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Rencana Penggunaan Dana *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <select
                        name="rencana_penggunaan"
                        value={rencanaPenggunaan}
                        onChange={(e) => setRencanaPenggunaan(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF] bg-white cursor-pointer"
                      >
                        <option value="Ekspansi Gerai & Cabang">Ekspansi Gerai & Pembukaan Cabang Baru</option>
                        <option value="Investasi Mesin & Peralatan Produksi">Investasi Mesin & Peralatan Produksi</option>
                        <option value="Modal Kerja & Pasokan Bahan Baku">Modal Kerja & Pasokan Bahan Baku</option>
                        <option value="Digitalisasi & Kampanye Pemasaran">Digitalisasi & Kampanye Pemasaran</option>
                        <option value="Lainnya">Pengembangan Lainnya</option>
                      </select>
                    </div>
                  </div>

                  {/* Jelaskan Rencana Penggunaan Dana */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Jelaskan Rencana Penggunaan Dana *
                    </label>
                    <div className="relative">
                      <textarea
                        name="penjelasan_penggunaan"
                        rows={3}
                        value={penjelasanPenggunaan}
                        onChange={(e) => setPenjelasanPenggunaan(e.target.value)}
                        placeholder="Uraikan secara rinci rencana penggunaan dana, termasuk target atau hasil yang ingin dicapai."
                        className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#5170FF]"
                      />
                    </div>
                    {state?.errors?.penjelasan_penggunaan && (
                      <p className="mt-1 text-[11px] text-rose-500 font-medium">
                        {state.errors.penjelasan_penggunaan[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dokumen Pendukung (Opsional) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Dokumen Pendukung (Opsional)
                </label>
                <div className="border border-slate-300 rounded-xl p-4 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {dokumenName || "Unggah dokumen pendukung (jika ada)"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Format: PDF, JPG, atau PNG (maks. 10 MB)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDokumenName("ringkasan_eksekutif_ukm.pdf")}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    {dokumenName ? "Ganti File" : "Pilih File"}
                  </button>
                </div>
              </div>

              {/* Bottom Buttons (Screenshot Match) */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  ← Kembali
                </button>
                
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    onClick={() => setActionType("save_draft")}
                    disabled={isPending}
                    className="px-4 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Simpan Sementara
                  </button>
                  <button
                    type="submit"
                    onClick={() => setActionType("submit")}
                    disabled={isPending}
                    className="px-8 py-3 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-2"
                  >
                    {isPending ? (
                      <span>Menyimpan...</span>
                    ) : (
                      <>
                        <span>Kirim Pengajuan</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: KONFIRMASI TERSIMPAN (FLOWCHART US-02) ================= */}
          {currentStep === 3 && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl mx-auto shadow-xs">
                ✓
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0D2063] tracking-tight">
                  Profil Bisnis & Kebutuhan Dana Tersimpan!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  SCOUT kini telah menyesuaikan checklist dokumen dan menyiapkan pencocokan platform penyelenggara SCF yang sesuai dengan skala usaha Anda.
                </p>
              </div>

              {/* Ringkasan Profil Singkat */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Bisnis:</span>
                  <span className="font-semibold text-black">{namaBisnis || "UKM Mitra"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Badan Hukum:</span>
                  <span className="font-semibold text-black">{badanHukum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sektor Industri:</span>
                  <span className="font-semibold text-black">{sektor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kebutuhan Dana:</span>
                  <span className="font-bold text-[#5170FF]">Rp {kebutuhanDanaDisplay}</span>
                </div>
              </div>

              {/* Aksi Sesuai Flowchart: Checklist vs Penyelenggara vs Nanti Saja */}
              <div className="max-w-md mx-auto pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  Ke Halaman Dasbor Utama
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Ubah Kembali Profil
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
