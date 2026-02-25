import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { rejects } from "assert";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextResponse) {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fileds, files) => {
      if (err) {
        reject(new Response("Upload Failed", { status: 500 }));
        return;
      }

      const uploadedFile = Object.values(files)[0] as any;

      const fileData = {
        name: uploadedFile.originalFilename,
        path: uploadedFile.newFilename,
      };

      (global as any).files.push(fileData);

      (global as any).io.emit("New-file", fileData);

      resolve(new Response(JSON.stringify(fileData), { status: 200 }));
    });
  });
}
