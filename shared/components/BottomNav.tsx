"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface BottomNavProps {
  user?: {
    id: string;
    nama?: string;
    email: string;
    tingkat_layanan?: string;
  } | null;
}

export default function BottomNav({ user }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // N3: Jika mengetuk menu yang sedang aktif, gulir kembali ke atas tanpa memuat ulang
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Menu Publik (Belum Login) sesuai Wireframe US-15 N1
  const publicMenuItems = [
    {
      id: "beranda",
      label: "Beranda",
      href: "/",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "platform",
      label: "Platform",
      href: "/#features",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "edukasi",
      label: "Edukasi",
      href: "/#how-it-works",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: "masuk",
      label: "Masuk",
      href: "/login",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      ),
    },
  ];

  // Menu Lengkap (Sudah Login) sesuai Wireframe US-15 N2 / AC1: Dashboard, Dokumen, Kecocokan, Akun
  const authMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "dokumen",
      label: "Dokumen",
      href: "/dashboard#documents",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "kecocokan",
      label: "Kecocokan",
      href: "/matchmaking",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      id: "akun",
      label: "Profil & Akun",
      href: "/profile",
      icon: (active: boolean) => (
        <svg className={`w-5 h-5 ${active ? "text-[#5170FF]" : "text-slate-400"}`} fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const menuItems = user ? authMenuItems : publicMenuItems;

  return (
    <nav
      aria-label="Navigasi Menu Ponsel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg safe-bottom"
    >
      <div className="grid grid-cols-4 h-15 max-w-md mx-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href.split("#")[0];
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleMenuClick(e, item.href)}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors relative cursor-pointer ${
                isActive ? "text-[#5170FF]" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.icon(isActive)}
              <span className={`text-[10px] mt-1 tracking-tight font-medium ${isActive ? "font-bold text-[#5170FF]" : "text-slate-500"}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-[#5170FF] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
