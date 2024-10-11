import { Socket } from "socket.io";
import { Server } from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid Room"));
    }

    socket.room = room;

    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    socket.join(socket.room);

    socket.on("message", async (data) => {
      console.log("server side message ", data);
      //   socket.broadcast.emit("message", data);

      await prisma.chats.create({ data: data });

      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("The socket disconnected", socket.id);
    });
  });
}
