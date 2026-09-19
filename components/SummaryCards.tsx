import { Wallet, TrendingUp, Coins, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fundData } from "@/data/investors";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { FundMetrics } from "@/lib/calculations";

type SummaryCardsProps = {
  fund: FundMetrics;
};

type CardItem = {
  label: string;
  hint: string;
  value: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export default function SummaryCards({ fund }: SummaryCardsProps) {
  const items: CardItem[] = [
    {
      label: "إجمالي رأس المال",
      hint: "Capital",
      value: formatCurrency(fund.totalCapital, fundData.currency),
      icon: Wallet,
    },
    {
      label: "إجمالي العائد",
      hint: "Return",
      value: formatPercent(fund.totalReturn),
      icon: TrendingUp,
      highlight: fund.totalReturn > 0,
    },
    {
      label: "القيمة الحالية",
      hint: "Current Value",
      value: formatCurrency(fund.currentValue, fundData.currency),
      icon: Coins,
    },
    {
      label: "عدد المشاركين",
      hint: "Participants",
      value: String(fund.participantsCount),
      icon: Users,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map(function (item) {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group rounded-2xl border border-white/5 bg-ink-900/60 p-4 shadow-soft transition-colors hover:border-white/10 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-wide text-white/45">
                  {item.label}
                </span>
                <Icon
                  className={
                    item.highlight
                      ? "h-4 w-4 text-accent-soft"
                      : "h-4 w-4 text-white/25"
                  }
                  strokeWidth={1.8}
                />
              </div>

              <div className="num mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {item.value}
              </div>

              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
                {item.hint}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
