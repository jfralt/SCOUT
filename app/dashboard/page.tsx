import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/modules/auth/utils/session";
import { getMyDashboardDataAction, DashboardView } from "@/modules/auth";

export const metadata = {
  title: "Dasbor Penerbit UKM - SCOUT",
  description: "Dasbor penerbit UKM untuk melacak kesiapan berkas persyaratan dan status profil pendanaan SCF.",
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const dashboardData = await getMyDashboardDataAction();
  if (!dashboardData) {
    redirect("/login");
  }

  return (
    <DashboardView
      user={user}
      profile={dashboardData.profile}
      aggregatedDocs={dashboardData.aggregatedDocs}
      matchmaking={dashboardData.matchmaking}
      metrics={dashboardData.metrics}
      hasConsent={dashboardData.hasConsent}
    />
  );
}
