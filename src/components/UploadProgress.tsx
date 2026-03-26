import { formatBytes, formatTime } from "@/lib/utils"

interface uploadProcessProps {
    file: File | null;
    progress: number;
    elapsed: number;
}

export default function UploadProgress({ file, progress, elapsed}: uploadProcessProps){
    const circumference = 2 * Math.PI * 40;
    const dashOffset = circumference - (progress / 100) * circumference;

    return(
        <div className="flex flex-col items-center gap-5 p-12 w-full">
            <div className="font-serif font-light text-[22px] text-center text-ink dark:text-paper `max-w-[400px]` break-all px-4">
                { file?.name }
            </div>

            {/* Ring */}
            <div className="relative `w-[100px]` `h-[100px]`">
                <svg className="-rotate-90 `w-[100px]` `h-[100px]`" viewBox="0 0 100 100">
                    <circle 
                    className="fill-none stroke-black/10 dark:stroke-white/10"
                    cx={50} cy={50} r={40}
                    strokeWidth={1.5}
                    strokeDasharray={circumference}
                    />
                    <circle 
                    className="fill-none stroke-gold transition-[stroke-dashoffset] duration-100 ease-linear"
                    cx={50} cy={50} r={40}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-ink dark:text-paper">
                    {progress}%
                </div>
            </div>

            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-center text-ink-ghost dark:text-white/30">
                {formatBytes(file?.size || 0)} · {formatTime(elapsed)} elapsed
            </div>
        </div>
    );
}