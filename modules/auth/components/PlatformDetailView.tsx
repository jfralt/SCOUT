"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { selectPlatformAction, upgradeTierAction } from "../actions";
import { PlatformRecord } from "../types";

interface Props {
  platform: PlatformRecord;
  isPremium: boolean;
  isCurrentlySelected: boolean;
  user: {
    id: string;
    nama: string;
    email: string;
  };
}

export default function PlatformDetailView({
  platform,
  isPremium,
  isCurrentlySelected: initialSelected,
  user,
}: Props) {
  const router = useRouter();
  const [isCurrentlySelected, setIsCurrentlySelected] = useState(initialSelected);
  const [isPendingSelect, startTransitionSelect] = useTransition();
  const [isPendingUpgrade, startTransitionUpgrade] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [upgradeSuccessMsg, setUpgradeSuccessMsg] = useState<string | null>(null);

  const handleSelectAsTarget = () => {
    startTransitionSelect(async () => {
      const res = await selectPlatformAction(platform.id);
      if (res.success) {
        setIsCurrentlySelected(true);
        setShowConfirmModal(true);
      }
    });
  };

  const handleSimulateUpgrade = () => {
    startTransitionUpgrade(async () => {
      const res = await upgradeTierAction("PREMIUM");
      if (res.success) {
        setUpgradeSuccessMsg(res.message);
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-slate-800 pb-24 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href="/matchmaking"
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#5170FF] transition"
          >
            <span>&lt;</span>
            <span>Kembali ke Hasil Kecocokan</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
              isPremium ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-slate-100 text-slate-600"
            }`}>
              {isPremium ? "◆ AKUN PREMIUM" : "AKUN FREE"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        
        {/* Banner Platform Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#5170FF] flex items-center justify-center font-black text-2xl shrink-0">
            {platform.nama.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {platform.nama}
              </h1>
              {isCurrentlySelected && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  ✓ Tujuan Anda
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Fokus Sektor: <strong className="text-slate-700">{platform.fokus_sektor}</strong>
            </p>
            <p className="text-xs text-slate-500">
              Badan Hukum Diterima: <strong className="text-slate-700">{platform.badan_hukum_diterima}</strong>
            </p>
          </div>
        </div>

        {upgradeSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            {upgradeSuccessMsg}
          </div>
        )}

        {/* ================= D4: INFORMASI LENGKAP (PREMIUM) ================= */}
        {isPremium && (
          <div className="space-y-5">
            {/* Profil Singkat */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                PROFIL SINGKAT
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {platform.profil_singkat || platform.deskripsi}
              </p>
            </div>

            {/* Jenis Efek yang Didukung */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                JENIS EFEK YANG DIDUKUNG
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {platform.jenis_efek_didukung}
              </p>
              <p className="text-[11px] text-slate-500">
                Penerbit dapat memilih skema penawaran efek kepemilikan saham ekuitas atau sukuk/obligasi sesuai ketentuan SCF.
              </p>
            </div>

            {/* Persyaratan Umum */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                PERSYARATAN UMUM PENERBIT
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {platform.persyaratan_umum || "Memiliki legalitas badan hukum, NIB aktif, dan laporan keuangan komprehensif."}
              </div>
            </div>

            {/* Tahapan Proses & Estimasi Biaya */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  TAHAPAN PROSES KURASI
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {platform.tahapan_proses || "Pendaftaran -> Due Diligence -> Listing Penawaran -> Pencairan Dana"}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  ESTIMASI BIAYA BAGI PENERBIT
                </h3>
                <div className="text-base font-extrabold text-slate-900">
                  Rp {(platform.estimasi_biaya / 1000000).toFixed(0)} Juta
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  ⓘ Estimasi bersifat indikatif, biaya final ditetapkan pada perjanjian penerbitan efek resmi.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= D5: INFORMASI DASAR + BAGIAN TERKUNCI (FREE) ================= */}
        {!isPremium && (
          <div className="space-y-4">
            {/* Ringkasan Satu Kalimat */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {platform.deskripsi || "Penyelenggara Securities Crowdfunding berizin resmi OJK."}
              </p>
            </div>

            {/* 4 Kartu Terkunci */}
            {["PROFIL SINGKAT", "JENIS EFEK", "PERSYARATAN UMUM", "TAHAPAN PROSES & BIAYA"].map((item) => (
              <div key={item} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm">🔒</span>
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                    {item}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Terkunci (PREMIUM)</span>
              </div>
            ))}

            {/* Ajakan Upgrade */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50/60 rounded-3xl p-6 border border-indigo-200 text-center space-y-3 shadow-xs">
              <div className="text-2xl">◆</div>
              <h3 className="text-sm sm:text-base font-black text-indigo-950">
                Buka Informasi Lengkap dengan Akun PREMIUM
              </h3>
              <p className="text-xs text-indigo-800 max-w-sm mx-auto leading-relaxed">
                Lihat rincian persyaratan kurasi, tahapan due diligence, dan panduan biaya langsung dari penyelenggara.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSimulateUpgrade}
                  disabled={isPendingUpgrade}
                  className="px-6 py-2.5 bg-[#5170FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                >
                  {isPendingUpgrade ? "Mengupgrade..." : "Buka Fitur Sekarang (Simulasi Upgrade Gratis)"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= D6: PENUTUP (TANGGAL PEMBARUAN & PERNYATAAN RESMI) ================= */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>🕒</span>
            <span>Data diperbarui: <strong>{platform.diperbarui_pada || "15 Nov 2026"}</strong></span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <strong>ⓘ Batas Layanan:</strong> Pengajuan resmi penerbitan efek dilakukan langsung di portal penyelenggara. Seluruh informasi yang disajikan SCOUT bersifat panduan persiapan pra-kurasi dan bukan saran investasi (BR-01, BR-09).
          </div>
        </div>

      </main>

      {/* Sticky Bottom Action Bar (W-35 / D6) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3.5 px-4 z-40 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/matchmaking"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Kembali
          </Link>

          <button
            type="button"
            onClick={handleSelectAsTarget}
            disabled={isPendingSelect}
            className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm ${
              isCurrentlySelected
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-[#0D2063] hover:bg-[#081545] text-white"
            }`}
          >
            {isPendingSelect
              ? "Menyimpan..."
              : isCurrentlySelected
              ? "✓ Tujuan Anda Saat Ini"
              : "Pilih Sebagai Tujuan"}
          </button>
        </div>
      </div>

      {/* ================= D7: MODAL KONFIRMASI TUJUAN TERSIMPAN ================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Penyelenggara Berhasil Dipilih!
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                <strong>{platform.nama}</strong> telah ditetapkan sebagai platform tujuan di profil bisnis Anda. Checklist dokumen dan indikator kesiapan Anda kini disesuaikan secara khusus.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="w-full py-2.5 rounded-xl bg-[#5170FF] text-white text-xs font-bold hover:bg-blue-600 transition"
              >
                Buka Dasbor Persiapan →
              </Link>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
