import React from "react";
import { AuthLayout, TermsContent } from "@/modules/auth";

export const metadata = {
  title: "Syarat dan Ketentuan & Batas Layanan - SCOUT",
  description: "Aturan pemakaian platform SCOUT dan pernyataan batas layanan penjaminan serta regulasi SCF.",
};

export default function TermsPage() {
  return (
    <AuthLayout>
      <TermsContent />
    </AuthLayout>
  );
}
