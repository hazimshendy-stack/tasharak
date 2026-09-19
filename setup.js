#!/usr/bin/env node
/* ============================================================================
 *  تشارك — Tasharak
 *  setup.js  —  ينشئ كل ملفات المشروع مرة واحدة.
 *  مُهيّأ للنشر على GitHub Pages فقط.
 *
 *  الاستخدام:
 *      node setup.js
 *      npm install
 *      npm run dev
 * ==========================================================================*/

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

/* ============================================================================
 *  ★★★  غيّر اسم المستودع هنا فقط  ★★★
 * ==========================================================================*/
const GITHUB_REPO = "tasharak";
/* ==========================================================================*/

const files = {};

/* ============================================================
 *  CONFIG
 * ============================================================ */

files["package.json"] = `
{
  "name": "tasharak",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.427.0",
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.4"
  }
}
`;

files["tsconfig.json"] = `
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

files["next.config.js"] =
  `
/** @type {import('next').NextConfig} */

// اسم مستودعك على GitHub (يجب أن يطابق اسم الـrepo بالضبط)
const repo = "` +
  GITHUB_REPO +
  `";

// في التطوير المحلي: بدون basePath — على GitHub Pages: مع basePath
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd && repo ? "/" + repo : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
`;

files["tailwind.config.ts"] = `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080a",
          900: "#0d0d10",
          850: "#131317",
          800: "#1a1a1f",
          700: "#26262c",
          600: "#3a3a42",
        },
        accent: {
          DEFAULT: "#10b981",
          soft: "#34d399",
          deep: "#059669",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "Inter", "system-ui", "sans-serif"],
        num: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -24px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
`;

files["postcss.config.js"] = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

files[".gitignore"] = `
node_modules/
.next/
out/
build/
dist/

.env
.env.local
.env*.local

.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*

.vercel
*.tsbuildinfo
next-env.d.ts
`;

/* ============================================================
 *  APP
 * ============================================================ */

files["app/globals.css"] = `
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html,
body {
  background-color: #08080a;
  color: #e8e8ec;
  min-height: 100%;
}

body {
  font-family: "IBM Plex Sans Arabic", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.num {
  font-family: "Inter", system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
  direction: ltr;
  unicode-bidi: isolate;
}

::selection {
  background: rgba(16, 185, 129, 0.25);
  color: #ffffff;
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1c1c22; border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: #2a2a32; }

@keyframes tasharak-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes tasharak-rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: tasharak-fade-in 0.18s ease-out both; }
.animate-rise    { animation: tasharak-rise 0.24s cubic-bezier(0.22, 1, 0.36, 1) both; }
`;

files["app/layout.tsx"] = `
import type { Metadata } from "next";
import "./globals.css";
import { fundData } from "@/data/investors";

export const metadata: Metadata = {
  title: fundData.name + " — " + fundData.nameEn,
  description: fundData.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-ink-950 text-white/90 antialiased">
        {children}
      </body>
    </html>
  );
}
`;

files["app/page.tsx"] = `
import Dashboard from "@/components/Dashboard";

export default function Page() {
  return <Dashboard />;
}
`;

/* ============================================================
 *  DATA — الملف الوحيد الذي تحتاج تعديله
 * ============================================================ */

files["data/investors.ts"] = `
/* ============================================================================
 *  تشارك — Tasharak
 *  ★ ملف البيانات الوحيد ★
 *  عدّل هنا فقط، لا تحتاج لمس أي ملف آخر.
 * ==========================================================================*/

// ================================
// EDIT FUND DATA HERE
// ================================
export type FundData = {
  /** الاسم بالعربية */
  name: string;
  /** الاسم بالإنجليزية */
  nameEn: string;
  /** الجملة التعريفية القصيرة */
  tagline: string;
  /** عملة العرض — EGP / SAR / AED ... */
  currency: string;
  /**
   * نسبة العائد الإجمالية للصندوق %.
   *  0    = لا يوجد ربح بعد
   *  12.5 = ربح 12.5%
   * -5    = خسارة 5%
   */
  totalReturn: number;
};

export const fundData: FundData = {
  name: "تشارك",
  nameEn: "Tasharak",
  tagline: "نشارك رأس المال، ونتابع النمو.",
  currency: "EGP",
  totalReturn: 0,
};

// ================================
// ADD / EDIT INVESTORS HERE
// ================================
export type Investor = {
  /** معرّف فريد لا يتكرر */
  id: string;
  /** كود المشارك — يظهر في الشارة */
  code: string;
  /** اسم المشارك */
  name: string;
  /** قيمة المساهمة بالعملة المحددة أعلاه */
  investment: number;
};

export const investors: Investor[] = [
  {
    id: "001",
    code: "001",
    name: "المشارك 001",
    investment: 125,
  },
  {
    id: "002",
    code: "002",
    name: "المشارك 002",
    investment: 100,
  },
];
`;

/* ============================================================
 *  LIB
 * ============================================================ */

files["lib/format.ts"] = `
/**
 * تنسيق الأرقام والعملات والنِسب.
 * كل الأرقام تُعرض بأرقام لاتينية وبفواصل آلاف لضمان الاتساق.
 */

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(value: number, currency: string): string {
  return formatNumber(value) + " " + currency;
}

export function formatPercent(value: number): string {
  return formatNumber(value) + "%";
}

export function formatSignedCurrency(value: number, currency: string): string {
  if (value > 0) return "+" + formatNumber(value) + " " + currency;
  if (value < 0) return "-" + formatNumber(Math.abs(value)) + " " + currency;
  return formatNumber(0) + " " + currency;
}

export function formatSignedPercent(value: number): string {
  if (value > 0) return "+" + formatNumber(value) + "%";
  if (value < 0) return "-" + formatNumber(Math.abs(value)) + "%";
  return "0%";
}
`;

files["lib/calculations.ts"] = `
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
`;

/* ============================================================
 *  COMPONENTS
 * ============================================================ */

files["components/Logo.tsx"] = `
type LogoProps = {
  size?: number;
  className?: string;
};

/**
 * شعار تشارك — دائرة + نقاط متصلة + خط نمو.
 */
export default function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeOpacity="0.18" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeOpacity="0.28" />
      <path
        d="M11 25 L18 18 L23 22.5 L30 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="25" r="1.9" fill="currentColor" />
      <circle cx="18" cy="18" r="1.9" fill="currentColor" />
      <circle cx="23" cy="22.5" r="1.9" fill="currentColor" />
      <circle cx="30" cy="14" r="2.4" fill="currentColor" />
    </svg>
  );
}
`;

files["components/Navbar.tsx"] = `
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
`;

files["components/Hero.tsx"] = `
import { fundData } from "@/data/investors";

export default function Hero() {
  return (
    <section
      id="summary"
      className="mx-auto w-full max-w-6xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-ink-900/60 px-3 py-1 text-[11px] font-medium tracking-wide text-white/50">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        صندوق استثماري خاص
      </div>

      <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        {fundData.name}
        <span className="ms-3 font-light text-white/25">{fundData.nameEn}</span>
      </h1>

      <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
        {fundData.tagline}
      </p>
    </section>
  );
}
`;

files["components/SummaryCards.tsx"] = `
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
`;

files["components/InvestorCard.tsx"] = `
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
`;

files["components/InvestorList.tsx"] = `
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
`;

files["components/InvestorDetails.tsx"] = `
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
`;

files["components/Dashboard.tsx"] = `
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
`;

/* ============================================================
 *  PUBLIC
 * ============================================================ */

files["public/.nojekyll"] = "";

/* ============================================================
 *  GITHUB ACTIONS
 * ============================================================ */

files[".github/workflows/deploy.yml"] = `
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build

      - run: touch out/.nojekyll

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
`;

/* ============================================================
 *  README
 * ============================================================ */

files["README.md"] = `
# تشارك — Tasharak

> نشارك رأس المال، ونتابع النمو.

صندوق استثماري خاص بين مجموعة من الأصدقاء.
الموقع **Static بالكامل** — لا Backend، لا Database، لا تسجيل دخول، لا APIs.

---

## ⚡️ التشغيل المحلي

\`\`\`bash
npm install
npm run dev
\`\`\`

افتح: http://localhost:3000

---

## ✏️ تعديل البيانات

كل شيء في **ملف واحد فقط**:

\`\`\`
data/investors.ts
\`\`\`

### 1) بيانات الصندوق

\`\`\`ts
export const fundData: FundData = {
  name: "تشارك",
  nameEn: "Tasharak",
  tagline: "نشارك رأس المال، ونتابع النمو.",
  currency: "EGP",
  totalReturn: 0,
};
\`\`\`

- \`currency\`: \`EGP\` / \`SAR\` / \`AED\` ...
- \`totalReturn\`: نسبة العائد % (0 = لا ربح، 12.5 = ربح 12.5%، -5 = خسارة 5%)

### 2) إضافة مشارك

\`\`\`ts
{
  id: "003",
  code: "003",
  name: "New User",
  investment: 10000,
},
\`\`\`

احفظ → يظهر تلقائيًا مع حساب نسبته وقيمته الحالية.

### 3) تغيير العائد

غيّر \`totalReturn\` فقط → كل الأرقام تُحدَّث تلقائيًا.

---

## 🧮 المعادلات

| القيمة | المعادلة |
|---|---|
| نسبة المشاركة | \`investment / totalCapital × 100\` |
| قيمة الربح | \`investment × (totalReturn / 100)\` |
| القيمة الحالية | \`investment + returnAmount\` |
| إجمالي رأس المال | مجموع كل \`investment\` |
| القيمة الحالية للصندوق | \`totalCapital + totalProfit\` |

**لا شيء Hard-coded.**

---

## 🏗️ البنية

\`\`\`
app/
  layout.tsx        ← RTL + metadata
  page.tsx          ← الصفحة الوحيدة
  globals.css
components/
  Dashboard.tsx
  Navbar.tsx
  Hero.tsx
  Logo.tsx
  SummaryCards.tsx
  InvestorList.tsx
  InvestorCard.tsx
  InvestorDetails.tsx
data/
  investors.ts      ← ★ كل البيانات هنا ★
lib/
  calculations.ts
  format.ts
\`\`\`

---

## 🚀 النشر على GitHub Pages

### 0) قبل كل شيء — غيّر اسم المستودع

افتح \`next.config.js\` وغيّر السطر:

\`\`\`js
const repo = "tasharak";   // ← اسم مستودعك على GitHub بالضبط
\`\`\`

### 1) أنشئ المستودع وارفع الكود

\`\`\`bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/tasharak.git
git push -u origin main
\`\`\`

استبدل \`USERNAME\` باسمك على GitHub.

### 2) فعّل GitHub Pages

- افتح المستودع على GitHub
- **Settings → Pages**
- تحت **Source** اختر: **GitHub Actions**

### 3) افتح الموقع

بعد ~دقيقة:

\`\`\`
https://USERNAME.github.io/tasharak/
\`\`\`

### 4) التحديثات التالية

أي تعديل على \`data/investors.ts\`:

\`\`\`bash
git add .
git commit -m "update data"
git push
\`\`\`

الموقع يُحدَّث تلقائيًا.

---

## 📦 Build يدوي (اختياري)

\`\`\`bash
npm run build
\`\`\`

الناتج في مجلد \`out/\` — Static كامل.

---

## 🔐 الخصوصية والأمان

- كل البيانات في \`data/investors.ts\` تُضمَّن في ملفات JS النهائية.
- **أي شخص يعرف الرابط يمكنه رؤية البيانات.**
- لا تضع كلمات مرور، مفاتيح API، أو بيانات حساسة في الملفات.
- لتقييد الوصول: اجعل المستودع Private (يتطلب GitHub Pro لتفعيل Pages عليه).

---

## 🛠️ التقنيات

- Next.js 14 (App Router, Static Export)
- TypeScript
- Tailwind CSS
- Lucide Icons

بدون مكتبات إضافية.

---

## 📄 الترخيص

خاص — للاستخدام الداخلي بين أعضاء الصندوق.
`;

/* ============================================================
 *  RUN
 * ============================================================ */

function writeFile(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const body = content.replace(/^\r?\n/, "");
  fs.writeFileSync(abs, body.endsWith("\n") ? body : body + "\n", "utf8");
  console.log("  \u2713 " + rel);
}

console.log("\nتشارك — Tasharak  ·  GitHub Pages edition\n");
console.log("Creating " + Object.keys(files).length + " files...\n");

Object.keys(files).forEach(function (rel) {
  writeFile(rel, files[rel]);
});

console.log("\n\u2705 Done.\n");
console.log("Repo name configured as: " + GITHUB_REPO);
console.log("(change it in next.config.js if needed)\n");
console.log("Next steps:\n");
console.log("  1)  npm install");
console.log("  2)  npm run dev\n");
console.log("To deploy:\n");
console.log('  1)  git init && git add . && git commit -m "init"');
console.log("  2)  git branch -M main");
console.log(
  "  3)  git remote add origin https://github.com/USERNAME/" +
    GITHUB_REPO +
    ".git"
);
console.log("  4)  git push -u origin main");
console.log("  5)  GitHub → Settings → Pages → Source = GitHub Actions\n");
console.log("Your site will be at:");
console.log("  https://USERNAME.github.io/" + GITHUB_REPO + "/\n");
