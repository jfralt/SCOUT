"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserProfile, BusinessProfileRecord, MatchmakingPlatformResult } from "../types";

interface Props {
  user: UserProfile;
  isProfileComplete: boolean;
  profile: BusinessProfileRecord | null;
  matchmaking: MatchmakingPlatformResult[];
}

export default function MatchmakingView({
  user,
  isProfileComplete,
  profile,
  matchmaking,
}: Props) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  // W-KC.3: Tampilkan animasi pemrosesan kecocokan sebentar sebelum hasil W-KC.4
  useEffect(() => {
    if (isProfileComplete) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsProcessing(false);
    }
  }, [isProfileComplete]);

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-slate-800 pb-16 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#5170FF] transition">
            <span>&lt;</span>
            <span>Kembali ke Dasbor</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Penerbit: <strong>{user.nama}</strong>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* LAYAR W-KC.1: Profil Belum Lengkap */}
        {!isProfileComplete && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto text-2xl font-black">
              !
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Profil Bisnis Belum Lengkap
              </h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Lengkapi profil usaha Anda dulu agar SCOUT dapat mencocokkannya dengan kriteria seleksi penyelenggara SCF secara akurat.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-[#5170FF] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
              >
                Lengkapi Profil Bisnis →
              </Link>
            </div>
          </div>
        )}

        {/* LAYAR W-KC.3: Memproses Kecocokan */}
        {isProfileComplete && isProcessing && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-sm text-center space-y-6 my-8">
            <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-[#5170FF] animate-spin mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">
                Mencocokkan profil Anda dengan data penyelenggara...
              </h2>
              <p className="text-xs text-slate-500">
                Mohon tunggu sebentar, sistem sedang memvalidasi sektor, badan hukum, dan kebutuhan dana.
              </p>
            </div>
            <div className="w-48 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-[#5170FF] rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* LAYAR W-KC.4: Daftar Penyelenggara Paling Cocok */}
        {isProfileComplete && !isProcessing && (
          <div className="space-y-6">
            
            {/* Banner Indikatif (BR-01, BR-02, US-18) */}
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-4 sm:p-5 text-indigo-950 shadow-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs text-indigo-900">
                <span className="text-base">ⓘ</span>
                <span>Hasil Bersifat Indikatif</span>
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                Hasil pencocokan ini bukan merupakan jaminan penerimaan pengajuan penerbitan efek dan bukan merupakan saran atau rekomendasi investasi. Keputusan akhir tetap berada pada komite kurasi masing-masing platform SCF.
              </p>
              <div className="pt-1">
                <Link href="/terms" className="text-xs font-bold text-[#5170FF] hover:underline">
                  [Baca batas layanan SCOUT]
                </Link>
              </div>
            </div>

            {/* Profil Info & Tombol Ubah */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <span className="text-xs text-slate-500">Profil Usaha: </span>
                <strong className="text-xs text-slate-900">{profile?.nama_bisnis || "Usaha Anda"}</strong>
                <span className="text-xs text-slate-400 ml-2 font-mono">({profile?.sektor})</span>
              </div>
              <Link
                href="/profile"
                className="text-xs font-bold text-[#5170FF] hover:underline"
              >
                [Ubah profil]
              </Link>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
              <span>Urut dari yang paling cocok</span>
              <span>Total: {matchmaking.length} Penyelenggara</span>
            </div>

            {/* Daftar Kartu Penyelenggara SCF */}
            <div className="space-y-4">
              {matchmaking.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-6 border shadow-xs transition hover:shadow-md ${
                    item.isPalingCocok
                      ? "border-[#5170FF] ring-2 ring-blue-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* Header Kartu */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-slate-400">
                        {item.peringkat}.
                      </span>
                      <Link
                        href={`/platforms/${item.id}`}
                        className="text-lg font-black text-slate-900 tracking-tight hover:text-[#5170FF] transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{item.nama}</span>
                        <span className="text-xs font-normal text-[#5170FF]">›</span>
                      </Link>
                    </div>

                    {item.isPalingCocok && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#5170FF] text-white shadow-xs">
                        PALING COCOK
                      </span>
                    )}
                  </div>

                  {/* Bar Kompatibilitas */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Kompatibilitas</span>
                      <span className="font-bold text-slate-900">{item.persentaseKecocokan}% ({item.tingkatKompatibilitas})</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.persentaseKecocokan >= 80
                            ? "bg-emerald-500"
                            : item.persentaseKecocokan >= 60
                            ? "bg-indigo-500"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${item.persentaseKecocokan}%` }}
                      />
                    </div>
                  </div>

                  {/* Estimasi Biaya */}
                  <div className="mt-4 flex items-center justify-between text-xs py-2 px-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500">Estimasi biaya penerbit:</span>
                    <span className="font-bold text-slate-800">{item.estimasiBiayaTeks}</span>
                  </div>

                  {/* Alasan Singkat Transparan (BR-06) */}
                  <div className="mt-3.5 text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-3 rounded-xl border border-blue-100/60">
                    <strong className="text-slate-800 font-semibold">Alasan: </strong>
                    {item.alasanSingkat}
                  </div>

                  {/* Keunggulan Platform */}
                  {item.detailPlatform.keunggulan && (
                    <div className="mt-2 text-[11px] text-slate-500 italic">
                      💡 {item.detailPlatform.keunggulan}
                    </div>
                  )}

                  {/* Tombol Buka Detail (US-35 AC1) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <Link
                      href={`/platforms/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5170FF] hover:text-blue-700 transition"
                    >
                      <span>Lihat Persyaratan & Detail</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Aksi Bawah: W-KC.4 */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/profile"
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold text-center uppercase tracking-wider transition shadow-sm"
              >
                Ubah Profil Usaha
              </Link>
              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold text-center uppercase tracking-wider transition"
              >
                Kembali ke Dasbor
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
