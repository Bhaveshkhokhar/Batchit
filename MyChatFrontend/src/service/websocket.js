import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  if (stompClient && stompClient.connected) return;

  const socket = new SockJS(`${import.meta.env.VITE_BACKEND_URL}/ws`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),

    onConnect: () => {
      console.log("WebSocket Connected ✅");

      // Subscribe to personal messages
      stompClient.subscribe("/user/queue/messages", (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });
    },

    onStompError: (frame) => {
      console.error("Broker error:", frame);
    }
  });

  stompClient.activate();
};

export const sendMessageWebSocket = (payload) => {
  if (!stompClient || !stompClient.connected) {
    console.error("WebSocket not connected");
    return;
  }

  stompClient.publish({
    destination: "/app/send-message",
    body: JSON.stringify(payload),
  });
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    console.log("WebSocket Disconnected ❌");
  }
};
