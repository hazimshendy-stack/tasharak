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
    investment: 1000,
  },
  {
    id: "002",
    code: "002",
    name: "المشارك 002",
    investment: 100,
  },
];
