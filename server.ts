import { socket } from "@/lib/socketClient";
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

    let files: any[] = [];

    io.on("connection", (socket) => {
        console.log('Device Connected Successfully', socket.id);

        socket.emit("files", files);

        socket.on("disconnect", ()=> {
            console.log('Device Disconnected', socket.id);
        });
    });
    
    (global as any).io = io;
    (global as any).files = files;

    httpServer.listen(3000, "0.0.0.0", ()=> {
        console.log("Server running on http://localhost:3000");
    });
});