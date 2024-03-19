import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import BackIcon from "../components/Icons/BackIcon";
import HelpIcon from "../components/Icons/HelpIcon";
import SendIcon from "../components/Icons/SendIcon";

interface User {
  _id: string;
  name: string;
  type: "CLIENT" | "ADMIN";
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  chat: {
    _id: string;
  };
  createdAt: Date;
}

const socket = io(process.env.REACT_APP_BACKEND_URL || "", {
  transports: ["websocket"],
});

export function Chat({ user }: { user: User }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("setUser", user._id);
    });

    socket.on("setUser", (chatId) => {
      setChat(chatId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("chat", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("loadMessages", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
    };
  }, [user]);

  const displayMessages = () => {
    return messages.map((message, idx) => (
      <div
        key={idx}
        className={`chat-message ${
          (user.type === "CLIENT" && "client" === message.sender.name) ||
          (user.type === "ADMIN" && "admin" === message.sender.name)
            ? "outgoing"
            : ""
        }`}
      >
        <div className="chat-message-wrapper">
          <div className="chat-message-bubble">
            <span className="chat-message-body">{message.content}</span>
          </div>
        </div>
      </div>
    ));
  };

  const handleSendMessage = (event: any) => {
    if (event.key !== "Enter" || inputValue.trim().length === 0) return;

    socket.emit("chat", {
      sender: { _id: user._id, type: user.type, name: user.name },
      content: inputValue.trim(),
      chat: { _id: chat },
      createdAt: new Date(),
    });
    setInputValue("");
  };

  const handleLogout = () => {
    socket.disconnect();
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="chat">
        <div className="chat-header">
          <BackIcon className="back" onClick={handleLogout} />
          <div className="container-avatar">
            {user.type === "ADMIN" && (
              <img
                className="avatar-admin"
                src="/assets/adminIcon.png"
                alt="Admin"
              />
            )}
            {user.type === "CLIENT" && (
              <img
                className="avatar"
                src="/assets/clientIcon.png"
                alt="Client"
              />
            )}
          </div>
          <HelpIcon />
        </div>
        <div className="chat-message-list">
          <div className="messages">{displayMessages()}</div>
          {/* <div ref={(el) => el?.scrollIntoView({ behavior: "smooth" })} /> */}
        </div>
        <div className="footer">
          <div className="chat-composer">
            <SendIcon className="send" onClick={handleSendMessage} />
            <input
              className="chat-composer-input"
              placeholder="Fale suas necessidades"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSendMessage}
            />
          </div>
          <div className="logo">
            <img src="/assets/badaro.png" alt="Badaró" />
          </div>
        </div>
      </div>
    </div>
  );
}
