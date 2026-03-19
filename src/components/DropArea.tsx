"use client";

import React, { useRef, useCallback, useState } from "react";
import DropIdle from "./DropIdle";
import UploadProgress from "./UploadProgress";
import UploadDone from "./UploadDone";

type UploadState = "idle" | "uploading" | "done";

interface DropAreaProps{
    state: UploadState,
    file: File | null,
    progress: number,
    elapsed: number,
    transferId: string,
    copied: boolean,
    onCopy: () => void,
    onReset: () => void,
    onStartUpload: ( file: File ) => void;
}


export default function DropArea({ state, file, progress, elapsed, transferId, copied, onCopy, onReset, onStartUpload}: DropAreaProps){
    const [ dragOver, setDragOver ] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if(f) onStartUpload(f);
    }, [onStartUpload]);

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if(f) onStartUpload(f);
    };

    return(
        <section className="w-full pb-8">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-ghost dark:text-white/30 mb-4">
                - Upload your file
            </div>

            <div
            className={`group relative w-full min-h-75 flex flex-col items-center justify-center cursor-pointer overflow-hidden border-[1.5px] border-dashed transition-all duration-300 ${dragOver ? "border-gold bg-gold/[0.04] -translate-y-0.5" : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] hover:border-gold hover:bg-gold/[0.04] hover:-translate-y-0.5"}`}
                onDragOver={(e) => {e.preventDefault(); setDragOver(true);}}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => state === "idle" && fileInputRef.current?.click()}
            >
                {/* /Ripple on drag */}
                <div className={`w-96 h-72 absolute rounded-full pointer-events-none border border-gold-light opacity-0 ${dragOver ? "animate-ripple": ""}`}/>
                <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleBrowse}
                />

            {state === "idle" && <DropIdle onBrowseClick={() => fileInputRef.current?.click()}/>}
            {state === "uploading" && <UploadProgress file={file} progress={progress} elapsed={elapsed} />}
            {state === "done" && (
                <UploadDone 
                file={file}
                elapsed={elapsed}
                transferId={transferId}
                copied={copied}
                onCopy={onCopy}
                onReset={onReset}
                />
            )}
            </div>
        </section>
    );
}