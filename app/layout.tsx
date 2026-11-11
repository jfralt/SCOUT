import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCOUT - Platform Pendamping Pendanaan UKM via SCF",
  description: "SCOUT mendampingi UKM mempersiapkan penggalangan dana melalui Securities Crowdfunding (SCF) sesuai regulasi OJK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-[#5170FF] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
