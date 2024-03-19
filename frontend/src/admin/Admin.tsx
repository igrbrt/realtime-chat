import React from "react";
import { Chat } from "../chat/Chat";

export default function Admin() {
  return (
    <Chat
      user={{
        _id: "13109cea-80c2-4e65-8e9e-de644d62a222",
        name: "admin",
        type: "ADMIN",
      }}
    />
  );
}
