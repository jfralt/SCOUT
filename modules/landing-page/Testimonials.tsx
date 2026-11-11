import React from "react";

const TESTIMONIALS = [
  {
    name: "Rian Pratama",
    role: "Karyawan Swasta • Jakarta",
    quote: "Aplikasi ini membuka mata saya! Awalnya bingung mau beli rumah harus mulai dari mana. Dengan simulasi ini saya tahu persis harus sisihkan Rp 3,2 juta per bulan ke reksadana.",
    avatar: "RP",
    target: "DP Rumah 120 Juta (Tercapai)",
    rating: 5,
  },
  {
    name: "Siti Rahmawati",
    role: "Freelance Designer • Bandung",
    quote: "Sebagai freelancer yang gajinya naik turun, kalkulator ini sangat membantu bikin skenario tabungan dana darurat 6 bulan pengeluaran. UI warna hitam kuningnya juga elegan banget!",
    avatar: "SR",
    target: "Dana Darurat 45 Juta",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Pemilik Kedai Kopi • Surabaya",
    quote: "Sangat praktis dan tanpa iklan mengganggu. Langsung tahu berapa modal ekspansi yang terkumpul berkat simulasi bunga majemuk. Wajib dicoba bagi yang mau menabung terencana.",
    avatar: "BS",
    target: "Modal Cabang Baru 80 Juta",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white relative">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-3">
            Kisah Sukses
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Dipercaya Lebih Dari <span className="text-yellow-400">45.000 Perencana</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Lihat bagaimana simulasi terarah mengubah cara mereka mewujudkan impian finansial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 flex flex-col justify-between hover:border-yellow-400/40 transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-black text-black text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

