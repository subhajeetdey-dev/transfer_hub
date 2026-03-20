import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import cron from "node-cron";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  let files: { name: string; path: string }[] = [];
  let devices: string[] = [];

  cron.schedule("* * * * *", () => {
    if (!fs.existsSync(UPLOADS_DIR)) return;

    const fileNames = fs.readdirSync(UPLOADS_DIR);
    const now = Date.now();

    fileNames.forEach((fileName) => {
      const filePath = path.join(UPLOADS_DIR, fileName);
      const stat = fs.statSync(filePath);
      const age = now - stat.mtimeMs;

      if (age > MAX_AGE_MS) {
        fs.unlinkSync(filePath);
        console.log(`Auto-deleted: ${fileName}`);

        files = files.filter((f) => f.path !== filePath);
        io.emit("file-removed", filePath);
      }
    });
  });

  io.on("connection", (socket) => {
    console.log("Device Connected Successfully", socket.id);

    if (!devices.includes(socket.id)) {
      devices.push(socket.id);
    }

    socket.emit("files-list", files);
    io.emit("devices", devices);

    socket.on("new-file", (fileData) => {
      files.push(fileData);
      io.emit("new-file", fileData);
    });

    socket.on("file-downloaded", (fileName) => {
      files = files.filter((f) => f.path !== fileName);
      io.emit("file-removed", fileName);
    });

    socket.on("disconnect", () => {
      devices = devices.filter((id) => id !== socket.id);
      io.emit("devices", devices);
    });
  });

  (global as any).io = io;
  (global as any).files = files;

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});