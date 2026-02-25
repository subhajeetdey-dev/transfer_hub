"use client";

import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";

type FileType = {
  name: string;
  path: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    socket.on("File-list", (data) => {
      setFiles(data);
    });

    socket.on("New-file", (file) => {
      setFiles((prev) => [...prev, file]);
    });

    return () => {
      socket.off("File-list");
      socket.off("New-file");
    };
  }, []);


  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("File", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <h1 className="text-4xl font-bold ">Trasnfer Hub</h1>
      <h3 className="text-2xl font-semibold">Hello User, you are connected to our local file sharing system</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border cursor-pointer bg-gray-600 px-3 py-2 rounded-2xl"
      />
      <button 
        onClick={handleUpload}
        className="bg-purple-800 px-4 py-2 border rounded-2xl cursor-pointer"
      >
        Upload
      </button>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Available Files</h2>
        {files.map((f, i) => (
          <div key={i} className="border p-2 mb-2 rounded">
            {f.name}
          </div>
        ))}
      </div>
    </main>
  );
}
