import React from "react";
import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "@/modules/auth/utils/session";
import { getPlatformDetailAction, PlatformDetailView } from "@/modules/auth";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Detail Penyelenggara SCF - SCOUT`,
    description: `Persyaratan, profil kurasi, dan estimasi biaya penerbitan efek SCF.`,
  };
}

export default async function PlatformDetailPage({ params }: Props) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const data = await getPlatformDetailAction(id);
  if (!data || !data.platform) {
    notFound();
  }

  return (
    <PlatformDetailView
      platform={data.platform}
      isPremium={data.isPremium}
      isCurrentlySelected={data.isCurrentlySelected}
      user={user}
    />
  );
}
