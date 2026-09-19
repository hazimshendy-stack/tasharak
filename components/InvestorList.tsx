"use client";

import InvestorCard from "./InvestorCard";
import type { InvestorMetrics } from "@/lib/calculations";

type InvestorListProps = {
  rows: InvestorMetrics[];
  onSelect: (row: InvestorMetrics) => void;
};

export default function InvestorList({ rows, onSelect }: InvestorListProps) {
  return (
    <section
      id="participants"
      className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            المشاركون
          </h2>
          <p className="mt-1 text-sm text-white/45">
            جميع المشاركين في الصندوق ونصيب كل واحد منهم.
          </p>
        </div>
        <div className="hidden text-[11px] text-white/30 sm:block">
          اضغط على أي مشارك لعرض التفاصيل
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-ink-900/50 p-12 text-center text-sm text-white/45">
          لا يوجد مشاركون بعد.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map(function (row) {
            return (
              <InvestorCard
                key={row.investor.id}
                row={row}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
