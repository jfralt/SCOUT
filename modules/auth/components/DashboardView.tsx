"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resendOtpAction, logoutAction } from "@/modules/auth/actions";
import DisclaimerBanner from "./DisclaimerBanner";
import DocumentModal from "./DocumentModal";
import {
  UserProfile,
  BusinessProfileRecord,
  DocumentWithRequirement,
  MatchmakingPlatformResult,
  DashboardMetric,
} from "../types";

interface Props {
  user: UserProfile;
  profile: BusinessProfileRecord | null;
  aggregatedDocs: DocumentWithRequirement[];
  matchmaking: MatchmakingPlatformResult[];
  metrics: DashboardMetric;
  hasConsent: boolean;
}

export default function DashboardView({
  user,
  profile,
  aggregatedDocs: initialDocs,
  matchmaking,
  metrics: initialMetrics,
  hasConsent: initialConsent,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"semua" | "revisi" | "valid">("semua");
  const [selectedDoc, setSelectedDoc] = useState<DocumentWithRequirement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasConsent, setHasConsent] = useState<boolean>(initialConsent);
  const [isResending, startResend] = useTransition();
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const handleResendOtp = () => {
    startResend(async () => {
      const result = await resendOtpAction(user.email);
      if (result.success) {
        setResendStatus("Kode OTP baru telah dikirimkan ke email Anda.");
        if (result.data?.otpDebug) {
          setDevOtp(result.data.otpDebug);
        }
      } else {
        setResendStatus(result.message || "Gagal mengirimkan kode OTP.");
      }
    });
  };

  const handleOpenDetail = (doc: DocumentWithRequirement) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  // Quick action from Langkah Berikutnya
  const handleOpenPriorityDocument = () => {
    const docToFix = initialDocs.find(
      (d) => d.statusKurasi === "Perlu Revisi" || d.kategori === "Keuangan"
    ) || initialDocs[0];
    if (docToFix) {
      handleOpenDetail(docToFix);
    }
  };

  // Filtered documents based on active tab
  const filteredDocs = initialDocs.filter((doc) => {
    if (activeTab === "revisi") return doc.statusKurasi === "Perlu Revisi" || !doc.uploaded;
    if (activeTab === "valid") return doc.statusKurasi === "Lengkap & Valid";
    return true; // "semua"
  });

  const totalPages = Math.ceil(filteredDocs.length / pageSize) || 1;
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Format Nilai Mata Uang
  const kebutuhanDanaDisplay = profile?.kebutuhan_dana
    ? `Rp${profile.kebutuhan_dana.toLocaleString("id-ID")}`
    : "Rp2.500.000.000";

  const namaBisnisDisplay = profile?.nama_bisnis || "PT Kopi Nusantara Sejahtera";
  const sektorDisplay = profile?.sektor || "F&B";
  const badanHukumDisplay = profile?.badan_hukum || "PT";
  const instrumenDisplay = profile?.jenis_efek || "Saham";

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-slate-800 font-sans pb-20">
      
      {/* 1. TOP NAVBAR: scout | SCF ACCELERATOR (Persis Mockup Baru) */}
      <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <img
                src="/logo.png"
                alt="SCOUT Logo"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                SCF ACCELERATOR
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <Link href="/#features" className="hover:text-[#5170FF] transition">Pilar Fitur</Link>
              <Link href="/#calculator" className="hover:text-[#5170FF] transition">Kalkulator Diagnosa</Link>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#5170FF] font-bold"
              >
                Dasbor
              </Link>
              <Link href="/#how-it-works" className="hover:text-[#5170FF] transition">Cara Kerja</Link>
              <Link href="/matchmaking" className="hover:text-[#5170FF] transition font-bold text-indigo-600">
                Kecocokan SCF
              </Link>
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold truncate max-w-[140px]">{user.nama}</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Banner W-VE.1: Verifikasi OTP Alert jika belum terverifikasi */}
        {!user.email_terverifikasi && (
          <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 text-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                <span>(!)</span>
                <span>Alamat Email Belum Terverifikasi</span>
              </div>
              <p className="text-xs text-slate-600">
                Kode verifikasi OTP telah dikirimkan ke <strong>{user.email}</strong>. Verifikasi email Anda untuk dapat mengunggah berkas persyaratan.
              </p>
              {resendStatus && (
                <p className="text-xs font-semibold text-[#5170FF] pt-0.5">{resendStatus}</p>
              )}
              {devOtp && (
                <div className="inline-flex items-center gap-2 bg-white px-2 py-0.5 rounded border border-amber-300 text-xs text-amber-800">
                  <span>OTP Dev:</span>
                  <span className="font-mono font-bold">{devOtp}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {isResending ? "Mengirim..." : "Kirim Ulang"}
              </button>
              <Link
                href={`/verify-otp?email=${encodeURIComponent(user.email)}`}
                className="px-3 py-1.5 rounded-lg bg-[#5170FF] text-white text-xs font-bold hover:bg-blue-600 transition"
              >
                Verifikasi OTP →
              </Link>
            </div>
          </div>
        )}

        {/* 2. SUB-HEADER: Breadcrumb & Title (Persis Mockup Baru) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
              <span>Dasbor</span> <span className="mx-1">/</span> <span className="text-[#5170FF]">Progres Persiapan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Ringkasan Progres Persiapan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Pantau kesiapan usaha Anda dan selesaikan langkah berikutnya menuju kurasi SCF.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 self-start sm:self-center font-medium bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <span>📅</span>
            <span>Terakhir diperbarui: 24 Nov 2026</span>
          </div>
        </div>

        {/* 3. PROFILE BANNER CARD: Usaha & Skor Kesiapan SCF (Persis Mockup Baru) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Side: PT Icon & Business Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#E8EEFF] text-[#5170FF] flex items-center justify-center font-bold text-lg shadow-2xs shrink-0">
              {badanHukumDisplay.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {namaBisnisDisplay}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#5170FF] border border-blue-200/60 flex items-center gap-1">
                  <span>🍴</span> <span>{sektorDisplay}</span>
                </span>
              </div>

              {/* Target, Instrumen, Tahap */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="block text-[10px] font-medium text-slate-400">Target Pendanaan</span>
                  <strong className="text-slate-900 font-bold">{kebutuhanDanaDisplay}</strong>
                </div>
                <div>
                  <span className="block text-[10px] font-medium text-slate-400">Instrumen</span>
                  <strong className="text-slate-900 font-bold">{instrumenDisplay}</strong>
                </div>
                <div>
                  <span className="block text-[10px] font-medium text-slate-400">Tahap Persiapan</span>
                  <strong className="text-slate-900 font-bold">Pra-Kurasi</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Skor Kesiapan SCF & Status Kelayakan */}
          <div className="flex items-center gap-6 sm:gap-8 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-4 lg:pt-0 lg:pl-8 self-stretch lg:self-auto justify-between lg:justify-end">
            <div className="w-40 sm:w-48">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                Skor Kesiapan SCF
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {initialMetrics.overallScore}
                </span>
                <span className="text-xs font-bold text-slate-400">/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#5170FF] rounded-full"
                  style={{ width: `${initialMetrics.overallScore}%` }}
                />
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                <span>✔</span> <span>{initialMetrics.statusKelayakan}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4. EMPAT KARTU STATISTIK (Persis Mockup Baru) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Dokumen Lengkap */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#5170FF] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400">Dokumen lengkap</span>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {initialMetrics.dokumenLengkap} dari {initialMetrics.totalDokumen} berkas
              </div>
            </div>
          </div>

          {/* Card 2: Perlu Revisi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400">Perlu revisi</span>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {initialMetrics.dokumenRevisi} berkas
              </div>
            </div>
          </div>

          {/* Card 3: Kecocokan Platform */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400">Kecocokan platform</span>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {initialMetrics.topMatchRate}% <span className="text-xs font-normal text-slate-400">({initialMetrics.platformCocokCount} platform)</span>
              </div>
            </div>
          </div>

          {/* Card 4: Estimasi Menuju Kurasi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#5170FF] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="block text-[11px] font-medium text-slate-400">Estimasi menuju kurasi</span>
              <div className="text-base font-black text-slate-900 mt-0.5">
                2 minggu
              </div>
              <span className="text-[10px] text-slate-400">setelah revisi laporan</span>
            </div>
          </div>
        </div>

        {/* 5. DUA KARTU UTAMA BERDAMPINGAN: Checklist Kesiapan & Langkah Berikutnya (Persis Mockup Baru) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Checklist Kesiapan Usaha (7 Col) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3 className="text-base font-bold text-slate-900">Checklist Kesiapan Usaha</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">50%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5170FF] rounded-full w-1/2" />
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 pt-2">
              
              {/* Item 1: Legalitas Usaha */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center justify-between gap-4 hover:border-slate-200 transition">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#5170FF] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Legalitas usaha</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                        ✔ Lengkap
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Akta pendirian, NIB, dan SKDU tervalidasi
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const legalDoc = initialDocs.find((d) => d.kategori === "Legalitas");
                    if (legalDoc) handleOpenDetail(legalDoc);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#5170FF] shrink-0 cursor-pointer"
                >
                  Lihat detail &gt;
                </button>
              </div>

              {/* Item 2: Laporan Keuangan */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center justify-between gap-4 hover:border-slate-200 transition">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Laporan keuangan</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                        ⚠ Perlu revisi
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Perincian utang jangka pendek dan rekonsiliasi kas
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const finDoc = initialDocs.find((d) => d.statusKurasi === "Perlu Revisi") || initialDocs[2];
                    if (finDoc) handleOpenDetail(finDoc);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#5170FF] shrink-0 cursor-pointer"
                >
                  Lihat detail &gt;
                </button>
              </div>

              {/* Item 3: Dokumen Prospektus */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center justify-between gap-4 hover:border-slate-200 transition">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Dokumen prospektus</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        • Belum dimulai
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Lengkapi profil usaha dan rencana penggunaan dana
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const propDoc = initialDocs.find((d) => d.kategori === "Operasional") || initialDocs[5];
                    if (propDoc) handleOpenDetail(propDoc);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-[#5170FF] shrink-0 cursor-pointer"
                >
                  Lihat detail &gt;
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT: Langkah Berikutnya (5 Col) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#5170FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-base font-bold text-slate-900">Langkah Berikutnya</h3>
              </div>

              {/* Step 1: Revisi Laporan Keuangan */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#5170FF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">Revisi laporan keuangan</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Prioritas saat ini
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={handleOpenPriorityDocument}
                        className="px-4 py-2 bg-[#5170FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <span>Perbaiki dokumen</span>
                        <span>&gt;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Lengkapi Prospektus */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-xs text-slate-700 font-medium">Lengkapi prospektus usaha</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-500 font-medium">
                      Berikutnya
                    </span>
                  </div>
                </div>

                {/* Step 3: Tinjau Rekomendasi Platform */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-xs text-slate-700 font-medium">Tinjau rekomendasi platform</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-500 font-medium">
                      Setelah dokumen siap
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tip */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
              <span className="text-slate-400 text-xs">ⓘ</span>
              <span>Selesaikan dokumen revisi agar proses kurasi dapat dilanjutkan.</span>
            </div>
          </div>

        </div>

        {/* 6. AKTIVITAS TERBARU (Persis Mockup Baru) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-base font-bold text-slate-900">Aktivitas Terbaru</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("document-table");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-semibold text-[#5170FF] hover:underline cursor-pointer"
            >
              Lihat semua aktivitas &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tile 1: Arus kas perlu revisi */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5170FF] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  Laporan arus kas ditandai perlu revisi
                </p>
                <span className="text-[10px] text-slate-400">10 Nov 2026</span>
              </div>
            </div>

            {/* Tile 2: NIB berhasil diverifikasi */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  NIB berhasil diverifikasi
                </p>
                <span className="text-[10px] text-slate-400">08 Nov 2026</span>
              </div>
            </div>

            {/* Tile 3: Akta pendirian dinyatakan valid */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#5170FF] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  Akta pendirian dinyatakan valid
                </p>
                <span className="text-[10px] text-slate-400">10 Nov 2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* 7. TABEL PELACAKAN DOKUMEN RINCI (Document Tracking - US-04) */}
        <div id="document-table" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Tabs Filter Header */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6">
              <button
                onClick={() => { setActiveTab("semua"); setCurrentPage(1); }}
                className={`text-xs font-bold pb-2 transition relative cursor-pointer ${
                  activeTab === "semua"
                    ? "text-[#5170FF]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Semua Berkas ({initialDocs.length})
                {activeTab === "semua" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF] rounded-full" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab("revisi"); setCurrentPage(1); }}
                className={`text-xs font-bold pb-2 transition relative cursor-pointer ${
                  activeTab === "revisi"
                    ? "text-[#5170FF]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Perlu Perhatian ({initialMetrics.dokumenRevisi + initialMetrics.dokumenKosong})
                {activeTab === "revisi" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF] rounded-full" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab("valid"); setCurrentPage(1); }}
                className={`text-xs font-bold pb-2 transition relative cursor-pointer ${
                  activeTab === "valid"
                    ? "text-[#5170FF]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sudah Valid ({initialMetrics.dokumenLengkap})
                {activeTab === "valid" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF] rounded-full" />
                )}
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              Klik <strong>Detail</strong> untuk mengunggah atau mengganti berkas persyaratan.
            </div>
          </div>

          {/* Table Konten Berkas */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFD] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">NAMA DOKUMEN PERSYARATAN</th>
                  <th className="py-3.5 px-4">KATEGORI</th>
                  <th className="py-3.5 px-4">STATUS KURASI</th>
                  <th className="py-3.5 px-4">TERAKHIR DIPERBAHARUI</th>
                  <th className="py-3.5 px-4">CATATAN TINDAKAN</th>
                  <th className="py-3.5 px-6 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition">
                    
                    {/* Nama Dokumen & File Info */}
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{doc.nama}</div>
                      {doc.namaFile && (
                        <div className="text-[11px] font-normal text-slate-400 mt-0.5 font-mono">
                          PDF ({Math.round((doc.ukuranKb || 2400) / 1024 * 10) / 10} MB)
                        </div>
                      )}
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50/80 text-[#5170FF]">
                        {doc.kategori}
                      </span>
                    </td>

                    {/* Status Kurasi */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          doc.statusKurasi === "Lengkap & Valid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : doc.statusKurasi === "Perlu Revisi"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doc.statusKurasi === "Lengkap & Valid"
                              ? "bg-emerald-500"
                              : doc.statusKurasi === "Perlu Revisi"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {doc.statusKurasi}
                      </span>
                    </td>

                    {/* Terakhir Diperbaharui */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                      {doc.terakhirDiperbaharui}
                    </td>

                    {/* Catatan Tindakan */}
                    <td className="py-4 px-4 text-slate-600 text-[11px] max-w-xs leading-relaxed">
                      {doc.catatanTindakan}
                    </td>

                    {/* Tombol Aksi Detail */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(doc)}
                        className="text-xs font-semibold text-[#5170FF] hover:text-blue-700 hover:underline cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination: < 1 2 > */}
          <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer ${
                  currentPage === idx + 1
                    ? "bg-[#5170FF] text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Disclaimer Banner (US-18 / BR-01, BR-02) */}
        <DisclaimerBanner />

        {/* Footer info persis mockup */}
        <div className="text-center text-xs text-slate-400 pt-4">
          © 2026 SCOUT. Hak cipta dilindungi.
        </div>
      </main>

      {/* Modal Detail & Upload Berkas (W-04.1 s/d W-04.10) */}
      <DocumentModal
        document={selectedDoc}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEmailVerified={user.email_terverifikasi}
        hasConsent={hasConsent}
        onConsentGiven={() => setHasConsent(true)}
        onUploadSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
