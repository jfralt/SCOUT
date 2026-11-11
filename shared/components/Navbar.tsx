"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo slot — letakkan file logo di public/logo.svg atau public/logo.png */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5170FF] shadow-sm transition-transform group-hover:scale-105">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-black">
              SCOUT
            </span>
          </div>
          <span className="hidden sm:block text-[11px] text-slate-400 border-l border-slate-200 pl-3">
            Platform Pendamping SCF
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollToSection("fitur")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Fitur
          </button>
          <button
            onClick={() => scrollToSection("cara-kerja")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("estimasi")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Estimasi Kesiapan
          </button>
          <button
            onClick={() => scrollToSection("testimoni")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            Testimoni
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="hover:text-[#5170FF] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection("estimasi")}
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-xl bg-[#5170FF] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#3d57e8] hover:scale-105 cursor-pointer"
          >
            <span>Mulai Konsultasi</span>
            <svg
              className="h-4 w-4"
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
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-black"
            aria-label="Toggle Menu"
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
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#5170FF]"
          >
            Fitur
          </button>
          <button
            onClick={() => scrollToSection("cara-kerja")}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#5170FF]"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => scrollToSection("estimasi")}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#5170FF]"
          >
            Estimasi Kesiapan
          </button>
          <button
            onClick={() => scrollToSection("testimoni")}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#5170FF]"
          >
            Testimoni
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#5170FF]"
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection("estimasi")}
            className="w-full mt-2 rounded-xl bg-[#5170FF] py-3 text-center text-sm font-bold text-white shadow-sm"
          >
            Mulai Konsultasi
          </button>
        </div>
      )}
    </header>
  );
}
