import {Server} from "socket.io";
import { NextResponse } from "next/server";

let io: Server | null = null;

export async function GET(req:NextResponse) {
    if(!io){
        console.log("Starting Socket.io Server...");

        const httpServer = (global as any).socketServer;

        if(!httpServer){
            return new Response("No server found",{status:500});
        }

        io = new Server (httpServer, {
            path: "/api/socket",
            cors: {
                origin: "*",
            }
        })

        io.on("connection", (socket) => {
            console.log("Device Connected", socket.id);

            socket.on("disconnect", ()=> {
                console.log("Device disconnected:", socket.id);
            })
        })
    }

    return new Response("Socket is running");
}
