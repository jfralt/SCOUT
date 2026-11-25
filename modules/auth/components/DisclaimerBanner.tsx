import React from "react";
import Link from "next/link";

interface DisclaimerBannerProps {
  className?: string;
  showLink?: boolean;
}

export default function DisclaimerBanner({ className = "", showLink = true }: DisclaimerBannerProps) {
  return (
    <div
      className={`rounded-2xl border-2 border-amber-300 bg-amber-50/70 p-5 sm:p-6 text-slate-800 shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="space-y-2 text-xs sm:text-sm">
          <h4 className="font-bold text-amber-950 uppercase tracking-wider text-xs">
            (!) Batas Layanan SCOUT (Pernyataan Penting)
          </h4>
          <ul className="space-y-1.5 text-slate-700 leading-relaxed list-disc list-inside">
            <li>
              <strong>Bukan Jaminan:</strong> Hasil diagnosa dan penilaian SCOUT bersifat indikatif dan bukan jaminan bahwa usaha Anda akan disetujui atau diterima oleh platform penyelenggara SCF.
            </li>
            <li>
              <strong>Bukan Skor Investasi:</strong> Skor Kesiapan SCF (<em>SCF Readiness Score</em>) adalah panduan kelengkapan berkas, bukan penilaian kelayakan instrumen efek untuk investor.
            </li>
            <li>
              <strong>Bukan Penyelenggara:</strong> SCOUT beroperasi sebagai mitra pendamping persiapan pra-kurasi, bukan penyelenggara SCF berizin OJK. Pengajuan resmi penerbitan efek dilakukan di platform mitra penyelenggara resmi.
            </li>
          </ul>
          {showLink && (
            <div className="pt-2">
              <Link
                href="/terms"
                className="text-xs font-semibold text-[#5170FF] hover:underline inline-flex items-center gap-1"
              >
                <span>Baca Syarat & Ketentuan Selengkapnya</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
