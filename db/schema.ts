/**
 * Database Schema Definitions (TypeScript / ORM Agnostic)
 * Dapat dipetakan ke Prisma, Drizzle, atau SQL raw
 */

export interface GoalCategory {
  id: string;
  name: string;
  icon: string;
  defaultTarget: number;
  defaultMonths: number;
  defaultAnnualRate: number;
  createdAt: Date;
}

export interface UserSavingsPlan {
  id: string;
  userId?: string | null;
  title: string;
  categoryId: string;
  targetAmount: number;
  initialAmount: number;
  durationMonths: number;
  annualInterestRate: number;
  calculatedMonthlyDeposit: number;
  estimatedInterestEarned: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SimulationLog {
  id: string;
  sessionId: string;
  targetAmount: number;
  durationMonths: number;
  calculatedMonthlyDeposit: number;
  timestamp: Date;
}

