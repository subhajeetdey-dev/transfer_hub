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
    onStartUpload: ( files: File[] ) => void;
    fileIndex?: number;
    totalFiles?: number;
}


export default function DropArea({ state, file, progress, elapsed, transferId, copied, onCopy, onReset, onStartUpload, fileIndex, totalFiles}: DropAreaProps){
    const [ dragOver, setDragOver ] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if(files.length) onStartUpload(files);
    }, [onStartUpload]);

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if(files.length) onStartUpload(files);
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
                multiple
                className="hidden"
                onChange={handleBrowse}
                />

            {state === "idle" && <DropIdle onBrowseClick={() => fileInputRef.current?.click()}/>}
            {state === "uploading" && <UploadProgress file={file} progress={progress} elapsed={elapsed} fileIndex={fileIndex} totalFiles={totalFiles}/>}
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