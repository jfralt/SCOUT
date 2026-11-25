import React from "react";
import { LoginForm, AuthLayout } from "@/modules/auth";

export const metadata = {
  title: "Masuk ke Akun - SCOUT",
  description: "Masuk ke akun SCOUT Anda untuk mengelola dokumen legalitas dan memantau skor kesiapan SCF.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
