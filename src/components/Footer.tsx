import { FOOTER_LINKS } from "@/lib/utils";


export default function Footer(){
    return(
        <footer className="w-full `max-w-[960px]` mt-auto border-t border-black/10 dark:border-white/10 py-6 flex justify-between items-center">
            <div className="font-mono text-[9px] tracking-[0.08em] uppercase text-ink-ghost dark:text-white/90">
                © 2026 Drift · All transfers encrypted
            </div>

            <div className="flex gap-6">
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