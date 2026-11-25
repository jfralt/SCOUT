"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions";
import { AuthActionResult } from "../types";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    loginAction,
    null
  );

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success && state.data?.redirectTo) {
      router.push(state.data.redirectTo);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#0D2063] tracking-tight">
            Masuk ke Akun Anda
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Akses dasbor pelacakan berkas dan diagnosa kesiapan SCF Anda.
          </p>
        </div>

        {/* Global Error Banner (AC4: tidak membocorkan email / password) */}
        {state?.message && !state.success && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200/80 p-3.5 text-xs text-rose-600 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{state.message}</span>
          </div>
        )}

        {/* Form Login */}
        <form action={formAction} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                defaultValue=""
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-white transition-colors focus:outline-none ${
                  state?.errors?.email
                    ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                    : "border-slate-300 focus:border-[#5170FF]"
                }`}
              />
            </div>
            {state?.errors?.email && (
              <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan kata sandi"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm bg-white transition-colors focus:outline-none ${
                  state?.errors?.password
                    ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                    : "border-slate-300 focus:border-[#5170FF]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="mt-1.5 text-[11px] font-medium text-rose-500">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {/* Action Button: Masuk -> */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0D2063] hover:bg-[#081545] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer shadow-xs"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Link ke Registrasi */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-600">
              Belum punya akun?{" "}
              <Link href="/register" className="font-semibold text-slate-800 hover:text-[#5170FF] transition-colors">
                Daftar Akun Baru
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
