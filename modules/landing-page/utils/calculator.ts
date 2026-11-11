import { PresetGoal, SavingsCalculationParams, SavingsCalculationResult } from "../types";

export const PRESET_GOALS: PresetGoal[] = [
  { id: "darurat", name: "Dana Darurat", icon: "🛡️", target: 30000000, months: 12, rate: 4.5 },
  { id: "rumah", name: "DP Rumah Impian", icon: "🏠", target: 120000000, months: 36, rate: 6.0 },
  { id: "kendaraan", name: "Beli Kendaraan", icon: "🚗", target: 45000000, months: 18, rate: 5.0 },
  { id: "liburan", name: "Liburan Impian", icon: "✈️", target: 20000000, months: 10, rate: 4.0 },
  { id: "nikah", name: "Biaya Menikah", icon: "💍", target: 75000000, months: 24, rate: 5.5 },
  { id: "usaha", name: "Modal Usaha", icon: "💼", target: 50000000, months: 20, rate: 7.0 },
];

/**
 * Menghitung kebutuhan tabungan per bulan dan bunga majemuk
 */
export function calculateCompoundSavings(params: SavingsCalculationParams): SavingsCalculationResult {
  const target = Math.max(0, params.targetAmount);
  const initial = Math.max(0, params.initialSavings);
  const months = Math.max(1, params.durationMonths);
  const monthlyRate = (params.annualRate / 100) / 12;

  if (initial >= target) {
    return {
      monthlyDeposit: 0,
      totalDeposited: initial,
      interestEarned: 0,
      totalFutureValue: initial,
      percentageDeposit: 100,
      percentageInterest: 0,
    };
  }

  if (monthlyRate === 0) {
    const remaining = target - initial;
    const monthly = Math.ceil(remaining / months);
    const totalDeposited = initial + (monthly * months);
    return {
      monthlyDeposit: monthly,
      totalDeposited: totalDeposited,
      interestEarned: 0,
      totalFutureValue: totalDeposited,
      percentageDeposit: 100,
      percentageInterest: 0,
    };
  }

  // FV of initial deposit
  const fvInitial = initial * Math.pow(1 + monthlyRate, months);
  const remainingTarget = target - fvInitial;

  let monthly = 0;
  if (remainingTarget > 0) {
    const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    monthly = Math.ceil(remainingTarget / factor);
  }

  const totalDeposited = initial + (monthly * months);
  const totalFutureValue = fvInitial + (monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
  const interestEarned = Math.max(0, Math.round(totalFutureValue - totalDeposited));

  const percentDeposit = Math.min(100, Math.round((totalDeposited / totalFutureValue) * 100));
  const percentInterest = 100 - percentDeposit;

  return {
    monthlyDeposit: monthly,
    totalDeposited: totalDeposited,
    interestEarned: interestEarned,
    totalFutureValue: Math.round(totalFutureValue),
    percentageDeposit: percentDeposit,
    percentageInterest: percentInterest,
  };
}

