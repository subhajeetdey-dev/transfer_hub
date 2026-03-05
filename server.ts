import { createServer } from "http";
import next from "next";
import {Server} from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=> {
    const httpServer = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(httpServer, {
        cors: {origin: "*"},
    });

    let files: { name: string; path: string }[] = [];
    let devices: string[] = [];

    io.on("connection", (socket) => {
        console.log('Device Connected Successfully', socket.id);

        if(!devices.includes(socket.id)){
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
        })

        socket.on("disconnect", ()=> {
            devices = devices.filter((id) => id!== socket.id);
            io.emit("devices", devices);
        });

    });
    
    (global as any).io = io;
    (global as any).files = files;

    httpServer.listen(3000, "0.0.0.0", ()=> {
        console.log("Server running on http://localhost:3000");
    });
});