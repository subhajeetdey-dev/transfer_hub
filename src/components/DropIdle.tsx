"use client";

import { MoveUp } from "lucide-react";

interface DropIdleProps {
  onBrowseClick: () => void;
}

export default function DropIdle({ onBrowseClick }: DropIdleProps) {
  return (
    <div className="flex flex-col items-center relative z-10 p-10 gap-4">
      <div
        className="w-[72px] h-[72px] rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-white/80 dark:bg-white/5 transition-all duration-300 group-hover:border-gold group-hover:scale-[1.08]">
        <MoveUp className="text-28 leading-none transition-transform duration-300 group-hover:-translate-y-1" />
      </div>

      <div className="font-serif font-light text-[26px] tracking-[0.01em] text-center text-ink dark:text-paper">
        Drop your files here
      </div>
      
      {/* Divider */}
      <div className="flex items-center gap-3 w-[200px]">
        <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          <span className="font-mono text-[9px] tracking-[0.1em] text-ink-ghost dark:text-white/30">
            or
          </span>
          <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
      </div>
      <button
          onClick={(e) => {e.stopPropagation(); onBrowseClick();}}
          className="px-7 py-2.5 bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[10px] tracking-[0.15em] uppercase border-none cursor-pointer hover:bg-gold dark:hover:bg-gold dark:hover:text-paper hover:-translate-y-px transition-all duration-200">
          Browse File
        </button>
    </div>
  );
}
