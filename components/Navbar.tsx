import Logo from "./Logo";
import { fundData } from "@/data/investors";
import { formatCurrency } from "@/lib/format";
import type { FundMetrics } from "@/lib/calculations";

type NavbarProps = {
  fund: FundMetrics;
};

export default function Navbar({ fund }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-accent">
            <Logo size={30} />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-white">
              {fundData.name}
            </div>
            <div className="text-[11px] font-medium tracking-wide text-white/35">
              {fundData.nameEn}
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm text-white/55 sm:flex">
          <a href="#summary" className="transition-colors hover:text-white">
            نظرة عامة
          </a>
          <a href="#participants" className="transition-colors hover:text-white">
            المشاركون
          </a>
        </nav>

        <div className="text-left">
          <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
            القيمة الحالية
          </div>
          <div className="num mt-0.5 text-sm font-semibold text-white">
            {formatCurrency(fund.currentValue, fundData.currency)}
          </div>
        </div>
      </div>
    </header>
  );
}
