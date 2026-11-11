import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { LandingPage } from "@/modules/landing-page";

/**
 * Rute Halaman Utama (Tipis)
 * Semua logika fitur berada di modules/landing-page
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-yellow-400 selection:text-black font-sans">
      <Navbar />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
