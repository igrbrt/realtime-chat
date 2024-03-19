import React from "react";
import { Chat } from "../chat/Chat";

export default function Client() {
  return (
    <Chat
      user={{
        _id: "2fefa058-6be4-4a96-91f0-9938c9d43b70",
        name: "client",
        type: "CLIENT",
      }}
    />
  );
}
