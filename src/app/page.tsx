"use client";

import { socket } from "@/lib/socketClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("File", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("File Uploaded Successfully");
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
    </main>
  );
}
