import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { rejects } from "assert";
import { error } from "console";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req:NextResponse) {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable ({
        uploadDir,
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
            if(err) {
                reject(new Response("Upload failed", { status: 500 }));
                return;
            }

            resolve(
                new Response(
                    JSON.stringify({ message: "File uploaded successfully" }),
                    { status: 200 }
                )
            );
        });
    });
}