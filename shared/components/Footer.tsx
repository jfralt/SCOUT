import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 text-slate-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5170FF] text-white font-extrabold text-sm shadow-sm">
                S
              </div>
              <span className="text-xl font-black text-black tracking-tight">
                SCOUT
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-4">
              Platform pendamping UKM yang ingin melakukan penggalangan dana melalui Securities Crowdfunding (SCF) sesuai regulasi OJK (POJK No. 57/POJK.04/2020).
            </p>
            <div className="flex items-center gap-2 text-xs text-[#5170FF] font-medium">
              <span className="h-2 w-2 rounded-full bg-[#5170FF]" />
              Sesuai Regulasi OJK — POJK No. 57/POJK.04/2020
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#fitur" className="hover:text-[#5170FF] transition-colors">
                  Fitur SCOUT
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-[#5170FF] transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#estimasi" className="hover:text-[#5170FF] transition-colors">
                  Estimasi Kesiapan SCF
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-[#5170FF] transition-colors">
                  Testimoni UKM
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#5170FF] transition-colors">
                  FAQ & Tanya Jawab
                </a>
              </li>
            </ul>
          </div>

          {/* SCF Info */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
              Layanan SCF
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-[#5170FF] transition-colors cursor-default">
                Document Tracking
              </li>
              <li className="hover:text-[#5170FF] transition-colors cursor-default">
                Document Assessment
              </li>
              <li className="hover:text-[#5170FF] transition-colors cursor-default">
                Platform Matchmaking
              </li>
              <li className="hover:text-[#5170FF] transition-colors cursor-default">
                SCF Readiness Score
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} SCOUT. Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-slate-400">
            Platform Pendamping SCF • Berizin & Diawasi OJK
          </p>
        </div>
      </div>
    </footer>
  );
}
