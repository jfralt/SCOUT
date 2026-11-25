import React, { Suspense } from "react";
import { OtpVerificationForm, AuthLayout } from "@/modules/auth";

export const metadata = {
  title: "Verifikasi Email OTP - SCOUT",
  description: "Masukkan 6 digit kode OTP untuk memverifikasi alamat email akun SCOUT Anda.",
};

export default function VerifyOtpPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="w-full max-w-lg mx-auto bg-white rounded-3xl p-12 text-center text-slate-500">
            <div className="animate-spin h-6 w-6 border-2 border-[#0D2063] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-sm">Memuat formulir verifikasi...</p>
          </div>
        }
      >
        <OtpVerificationForm />
      </Suspense>
    </AuthLayout>
  );
}
