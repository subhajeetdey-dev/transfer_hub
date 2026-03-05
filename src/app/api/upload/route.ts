import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log([...formData.entries()]);
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("no file found", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    const fileData = {
      name: file.name,
      path: file.name,
    };
    return Response.json(fileData);
  } catch (err) {
    console.log(`upload-error`,err);
    return new Response("upload-failed", { status: 500 });
  }
}
