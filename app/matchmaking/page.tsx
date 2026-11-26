import React from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/modules/auth/utils/session";
import { getMyMatchmakingAction, MatchmakingView } from "@/modules/auth";

export const metadata = {
  title: "Kecocokan Penyelenggara SCF - SCOUT",
  description: "Daftar penyelenggara Securities Crowdfunding yang paling cocok dengan profil usaha Anda.",
};

export default async function MatchmakingPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const result = await getMyMatchmakingAction();
  if (!result) {
    redirect("/login");
  }

  return (
    <MatchmakingView
      user={user}
      isProfileComplete={result.isProfileComplete}
      profile={result.profile}
      matchmaking={result.matchmaking}
    />
  );
}
