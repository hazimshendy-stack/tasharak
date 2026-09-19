import { fundData, investors } from "@/data/investors";
import type { Investor } from "@/data/investors";

export type InvestorMetrics = {
  investor: Investor;
  /** نسبة المشاركة % — محسوبة تلقائيًا */
  share: number;
  /** قيمة المساهمة */
  investment: number;
  /** نسبة العائد % */
  returnPercent: number;
  /** قيمة الربح */
  returnAmount: number;
  /** القيمة الحالية = المساهمة + الربح */
  currentValue: number;
};

export type FundMetrics = {
  totalCapital: number;
  totalReturn: number;
  totalProfit: number;
  currentValue: number;
  participantsCount: number;
};

/** يحسب إجماليات الصندوق من بيانات المشاركين + نسبة العائد. */
export function computeFundMetrics(): FundMetrics {
  const totalCapital = investors.reduce(function (sum, inv) {
    return sum + inv.investment;
  }, 0);

  const totalReturn = fundData.totalReturn;
  const totalProfit = totalCapital * (totalReturn / 100);
  const currentValue = totalCapital + totalProfit;

  return {
    totalCapital: totalCapital,
    totalReturn: totalReturn,
    totalProfit: totalProfit,
    currentValue: currentValue,
    participantsCount: investors.length,
  };
}

/** يحسب نصيب كل مشارك انطلاقًا من إجماليات الصندوق. */
export function computeInvestorMetrics(fund: FundMetrics): InvestorMetrics[] {
  return investors.map(function (inv) {
    const share =
      fund.totalCapital > 0 ? (inv.investment / fund.totalCapital) * 100 : 0;

    const returnPercent = fund.totalReturn;
    const returnAmount = inv.investment * (returnPercent / 100);
    const currentValue = inv.investment + returnAmount;

    return {
      investor: inv,
      share: share,
      investment: inv.investment,
      returnPercent: returnPercent,
      returnAmount: returnAmount,
      currentValue: currentValue,
    };
  });
}
