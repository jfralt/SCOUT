"use client";

import React, { useActionState, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpAction, resendOtpAction } from "../actions";
import { AuthActionResult } from "../types";

export default function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    verifyOtpAction,
    null
  );

  const [isResending, startResendTransition] = useTransition();
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (state?.success && state.data?.redirectTo) {
      router.push(state.data.redirectTo);
    }
    if (state?.data?.otpDebug) {
      setDevOtp(state.data.otpDebug);
    }
  }, [state, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    if (countdown > 0 || !emailParam) return;
    startResendTransition(async () => {
      const result = await resendOtpAction(emailParam);
      if (result.success) {
        setResendMessage("Kode OTP baru berhasil dikirim!");
        setCountdown(60); // 60 detik countdown
        if (result.data?.otpDebug) {
          setDevOtp(result.data.otpDebug);
        }
      } else {
        setResendMessage(result.message || "Gagal mengirim ulang kode OTP.");
      }
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
        
        {/* Step Indicator (1 - 2 - 3) */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Step 1: Completed */}
            <div className="w-8 h-8 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div className="w-12 sm:w-20 h-[1.5px] bg-emerald-400" />
            
            {/* Step 2: Active */}
            <div className="w-8 h-8 rounded-full bg-[#0D2063] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </div>
            <div className="w-12 sm:w-20 h-[1.5px] bg-slate-200" />

            {/* Step 3: Pending */}
            <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-xs font-semibold bg-white">
              3
            </div>
          </div>
        </div>

        {/* Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#0D2063] tracking-tight">
            Verifikasi Alamat Email
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Masukkan 6 digit kode OTP yang kami kirimkan ke:
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
            {emailParam || "email Anda"}
          </p>
        </div>

        {/* Development Helper Badge */}
        {devOtp && (
          <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Simulasi Dev OTP:</span>
            </div>
            <span className="font-mono font-bold text-sm bg-white px-2.5 py-0.5 rounded-lg border border-amber-300">
              {devOtp}
            </span>
          </div>
        )}

        {/* Feedback Alert */}
        {resendMessage && (
          <div className="mb-6 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700 font-medium">
            {resendMessage}
          </div>
        )}

        {/* Error Alert */}
        {state?.message && !state.success && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-600 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{state.message}</span>
          </div>
        )}

        {/* Form Verifikasi OTP */}
        <form action={formAction} className="space-y-6" noValidate>
          <input type="hidden" name="email" value={emailParam} />

          <div>
            <label className="block text-xs font-semibold text-slate-700 text-center mb-2.5">
              Kode Verifikasi (6 Digit)
            </label>
            <input
              type="text"
              name="kode"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="000000"
              className={`w-full py-3.5 px-4 text-center text-2xl font-mono tracking-[0.5em] rounded-xl border bg-white focus:outline-none transition-colors ${
                state?.errors?.kode
                  ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                  : "border-slate-300 focus:border-[#5170FF]"
              }`}
            />
            {state?.errors?.kode && (
              <p className="mt-2 text-center text-[11px] font-medium text-rose-500">
                {state.errors.kode[0]}
              </p>
            )}
          </div>

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
                <span>Memverifikasi Kode...</span>
              </>
            ) : (
              <>
                <span>Verifikasi Kode</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Resend OTP Action */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 mb-2">Belum menerima kode?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
            className="text-xs font-semibold text-[#5170FF] hover:text-blue-700 disabled:text-slate-400 transition-colors cursor-pointer"
          >
            {isResending
              ? "Mengirim ulang kode..."
              : countdown > 0
              ? `Kirim Ulang Kode (${countdown}s)`
              : "Kirim Ulang Kode"}
          </button>
        </div>

        {/* Back Link */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <Link href="/register" className="text-xs text-slate-500 hover:text-slate-800 transition-colors">
            ← Kembali ke Pendaftaran
          </Link>
        </div>

      </div>
    </div>
  );
}
