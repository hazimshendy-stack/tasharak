# تشارك — Tasharak

> نشارك رأس المال، ونتابع النمو.

صندوق استثماري خاص بين مجموعة من الأصدقاء.
الموقع **Static بالكامل** — لا Backend، لا Database، لا تسجيل دخول، لا APIs.

---

## ⚡️ التشغيل المحلي

```bash
npm install
npm run dev
```

افتح: http://localhost:3000

---

## ✏️ تعديل البيانات

كل شيء في **ملف واحد فقط**:

```
data/investors.ts
```

### 1) بيانات الصندوق

```ts
export const fundData: FundData = {
  name: "تشارك",
  nameEn: "Tasharak",
  tagline: "نشارك رأس المال، ونتابع النمو.",
  currency: "EGP",
  totalReturn: 0,
};
```

- `currency`: `EGP` / `SAR` / `AED` ...
- `totalReturn`: نسبة العائد % (0 = لا ربح، 12.5 = ربح 12.5%، -5 = خسارة 5%)

### 2) إضافة مشارك

```ts
{
  id: "003",
  code: "003",
  name: "New User",
  investment: 10000,
},
```

احفظ → يظهر تلقائيًا مع حساب نسبته وقيمته الحالية.

### 3) تغيير العائد

غيّر `totalReturn` فقط → كل الأرقام تُحدَّث تلقائيًا.

---

## 🧮 المعادلات

| القيمة | المعادلة |
|---|---|
| نسبة المشاركة | `investment / totalCapital × 100` |
| قيمة الربح | `investment × (totalReturn / 100)` |
| القيمة الحالية | `investment + returnAmount` |
| إجمالي رأس المال | مجموع كل `investment` |
| القيمة الحالية للصندوق | `totalCapital + totalProfit` |

**لا شيء Hard-coded.**

---

## 🏗️ البنية

```
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
```

---

## 🚀 النشر على GitHub Pages

### 0) قبل كل شيء — غيّر اسم المستودع

افتح `next.config.js` وغيّر السطر:

```js
const repo = "tasharak";   // ← اسم مستودعك على GitHub بالضبط
```

### 1) أنشئ المستودع وارفع الكود

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/tasharak.git
git push -u origin main
```

استبدل `USERNAME` باسمك على GitHub.

### 2) فعّل GitHub Pages

- افتح المستودع على GitHub
- **Settings → Pages**
- تحت **Source** اختر: **GitHub Actions**

### 3) افتح الموقع

بعد ~دقيقة:

```
https://USERNAME.github.io/tasharak/
```

### 4) التحديثات التالية

أي تعديل على `data/investors.ts`:

```bash
git add .
git commit -m "update data"
git push
```

الموقع يُحدَّث تلقائيًا.

---

## 📦 Build يدوي (اختياري)

```bash
npm run build
```

الناتج في مجلد `out/` — Static كامل.

---

## 🔐 الخصوصية والأمان

- كل البيانات في `data/investors.ts` تُضمَّن في ملفات JS النهائية.
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
