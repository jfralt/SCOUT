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
    ? `Rp ${profile.kebutuhan_dana.toLocaleString("id-ID")}`
    : "Rp 2.500.000.000";

  const namaBisnisDisplay = profile?.nama_bisnis || "PT Kopi Nusantara Sejahtera";
  const sektorDisplay = profile?.sektor || "F&B";
  const badanHukumDisplay = profile?.badan_hukum || "PT";
  const instrumenDisplay = profile?.jenis_efek || "Saham Ekuitas";

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-slate-800 font-sans pb-16">
      
      {/* Top Navbar: scout | SCF ACCELERATOR */}
      <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-black text-[#5170FF] tracking-tight">scout</span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                SCF ACCELERATOR
              </span>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
              <Link href="/#features" className="hover:text-[#5170FF] transition">Pilar Fitur</Link>
              <Link href="/#calculator" className="hover:text-[#5170FF] transition">Kalkulator Diagnosa</Link>
              <Link href="/dashboard" className="text-[#5170FF] font-bold">Dasbor Demo</Link>
              <Link href="/#how-it-works" className="hover:text-[#5170FF] transition">Cara Kerja</Link>
              <Link href="/matchmaking" className="hover:text-[#5170FF] transition font-bold text-indigo-600">
                Kecocokan SCF
              </Link>
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <span className={`h-2 w-2 rounded-full ${user.email_terverifikasi ? "bg-emerald-500" : "bg-amber-400"}`} />
              <span className="font-semibold truncate max-w-[150px]">{user.nama}</span>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              >
                Keluar
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

        {/* 1. Profile Summary Card (Desain Persis Mockup) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left: PT Icon & Business Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#4D6EF7] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              {badanHukumDisplay.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {namaBisnisDisplay}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#5170FF] border border-blue-200/60">
                  Sektor: {sektorDisplay}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1.5 flex-wrap">
                <span>Target: {kebutuhanDanaDisplay}</span>
                <span>•</span>
                <span>Instrumen: {instrumenDisplay}</span>
                <span>•</span>
                <span>Tahap: Audit Diagnosa</span>
                <Link
                  href="/profile"
                  className="ml-2 text-xs font-bold text-[#5170FF] hover:underline"
                >
                  [Ubah Profil]
                </Link>
              </div>
            </div>
          </div>

          {/* Right: SCF READINESS SCORE & STATUS KELAYAKAN */}
          <div className="flex items-center gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 md:pl-8 self-stretch md:self-auto justify-between md:justify-end">
            <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                SCF READINESS SCORE
              </span>
              <div className="flex items-baseline justify-end gap-1 mt-0.5">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {initialMetrics.overallScore}
                </span>
                <span className="text-xs font-bold text-slate-400">/100</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                STATUS KELAYAKAN
              </span>
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-300">
                {initialMetrics.statusKelayakan}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Empat Kartu Statistik (4 Stat Cards persis Mockup) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Dokumen Lengkap & Valid */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              Dokumen Lengkap & Valid
            </span>
            <div className="mt-2 mb-1">
              <span className="text-2xl font-black text-teal-600">
                {initialMetrics.dokumenLengkap}
              </span>
              <span className="text-xs font-medium text-slate-600 ml-1.5">
                dari {initialMetrics.totalDokumen} berkas
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <span>✓</span> Memenuhi syarat legal
            </span>
          </div>

          {/* Card 2: Dokumen Butuh Revisi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              Dokumen Butuh Revisi
            </span>
            <div className="mt-2 mb-1">
              <span className="text-2xl font-black text-amber-500">
                {initialMetrics.dokumenRevisi}
              </span>
              <span className="text-xs font-medium text-slate-600 ml-1.5">
                berkas
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-600">
              Perlu rincian catatan
            </span>
          </div>

          {/* Card 3: Platform Mitra Cocok */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              Platform Mitra Cocok
            </span>
            <div className="mt-2 mb-1">
              <span className="text-2xl font-black text-indigo-600">
                {initialMetrics.platformCocokCount}
              </span>
              <span className="text-xs font-medium text-slate-600 ml-1.5">
                penyelenggara
              </span>
            </div>
            <Link
              href="/matchmaking"
              className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center justify-between"
            >
              <span>Match rate s.d. {initialMetrics.topMatchRate}%</span>
              <span>→</span>
            </Link>
          </div>

          {/* Card 4: Estimasi Waktu Siap */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              Estimasi Waktu Siap
            </span>
            <div className="mt-2 mb-1">
              <span className="text-2xl font-black text-amber-600">
                2
              </span>
              <span className="text-xs font-medium text-slate-600 ml-1.5">
                minggu
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              Setelah Revisi Laporan
            </span>
          </div>
        </div>

        {/* 3. Document Tracking Card: Tabs & Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Tabs Filter Header */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center gap-6">
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
