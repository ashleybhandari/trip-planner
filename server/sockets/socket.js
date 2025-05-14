import { Server } from "socket.io";

let ioInstance;

export const initSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-trip", (tripSlug) => {
      console.log(`Joining trip room: ${tripSlug}`);
      socket.join(tripSlug);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return ioInstance;
};

export const getIO = () => {
  if (!ioInstance) throw new Error("Socket.io not initialized!");
  return ioInstance;
};
