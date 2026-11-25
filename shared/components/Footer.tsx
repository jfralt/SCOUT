import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 text-slate-500 py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="SCOUT Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed mb-4 font-normal">
              Platform pendamping UKM untuk persiapan penggalangan dana publik melalui skema Securities Crowdfunding (SCF) sesuai POJK No. 57/POJK.04/2020.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#5170FF] font-semibold bg-blue-50/70 border border-[#5170FF]/20 px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5170FF]" />
              Sesuai Regulasi OJK POJK No. 57/POJK.04/2020
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
              Solusi Produk
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#fitur" className="hover:text-[#5170FF] transition-colors">
                  Document Tracking
                </a>
              </li>
              <li>
                <a href="#diagnosa" className="hover:text-[#5170FF] transition-colors">
                  Document Assessment
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-[#5170FF] transition-colors">
                  Platform Matchmaking
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-[#5170FF] transition-colors">
                  Dasbor Kerja UKM
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-[#5170FF] transition-colors">
                  Alur Persiapan 3 Langkah
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi Regulasi & Pasar */}
          <div>
            <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
              Informasi SCF
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li>Maksimal Emisi Rp 10 Miliar</li>
              <li>Instrumen Saham Ekuitas (PT)</li>
              <li>Instrumen Sukuk / Efek Utang</li>
              <li>
                <a href="#faq" className="hover:text-[#5170FF] transition-colors">
                  Pusat Edukasi & FAQ
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Disclaimer */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} SCOUT. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/terms" className="hover:text-[#5170FF] transition-colors">
              Syarat & Ketentuan
            </a>
            <span>•</span>
            <span className="text-slate-500 text-center sm:text-right">
              SCOUT adalah platform pendamping pra-kurasi, bukan penyelenggara SCF.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
