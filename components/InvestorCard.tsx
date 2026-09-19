"use client";

import { ChevronLeft } from "lucide-react";
import { fundData } from "@/data/investors";
import {
  formatCurrency,
  formatPercent,
  formatSignedCurrency,
} from "@/lib/format";
import type { InvestorMetrics } from "@/lib/calculations";

type InvestorCardProps = {
  row: InvestorMetrics;
  onSelect: (row: InvestorMetrics) => void;
};

type MetricProps = {
  label: string;
  value: string;
  valueClass?: string;
};

function Metric({ label, value, valueClass }: MetricProps) {
  return (
    <div className="rounded-xl border border-white/[0.04] bg-ink-950/50 px-3 py-2.5">
      <div className="text-[10px] font-medium tracking-wide text-white/35">
        {label}
      </div>
      <div
        className={["num mt-1 text-sm font-semibold text-white", valueClass]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </div>
    </div>
  );
}

export default function InvestorCard({ row, onSelect }: InvestorCardProps) {
  const profitClass =
    row.returnAmount > 0
      ? "text-accent-soft"
      : row.returnAmount < 0
      ? "text-red-400"
      : "text-white/45";

  return (
    <button
      type="button"
      onClick={function () {
        onSelect(row);
      }}
      className="group w-full rounded-2xl border border-white/5 bg-ink-900/60 p-4 text-right shadow-soft transition-all hover:border-white/10 hover:bg-ink-850/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:p-5"
      aria-label={"عرض تفاصيل " + row.investor.name}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="num grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/5 bg-ink-800 text-[11px] font-semibold text-white/60">
            {row.investor.code}
          </div>
          <div className="min-w-0">
            <div className="truncate text-[15px] font-semibold text-white">
              {row.investor.name}
            </div>
            <div className="num mt-0.5 text-[11px] text-white/40">
              {formatPercent(row.share)} مشاركة
            </div>
          </div>
        </div>

        <ChevronLeft
          className="h-4 w-4 shrink-0 text-white/20 transition-all group-hover:-translate-x-0.5 group-hover:text-white/60"
          strokeWidth={2}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <Metric
          label="المساهمة"
          value={formatCurrency(row.investment, fundData.currency)}
        />
        <Metric label="العائد" value={formatPercent(row.returnPercent)} />
        <Metric
          label="الربح"
          value={formatSignedCurrency(row.returnAmount, fundData.currency)}
          valueClass={profitClass}
        />
        <Metric
          label="القيمة الحالية"
          value={formatCurrency(row.currentValue, fundData.currency)}
        />
      </div>
    </button>
  );
}
