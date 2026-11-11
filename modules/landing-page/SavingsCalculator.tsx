"use client";

import React, { useState, useId } from "react";
import { formatRupiah } from "@/shared/utils/formatters";
import { PRESET_GOALS, calculateCompoundSavings } from "./utils/calculator";
import { PresetGoal } from "./types";

export default function SavingsCalculator() {
  const targetInputId = useId();
  const initialInputId = useId();
  const durationInputId = useId();
  const rateInputId = useId();

  const [activePreset, setActivePreset] = useState<string>("darurat");
  const [targetAmount, setTargetAmount] = useState<number>(30000000);
  const [initialSavings, setInitialSavings] = useState<number>(2500000);
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [annualRate, setAnnualRate] = useState<number>(5.0);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const handleSelectPreset = (preset: PresetGoal) => {
    setActivePreset(preset.id);
    setTargetAmount(preset.target);
    setDurationMonths(preset.months);
    setAnnualRate(preset.rate);
  };

  const results = calculateCompoundSavings({
    targetAmount,
    initialSavings,
    durationMonths,
    annualRate,
  });

  const handleCopySummary = () => {
    const text = `Rencana Tabungan SimpanKu:\nTarget: ${formatRupiah(targetAmount)}\nJangka Waktu: ${durationMonths} Bulan\nTabungan Bulanan: ${formatRupiah(results.monthlyDeposit)}\nTotal Disetor: ${formatRupiah(results.totalDeposited)}\nEstimasi Keuntungan: ${formatRupiah(results.interestEarned)}`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <section id="kalkulator" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white scroll-mt-16">
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
            Simulasi Real-Time
          </div>
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight text-white">
            Kalkulator <span className="text-yellow-400">Simulasi Tabungan</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Ketahui berapa yang perlu Anda sisihkan setiap bulan untuk mencapai target impian Anda secara realistis dan terukur.
          </p>
        </div>

        {/* Preset Goals Picker */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 text-center sm:text-left">
            Pilih Template Tujuan Tabungan:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PRESET_GOALS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-yellow-400 bg-yellow-400/15 text-white shadow-[0_0_20px_rgba(250,204,21,0.25)] scale-[1.02]"
                      : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="text-2xl mb-1.5">{preset.icon}</span>
                  <span className="text-xs font-bold leading-tight">{preset.name}</span>
                  <span className="text-[11px] text-yellow-400/90 mt-1">
                    {preset.target >= 1000000000 
                      ? `${(preset.target / 1000000000).toFixed(0)}M`
                      : `${(preset.target / 1000000).toFixed(0)} Juta`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-black/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-black text-sm font-black">
                1
              </span>
              Atur Variabel Finansial Anda
            </h3>

            <div className="space-y-6">
              {/* Target Tabungan */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={targetInputId} className="text-sm font-semibold text-zinc-200">
                    Target Nominal yang Ingin Dicapai
                  </label>
                  <span className="text-base font-bold text-yellow-400">
                    {formatRupiah(targetAmount)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-semibold text-sm">
                    Rp
                  </span>
                  <input
                    id={targetInputId}
                    type="number"
                    min="1000000"
                    step="500000"
                    value={targetAmount}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setTargetAmount(Number(e.target.value) || 0);
                    }}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/90 py-3.5 pl-12 pr-4 text-white font-semibold text-base focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all"
                    placeholder="Contoh: 50.000.000"
                  />
                </div>
                {/* Quick Add Buttons */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {[5000000, 10000000, 25000000, 50000000, 100000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setActivePreset("custom");
                        setTargetAmount((prev) => prev + amt);
                      }}
                      className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:border-yellow-500/40 hover:text-yellow-400 transition-colors"
                    >
                      +{amt >= 1000000 ? `${amt / 1000000} Jt` : amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset("custom");
                      setTargetAmount(10000000);
                    }}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Saldo Awal Saat Ini */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={initialInputId} className="text-sm font-semibold text-zinc-200">
                    Saldo Awal yang Sudah Dimiliki
                  </label>
                  <span className="text-sm font-medium text-zinc-400">
                    {formatRupiah(initialSavings)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-semibold text-sm">
                    Rp
                  </span>
                  <input
                    id={initialInputId}
                    type="number"
                    min="0"
                    step="500000"
                    value={initialSavings}
                    onChange={(e) => {
                      setActivePreset("custom");
                      setInitialSavings(Number(e.target.value) || 0);
                    }}
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/90 py-3.5 pl-12 pr-4 text-white font-semibold text-base focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Jangka Waktu (Bulan) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={durationInputId} className="text-sm font-semibold text-zinc-200">
                    Jangka Waktu Menabung
                  </label>
                  <span className="text-base font-bold text-yellow-400 bg-yellow-400/10 px-3 py-0.5 rounded-full border border-yellow-400/20">
                    {durationMonths} Bulan ({ (durationMonths / 12).toFixed(1).replace(".0", "") } Tahun)
                  </span>
                </div>
                <input
                  id={durationInputId}
                  type="range"
                  min="1"
                  max="60"
                  value={durationMonths}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setDurationMonths(Number(e.target.value));
                  }}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1 Bulan</span>
                  <span>12 Bulan (1 Thn)</span>
                  <span>36 Bulan (3 Thn)</span>
                  <span>60 Bulan (5 Thn)</span>
                </div>
              </div>

              {/* Estimasi Bunga / Imbal Hasil Tahunan */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={rateInputId} className="text-sm font-semibold text-zinc-200">
                    Estimasi Imbal Hasil / Bunga Tahunan (% p.a.)
                  </label>
                  <span className="text-base font-bold text-yellow-400">
                    {annualRate}% p.a.
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { label: "0% Tunai", val: 0 },
                    { label: "4% Deposito", val: 4 },
                    { label: "6% Reksadana", val: 6 },
                    { label: "9% Investasi", val: 9 },
                  ].map((option) => (
                    <button
                      key={option.val}
                      type="button"
                      onClick={() => {
                        setActivePreset("custom");
                        setAnnualRate(option.val);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        annualRate === option.val
                          ? "border-yellow-400 bg-yellow-400 text-black font-bold shadow-md"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <input
                  id={rateInputId}
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setAnnualRate(Number(e.target.value));
                  }}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Main Result Card */}
            <div className="rounded-3xl border-2 border-yellow-400 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 p-6 sm:p-8 shadow-[0_0_40px_rgba(250,204,21,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-bold text-yellow-300 border border-yellow-400/40">
                  ⚡ Estimasi Rekomendasi
                </span>
                <span className="text-xs text-zinc-400">
                  Target: {durationMonths} Bulan
                </span>
              </div>

              <p className="text-sm text-zinc-400 font-medium">
                Jumlah yang Harus Ditabung:
              </p>
              
              <div className="my-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-yellow-400 drop-shadow-[0_2px_15px_rgba(250,204,21,0.3)]">
                  {formatRupiah(results.monthlyDeposit)}
                </div>
                <p className="text-xs text-yellow-500 font-semibold mt-1">
                  per bulan (sekitar {formatRupiah(Math.ceil(results.monthlyDeposit / 30))} / hari)
                </p>
              </div>

              {/* Progress Breakdown Bar */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Komposisi Pencapaian</span>
                  <span className="font-semibold text-white">100% Target</span>
                </div>
                <div className="h-3.5 w-full bg-zinc-800 rounded-full overflow-hidden flex p-0.5 border border-zinc-700">
                  <div
                    style={{ width: `${results.percentageDeposit}%` }}
                    className="h-full bg-zinc-200 rounded-l-full transition-all duration-500"
                    title={`Setoran Anda: ${results.percentageDeposit}%`}
                  />
                  <div
                    style={{ width: `${results.percentageInterest}%` }}
                    className="h-full bg-yellow-400 rounded-r-full transition-all duration-500 shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                    title={`Hasil Imbal Hasil: ${results.percentageInterest}%`}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] mt-2">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-zinc-200" />
                    <span>Setoran Mandiri ({results.percentageDeposit}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-yellow-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span>Hasil Bunga ({results.percentageInterest}%)</span>
                  </div>
                </div>
              </div>

              {/* Detail Breakdown list */}
              <div className="mt-6 space-y-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Total Setoran Mandiri:</span>
                  <span className="font-semibold text-white">{formatRupiah(results.totalDeposited)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Estimasi Imbal Hasil (Bunga):</span>
                  <span className="font-semibold text-yellow-400">+{formatRupiah(results.interestEarned)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-zinc-800">
                  <span className="font-bold text-white">Total Dana Terkumpul:</span>
                  <span className="font-bold text-yellow-400">{formatRupiah(results.totalFutureValue)}</span>
                </div>
              </div>

              {/* Actions inside card */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 rounded-2xl bg-yellow-400 py-3.5 px-4 text-center text-sm font-extrabold text-black hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copiedToast ? "Tersalin ke Clipboard!" : "Salin Ringkasan"}
                </button>
                <a
                  href="#cta-section"
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 py-3.5 px-4 text-center text-sm font-semibold text-zinc-300 hover:border-yellow-400 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  Mulai Menabung
                </a>
              </div>
            </div>

            {/* Quick tips callout */}
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-400/5 p-4 flex items-start gap-3 text-xs text-zinc-300">
              <span className="text-yellow-400 text-lg">💡</span>
              <p>
                <strong className="text-yellow-400">Tips Finansial:</strong> Gunakan metode sistematis <em>Auto-Debet</em> pada tanggal gajian agar disiplin menabung berjalan konsisten tanpa tergoda pengeluaran impulsif.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

