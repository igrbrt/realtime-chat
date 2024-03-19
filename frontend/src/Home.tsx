import React from "react";
import "./App.css";

export default function Home() {
  return (
    <div className="home">
      <div className="main-container">
        <div className="container-button">
          <button
            className="button"
            onClick={() => (window.location.href = "/client")}
          >
            Cliente
          </button>
        </div>
        <br />
        <div className="container-button">
          <button
            className="button"
            onClick={() => (window.location.href = "/admin")}
          >
            Admin
          </button>
        </div>
      </div>
      <img className="logo-home" src="/assets/badaro.png" alt="logo" />
    </div>
  );
}
