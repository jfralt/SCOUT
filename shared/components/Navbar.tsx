"use client";

import React, { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/modules/auth/actions";

interface NavbarProps {
  user?: {
    id: string;
    nama?: string;
    name?: string;
    email: string;
    email_terverifikasi?: boolean;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo Resmi SCOUT */}
        <Link
          href="/"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt="SCOUT Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="hidden sm:inline-block border-l border-slate-200 pl-3 text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            SCF Accelerator
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => scrollToSection("fitur")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Pilar Fitur
          </button>
          <button
            onClick={() => scrollToSection("diagnosa")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Kalkulator Diagnosa
          </button>
          <button
            onClick={() => scrollToSection("dashboard")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Dasbor Demo
          </button>
          <button
            onClick={() => scrollToSection("cara-kerja")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Auth / Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-black max-w-[120px] truncate">{user.nama || user.name}</span>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition cursor-pointer"
                >
                  Keluar
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold text-slate-700 hover:text-[#5170FF] transition cursor-pointer"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5170FF] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#3d57e8] hover:scale-[1.02] cursor-pointer"
              >
                <span>Daftar</span>
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Buka Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4 space-y-3">
          <button
            onClick={() => scrollToSection("fitur")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-[#5170FF]"
          >
            Pilar Fitur
          </button>
          <button
            onClick={() => scrollToSection("diagnosa")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-[#5170FF]"
          >
            Kalkulator Diagnosa
          </button>
          <button
            onClick={() => scrollToSection("dashboard")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-[#5170FF]"
          >
            Dasbor Demo
          </button>
          <button
            onClick={() => scrollToSection("cara-kerja")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-[#5170FF]"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-[#5170FF]"
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <p className="text-xs text-slate-500 font-medium">Masuk sebagai: <strong>{user.nama || user.name}</strong></p>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-100 py-2.5 text-center text-xs font-bold text-slate-700 hover:text-rose-600"
                  >
                    Keluar
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-700"
                >
                  Masuk ke Akun
                </Link>
                <Link
                  href="/register"
                  className="w-full rounded-xl bg-[#5170FF] py-2.5 text-center text-xs font-bold text-white shadow-xs"
                >
                  Daftar Akun Baru
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
