import { redirect } from "next/navigation";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { LandingPage, getCurrentUser } from "@/modules/auth";

/**
 * Rute Halaman Utama (Thin Route)
 * Sesuai US-14 AC3: Jika pengguna sudah login, langsung diarahkan ke Dashboard.
 */
export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-black selection:bg-[#5170FF] selection:text-white font-sans antialiased">
      <Navbar user={null} />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
