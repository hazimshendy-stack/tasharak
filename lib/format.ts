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
