import { io } from "socket.io-client";
import { getApiBase } from "./api";

let socket = null;
let activeUserId = "";

export function connectChat(userId) {
  if (!userId) return null;
  if (socket && activeUserId === userId) return socket;

  if (socket) {
    socket.disconnect();
  }

  socket = io(getApiBase(), {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("register_user", userId);
  });

  socket.on("chat:message", (payload) => {
    window.dispatchEvent(new CustomEvent("maya-chat-message", { detail: payload }));
  });

  socket.on("chat:typing", (payload) => {
    window.dispatchEvent(new CustomEvent("maya-chat-typing", { detail: payload }));
  });

  activeUserId = userId;
  return socket;
}

export function emitTyping(payload) {
  if (!socket) return;
  socket.emit("chat:typing", payload);
}

export function disconnectChat() {
  if (socket) {
    socket.disconnect();
  }
  socket = null;
  activeUserId = "";
}
