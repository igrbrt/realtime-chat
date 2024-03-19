import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Admin from "./admin/Admin";
import Client from "./client/Client";
import Home from "./Home";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/client" Component={Client} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </BrowserRouter>
  );
}
