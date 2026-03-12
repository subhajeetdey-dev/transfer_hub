import { FOOTER_LINKS } from "@/lib/utils";


export default function Footer(){
    return(
        <footer className="w-full `max-w-[960px]` mt-auto border-t border-black/10 dark:border-white/10 py-6 flex justify-between items-center">
            <div>
                © 2026 Drift · All transfers encrypted
            </div>
            <div className="flex gap-6">
                {FOOTER_LINKS.map((link) => (
                    <span className="font-mono text-[9px] tracking-[0.08rem] uppercase text-ink-ghost dark:text-white/30 cursor-pointer hover:text-gold transition-colors duration-200">
                        {link}
                    </span>
                ))}
            </div>
        </footer>
    );
}