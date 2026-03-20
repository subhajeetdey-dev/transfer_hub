import ThemeToggle from "./ToggleTheme";

interface HeaderProps {
    isDark: boolean;
    onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
    return(
        <header className="w-full flex justify-between items-center md:items-baseline pt-10 pb-5 border-b border-black/10 dark:border-white/10">
            <div className="font-serif font-light text-[18px] md:text-[22px] tracking-[0.125em] uppercase text-ink dark:text-paper">Transfer Hub<span className="text-[#f7ab08]">.</span></div>
            <div className="flex items-center gap-5">
            <span className="font-mono text-[10px] `tracking-[0.1em]` uppercase text-ink-ghost dark:text-white/30 hidden sm:block">Effortless file sharing</span>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme}/>
            </div>
        </header>
    );
}