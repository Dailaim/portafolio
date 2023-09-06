import { type RequestHandler } from "@builder.io/qwik-city";
import { Server as SocketIoServer } from "socket.io";

export const onGet: RequestHandler = async ({ json, platform, ...datums }) => {
  if (platform.incomingMessage.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new SocketIoServer(platform.incomingMessage.socket.server);
    platform.incomingMessage.socket.server.io = io;
  }
};
