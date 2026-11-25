import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/modules/auth/utils/session";
import { AuthLayout, BusinessProfileWizard, getMyBusinessProfileAction } from "@/modules/auth";

export const metadata = {
  title: "Profil Bisnis & Target Pendanaan - SCOUT",
  description: "Lengkapi profil badan hukum, sektor industri, dan target kebutuhan dana UKM Anda.",
};

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const initialProfile = await getMyBusinessProfileAction();

  return (
    <AuthLayout>
      <BusinessProfileWizard initialData={initialProfile} />
    </AuthLayout>
  );
}
