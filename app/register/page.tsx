import React from "react";
import { RegisterForm, AuthLayout } from "@/modules/auth";

export const metadata = {
  title: "Daftar Akun Baru - SCOUT",
  description: "Buat akun baru SCOUT untuk memulai persiapan penerbitan efek melalui Securities Crowdfunding.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
