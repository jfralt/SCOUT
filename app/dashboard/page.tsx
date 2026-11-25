import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/modules/auth/utils/session";
import { getMyBusinessProfileAction, DashboardView } from "@/modules/auth";

export const metadata = {
  title: "Dasbor UKM - SCOUT",
  description: "Dasbor penerbit UKM untuk melacak kesiapan berkas dan status profil pendanaan SCF.",
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const profile = await getMyBusinessProfileAction();

  return <DashboardView user={user} profile={profile} />;
}
