import { FEATURE_PILLS } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="w-full py-16 grid md:grid-cols-2 gap-112 items-start">
      {/* Left side */}
      <div className="flex flex-col">
        <h1 className="font-serif font-light leading-tight tracking-tight text-5xl lg:text-7xl text-ink dark:text-paper">
          Send anything, <br />
          <em className="italic text-gold">instantly</em>
        </h1>
        <p className="mt-6 font-serif font-light text-xl leading-relaxed text-ink-soft dark:text-paper/60">
          Drop a file. Get a link. No accounts,<br />
          no friction — just transfer
        </p>
      </div>

      {/* Right side */}
      <div className="hidden md:flex flex-col gap-5 pt-3">
        {FEATURE_PILLS.map(({ icon: Icon, color, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-[18px] py-[14px] border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5"
          >
            <div
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md"
              style={{ background: `${color}20` }}
            >
              <Icon size={16} color={color} strokeWidth={2} />
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] uppercase leading-[1.5] text-ink-soft dark:text-paper/50">
              <strong className="block text-[11px] text-ink dark:text-paper/90 font-bold mb-1">
                {label}
              </strong>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}