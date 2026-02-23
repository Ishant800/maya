import { io } from "socket.io-client";
import { getApiBase } from "./api";

let socket = null;
let activeEmail = "";

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function connectNotifications(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;

  if (socket && activeEmail === normalized) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(getApiBase(), {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("register_email", normalized);
  });

  socket.on("notification:new", (payload) => {
    window.dispatchEvent(
      new CustomEvent("maya-notification", { detail: payload })
    );
  });

  activeEmail = normalized;
  return socket;
}

export function disconnectNotifications() {
  if (socket) {
    socket.disconnect();
  }
  socket = null;
  activeEmail = "";
}
