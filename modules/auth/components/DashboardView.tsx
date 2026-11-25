"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { resendOtpAction, logoutAction } from "@/modules/auth/actions";
import DisclaimerBanner from "./DisclaimerBanner";
import { BusinessProfileRecord } from "../types";

interface Props {
  user: {
    id: string;
    nama: string;
    email: string;
    email_terverifikasi: boolean;
  };
  profile: BusinessProfileRecord | null;
}

export default function DashboardView({ user, profile }: Props) {
  const [isResending, startResend] = useTransition();
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [showUploadDeniedModal, setShowUploadDeniedModal] = useState<boolean>(false);

  const handleResendOtp = () => {
    startResend(async () => {
      const result = await resendOtpAction(user.email);
      if (result.success) {
        setResendStatus("Kode verifikasi OTP baru telah dikirimkan ke email Anda.");
        if (result.data?.otpDebug) {
          setDevOtp(result.data.otpDebug);
        }
      } else {
        setResendStatus(result.message || "Gagal mengirimkan kode OTP.");
      }
    });
  };

  const handleUploadClick = () => {
    // US-24 AC8 / W-VE.5: Unggahan ditolak bila email belum diverifikasi
    if (!user.email_terverifikasi) {
      setShowUploadDeniedModal(true);
    } else {
      alert("Fitur unggah dokumen akan aktif pada modul Document Tracking (US-04).");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Header Dasbor */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.png" alt="SCOUT Logo" className="h-8 w-auto object-contain" />
            <span className="hidden sm:inline-block border-l border-slate-200 pl-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Dasbor Penerbit UKM
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${
                  user.email_terverifikasi ? "bg-emerald-500" : "bg-amber-400"
                }`}
              />
              <span className="font-bold text-slate-800">{user.nama}</span>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Banner W-VE.1: Pengingat Email Belum Terverifikasi (US-24 AC7) */}
        {!user.email_terverifikasi && (
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/80 p-5 sm:p-6 text-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>(!) Alamat Email Belum Terverifikasi</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  Kami telah mengirimkan kode verifikasi OTP ke <strong>{user.email}</strong>. Verifikasi email Anda sekarang agar Anda dapat mengunggah dokumen legalitas dan mengajukan kurasi pendanaan.
                </p>
                {resendStatus && (
                  <p className="text-xs font-semibold text-[#5170FF] pt-1">
                    {resendStatus}
                  </p>
                )}
                {devOtp && (
                  <div className="inline-flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-amber-300 text-xs text-amber-800 mt-2">
                    <span className="font-semibold">Kode OTP Dev:</span>
                    <span className="font-mono font-bold text-sm">{devOtp}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  {isResending ? "Mengirim..." : "Kirim Ulang Kode OTP"}
                </button>
                <Link
                  href={`/verify-otp?email=${encodeURIComponent(user.email)}`}
                  className="px-4 py-2 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  Masukkan Kode OTP →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Greeting Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-[#5170FF] tracking-wide uppercase">
              Selamat datang kembali,
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
              {user.nama}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Kelola profil bisnis dan pantau kesiapan penggalangan dana UKM Anda melalui skema Securities Crowdfunding.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5170FF] hover:bg-[#3f5fe8] text-white text-xs font-bold transition shadow-xs"
            >
              <span>{profile ? "Perbarui Profil Bisnis" : "Isi Profil Bisnis Sekarang"}</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Cards Grid: W-06 (Profil UKM & Dokumen Saya) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Profil UKM */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Profil Usaha UKM
                </span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    profile
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {profile ? "Profil Terisi" : "Belum Lengkap"}
                </span>
              </div>
              
              {profile ? (
                <div className="space-y-3 text-xs sm:text-sm">
                  <h3 className="text-lg font-bold text-black">
                    {profile.nama_bisnis || "Bisnis UKM Anda"}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-xs block">Badan Hukum:</span>
                      <span className="font-semibold text-slate-800">{profile.badan_hukum}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Sektor Industri:</span>
                      <span className="font-semibold text-slate-800">{profile.sektor}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-slate-400 text-xs block">Target Kebutuhan Dana:</span>
                      <span className="font-bold text-[#5170FF]">
                        Rp {profile.kebutuhan_dana.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-slate-400 text-xs block">Kondisi Dokumen:</span>
                      <span className="font-semibold text-slate-800 truncate block">
                        {profile.kondisi_dokumen}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <h3 className="text-base font-bold text-slate-800">
                    Profil Bisnis Belum Dilengkapi
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Isi data badan hukum dan target pendanaan agar SCOUT dapat menyesuaikan checklist dokumen dan mencocokkan Anda dengan platform SCF.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <Link
                href="/profile"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                {profile ? "Ubah Data Profil" : "Lengkapi Profil Sekarang"}
              </Link>
            </div>
          </div>

          {/* Card Dokumen Saya */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Checklist Dokumen Saya
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  0 Berkas Terunggah
                </span>
              </div>
              <div className="space-y-2 py-4">
                <h3 className="text-base font-bold text-slate-800">
                  Kelola & Unggah Berkas Administratif
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Unggah Akta Pendirian PT, NIB RBA, Laporan Keuangan, dan Prospektus Usaha untuk dievaluasi kelayakannya oleh sistem assessment.
                </p>
                {!user.email_terverifikasi && (
                  <p className="text-[11px] text-amber-600 font-medium">
                    * Memerlukan verifikasi email terlebih dahulu sebelum dapat mengunggah dokumen.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-xs font-semibold text-white transition cursor-pointer shadow-xs"
              >
                Unggah Dokumen Baru
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer Batas Layanan (US-18) */}
        <DisclaimerBanner />

      </main>

      {/* Modal W-VE.5: Unggahan Ditolak (US-24 AC8) */}
      {showUploadDeniedModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto">
              !
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Unggahan Ditolak</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Verifikasi email Anda terlebih dahulu sebelum mengunggah dokumen administratif dan legalitas.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={`/verify-otp?email=${encodeURIComponent(user.email)}`}
                className="w-full py-2.5 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-xs font-semibold transition"
              >
                Verifikasi Email Sekarang
              </Link>
              <button
                type="button"
                onClick={() => setShowUploadDeniedModal(false)}
                className="w-full py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
