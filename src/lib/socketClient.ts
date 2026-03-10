import { io, Socket } from "socket.io-client";

let socket: Socket;

if(typeof window !== "undefined"){
    socket = io(window.location.origin, {
        transports: ["websocket"],
        autoConnect: false,
        reconnection: true,
    })
}