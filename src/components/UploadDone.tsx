import { formatBytes, formatTime } from "@/lib/utils";
import { Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface UploadDoneProps {
  file: File | null;
  elapsed: number;
  transferId: string;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}

export default function UploadDone({
  file,
  elapsed,
  transferId,
  copied,
  onCopy,
  onReset,
}: UploadDoneProps) {
  const url = `${typeof window !== "undefined" ? window.location.origin: ""}/api/download?file=${transferId}`;

  const stats = [
    { val: formatBytes(file?.size || 0), label: "File size" },
    { val: formatTime(elapsed), label: "Upload time" },
    { val: "72h", label: "Expires in" },
  ];

  return (
    <div className="animate-fadeUp flex flex-col items-center gap-7 p-12 w-full">
      <div
        className="
            animate-popIn w-14 h-14 rounded-full
            border border-gold flex items-center justify-center text-22 text-ink dark:text-paper
            "
      >
        <Check />
      </div>

      <div className="font-serif font-light text-28 tracking-[0.01em] text-center text-ink dark:text-paper">
        Your file is <em className="italic text-gold">ready.</em>
      </div>

      <div className="flex gap-10">
        {stats.map(({ val, label }) => (
          <div key={label} className="text-center">
            <span className="block font-serif font-light text-28 text-ink dark:text-paper">
              {val}
            </span>
            <span className="block font-mono text-9px `tracking-[0.1em]` uppercase text-ink-ghost dark:text-white/30 mt-0.5">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start w-full `max-w-[560px]`">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-stretch border border-black/10 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5">
            <input
              readOnly
              value={url}
              className="
                        flex-1 px-4 `py-[14px]`
                        font-mono `text-[11px]` tracking-[0.03em]
                        text-ink-soft dark:text-paper/60
                        bg-transparent border-none outline-none
                        cursor-text select-all overflow-hidden text-ellipsis whitespace-nowrap
                        "
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy();
              }}
              className={`
                            px-5 py-4 font-mono text-[10px] tracking-[0.12em] uppercase border-none cursor-pointer whitespace-nowrap transition-colors duration-200
                            ${copied ? "bg-[#4A7A5A] text-white" : "bg-ink dark:bg-paper text-paper dark:text-ink hover:bg-gold hover:text-paper"}
                            `}
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="self-start font-mono text-10px `tracking-[0.1em]` uppercase text-ink-ghost dark:text-white/30 bg-transparent border-none cursor-pointer underline underline-offset-[3px] hover:text-gold transition-colors duration-200"
          >
            Send another file
          </button>
        </div>
        <div className="w-px self-stretch bg-black/10 dark:bg-white/10 shrink-0">
          <div className="ml-16">
            <div className="qr-frame relative w-[120px] h-[120px] border border-black/10 dark:border-white/10 p-2 bg-white hover:scale-[1.04] transition-transform duration-200">
            <QRCodeSVG value={url} size={104} bgColor="#ffffff" fgColor="#0E0D0B" level="M"/>
          </div>
          <span className="flex m-2 w-24 font-mono text-[9px] `tracking-[0.1em]` uppercase text-center text-ink-ghost dark:text-white/30">
            Scan to download
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}
