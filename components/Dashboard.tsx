"use client";

import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import SummaryCards from "./SummaryCards";
import InvestorList from "./InvestorList";
import InvestorDetails from "./InvestorDetails";
import { fundData } from "@/data/investors";
import {
  computeFundMetrics,
  computeInvestorMetrics,
} from "@/lib/calculations";
import type { InvestorMetrics } from "@/lib/calculations";

export default function Dashboard() {
  const fund = useMemo(function () {
    return computeFundMetrics();
  }, []);

  const rows = useMemo(
    function () {
      return computeInvestorMetrics(fund);
    },
    [fund]
  );

  const [selected, setSelected] = useState<InvestorMetrics | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar fund={fund} />

      <main>
        <Hero />
        <SummaryCards fund={fund} />
        <InvestorList rows={rows} onSelect={setSelected} />
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-[11px] text-white/30 sm:flex-row sm:px-8">
          <span>{fundData.name} — صندوق استثماري خاص</span>
          <span className="num">
            {rows.length} مشارك · {fund.participantsCount} سجل
          </span>
        </div>
      </footer>

      <InvestorDetails
        row={selected}
        onClose={function () {
          setSelected(null);
        }}
      />
    </div>
  );
}
