import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/shared/components/BottomNav";
import { getSessionUser } from "@/modules/auth/utils/session";

export const metadata: Metadata = {
  title: "SCOUT - Platform Pendamping Pendanaan UKM via SCF",
  description: "SCOUT mendampingi UKM mempersiapkan penggalangan dana melalui Securities Crowdfunding (SCF) sesuai regulasi OJK.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-[#5170FF] selection:text-white font-sans">
        <div className="flex-1 pb-16 md:pb-0">
          {children}
        </div>
        <BottomNav user={user} />
      </body>
    </html>
  );
}
