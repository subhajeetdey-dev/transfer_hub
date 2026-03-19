"use client";

import { socket } from "@/lib/socketClient";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FileType } from "@/types/file";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DropArea from "@/components/DropArea";
import Footer from "@/components/Footer";
import { randomId } from "@/lib/utils";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done">(
    "idle",
  );
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [uploadedPath, setUploadedPath] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if(isDark){
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }

    socket.on("connect", () => {
      console.log("Connected to socket", socket.id);
    });

    socket.on("files-list", (data: FileType[]) => {
      setFiles(data);
    });

    socket.on("new-file", (file: FileType) => {
      setFiles((prev) => [...prev, file]);
    });

    socket.on("devices", (list) => {
      setDevices(list);
    });

    socket.on("file-removed", (fileName: String) => {
      console.log("Removing file:", fileName);
      setFiles((prev) => prev.filter((f) => f.path !== fileName));
    });

    return () => {
      socket.off("files-list");
      socket.off("new-file");
      socket.off("devices");
      socket.off("file-removed");
    };
  }, []);

  const handleUploadFile = async (selectedFile: File) => {
    setActiveFile(selectedFile);
    setUploadState("uploading");
    setProgress(0);
    setElapsed(0);

    let t = 0;
    const ticker = setInterval(() => {
      t++;
      setElapsed(t);
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(ticker);
          return 90;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const fileData: FileType = await res.json();
      clearInterval(ticker);
      setProgress(100);
      setUploadedPath(fileData.path);
      socket.emit("new-file", fileData);

      setTimeout(() => setUploadState("done"), 300);
    } catch (err) {
      clearInterval(ticker);
      console.error("Upload failed", err);
      setUploadState("idle");
    }
  };

  const handleCopy = () => {
    const downloadUrl = `${url}/api/download?file=${uploadedPath}`;
    navigator.clipboard.writeText(downloadUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setUploadState("idle");
    setActiveFile(null);
    setProgress(0);
    setElapsed(0);
    setCopied(false);
    setUploadedPath("");
  };

  return (
    <div className="grain ruled relative min-h-screen bg-paper dark:bg-ink flex flex-col items-center px-10 transition-colors duration-300">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <div className="flex flex-col justify-between items-center">
        <HeroSection />
      </div>

      <div className="w-full flex items-center justify-between py-4 border-b border-black/10 dark:border-white/10">
        <div className="w-full">
          <DropArea
            state={uploadState}
            file={activeFile}
            progress={Math.min(100, Math.round(progress))}
            elapsed={elapsed}
            transferId={uploadedPath}
            copied={copied}
            onCopy={handleCopy}
            onReset={handleReset}
            onStartUpload={handleUploadFile}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
