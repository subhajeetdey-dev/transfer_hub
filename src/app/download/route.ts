import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file");

    if(!fileName){
        return new Response("No file specified", { status : 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    if(!fs.existsSync(filePath)) {
        return new Response("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    fs.unlinkSync(filePath);

    return new Response(fileBuffer, {
        headers: {
            "Content-Disposition": `attachment; filename= "${fileName}"`,
        },
    });
}