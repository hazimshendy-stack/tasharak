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
