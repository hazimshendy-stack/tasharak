"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { fundData } from "@/data/investors";
import {
  formatCurrency,
  formatPercent,
  formatSignedCurrency,
} from "@/lib/format";
import type { InvestorMetrics } from "@/lib/calculations";

type InvestorDetailsProps = {
  row: InvestorMetrics | null;
  onClose: () => void;
};

type DetailItem = {
  label: string;
  hint: string;
  value: string;
  valueClass?: string;
};

export default function InvestorDetails({ row, onClose }: InvestorDetailsProps) {
  useEffect(
    function () {
      if (!row) return;

      function onKey(event: KeyboardEvent) {
        if (event.key === "Escape") onClose();
      }

      document.addEventListener("keydown", onKey);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return function () {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = previousOverflow;
      };
    },
    [row, onClose]
  );

  if (!row) return null;

  const profitClass =
    row.returnAmount > 0
      ? "text-accent-soft"
      : row.returnAmount < 0
      ? "text-red-400"
      : "text-white/70";

  const items: DetailItem[] = [
    {
      label: "نسبة المشاركة",
      hint: "Participation",
      value: formatPercent(row.share),
    },
    {
      label: "قيمة المساهمة",
      hint: "Investment",
      value: formatCurrency(row.investment, fundData.currency),
    },
    {
      label: "نسبة العائد",
      hint: "Return",
      value: formatPercent(row.returnPercent),
    },
    {
      label: "الربح",
      hint: "Profit",
      value: formatSignedCurrency(row.returnAmount, fundData.currency),
      valueClass: profitClass,
    },
    {
      label: "القيمة الحالية",
      hint: "Current Value",
      value: formatCurrency(row.currentValue, fundData.currency),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={"تفاصيل " + row.investor.name}
    >
      <div
        className="animate-fade-in absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="animate-rise relative w-full max-w-md rounded-t-3xl border border-white/10 bg-ink-900 p-6 shadow-soft sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="num grid h-11 w-11 place-items-center rounded-xl border border-white/5 bg-ink-800 text-[12px] font-semibold text-white/60">
              {row.investor.code}
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-white">
                {row.investor.name}
              </div>
              <div className="num mt-0.5 text-[11px] text-white/40">
                {formatPercent(row.share)} مشاركة
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/5 text-white/45 transition-colors hover:border-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="my-6 h-px w-full bg-white/5" />

        <div className="flex flex-col gap-2.5">
          {items.map(function (item) {
            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.04] bg-ink-950/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-white/60">
                    {item.label}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
                    {item.hint}
                  </div>
                </div>
                <div
                  className={[
                    "num shrink-0 text-[15px] font-semibold text-white",
                    item.valueClass,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
