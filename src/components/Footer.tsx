import { FOOTER_LINKS } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-black/10 dark:border-white/10 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
      
      {/* Copyright */}
      <div className="font-mono text-[9px] tracking-[0.08em] uppercase text-ink-ghost dark:text-white/30 text-center md:text-left">
        © 2026 Transfer-Hub · All transfers encrypted
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
        {FOOTER_LINKS.map((link) => (
          <span
            key={link}
            className="font-mono text-[9px] tracking-[0.08em] uppercase text-ink-ghost dark:text-white/30 cursor-pointer hover:text-gold transition-colors duration-200"
          >
            {link}
          </span>
        ))}
      </div>

    </footer>
  );
}