"use client";

import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type FileType = {
  name: string;
  path: string;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [url, setUrl] = useState("");

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

    socket.on("files-list", (data) => {
      setFiles(data);
    });

    socket.on("new-file", (file) => {
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
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const fileData = await res.json();
    socket.emit("new-file", fileData);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <h1 className="text-4xl font-bold ">Trasnfer Hub</h1>
      <h3 className="text-2xl font-semibold">
        Hello, you are now connected to our local file sharing system
      </h3>

      <div className="mb-4 p-3 rounded-xl bg-gray-100 text-black font-semibold">
        Connected Devices: {devices.length}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold">Scan to Connect</h3>
        {url && (
          <QRCodeSVG
            value={url}
            size={160}
          />
        )}
        <p className="text-sm text-gray-400">
          Scan this QR from another device on the same wifi
        </p>
      </div>

      {/* drag and drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border bg-red-700 ${dragging ? "bg-blue-100 border-blue-500" : "border-gray-400"}`}
      >
        <p className="text-lg">
          {dragging
            ? "Drop File Here"
            : "Drag & Drop File here or click to upload"}
        </p>

        <input
          id="fileInput"
          type="file"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) setFile(selected);
          }}
          className="border cursor-pointer bg-gray-600 px-3 py-2 rounded-2xl"
        />
        <label htmlFor="fileInput" className="">
          Browse File
        </label>
      </div>

      <button
        onClick={() => {
          if (file) handleUploadFile(file);
        }}
        className="bg-purple-800 px-4 py-2 border rounded-2xl cursor-pointer"
      >
        Upload
      </button>

      {file && (
        <p className="text-sm mt-2 text-gray-300">Selected file: {file.name}</p>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Available Files</h2>
        {files.map((f, i) => (
          <div key={i} className="border p-2 mb-2 rounded">
            <div>
              <span className="m-2">{f.name}</span>
              <a
                href={`/api/download?file=${f.path}`}
                onClick={() => {
                  setTimeout(() => {
                    socket.emit("file-downloaded", f.path);
                  }, 500);
                }}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Download
              </a>
            </div>
            <input
              className="mt-2 w-full border p-1 text-sm"
              value={`${typeof window !== "undefined" ? window.location.origin : ""}/uploads/${f.path}`}
              readOnly
            />
          </div>
        ))}
      </div>
    </main>
  );
}
