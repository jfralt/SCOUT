import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col justify-between selection:bg-[#5170FF]/20 selection:text-[#5170FF]">
      {/* Top Header */}
      <header className="w-full px-6 py-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="SCOUT Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#5170FF] transition-colors"
        >
          <svg
            className="w-4 h-4 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 mt-8">
        <div>© 2026 SCOUT. Hak cipta dilindungi.</div>
        <div className="flex items-center gap-4 text-slate-500">
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            Kebijakan Privacy
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/terms" className="hover:text-slate-800 transition-colors">
            Syarat & Ketentuan
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/help" className="hover:text-slate-800 transition-colors">
            Pusat Bantuan
          </Link>
        </div>
      </footer>
    </div>
  );
}
