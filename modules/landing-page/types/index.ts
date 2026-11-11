export interface PresetGoal {
  id: string;
  name: string;
  icon: string;
  target: number;
  months: number;
  rate: number;
}

export interface SavingsCalculationParams {
  targetAmount: number;
  initialSavings: number;
  durationMonths: number;
  annualRate: number;
}

export interface SavingsCalculationResult {
  monthlyDeposit: number;
  totalDeposited: number;
  interestEarned: number;
  totalFutureValue: number;
  percentageDeposit: number;
  percentageInterest: number;
}

