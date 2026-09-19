import React from "react";

export default function Header({ connected, port }) {
  return (
    <header className="header">

      <div>

        <div className="logo">
          SMARTIE HOMIE
        </div>

        <div className="subtitle">
          SMART HOME CONTROL CENTER
        </div>

      </div>


      <div
        className={
          connected
            ? "connection-badge connected"
            : "connection-badge"
        }
      >

        <span className="status-dot"></span>

        {connected
          ? `ESP32 • ${port}`
          : "WAITING FOR ESP32"}

      </div>

    </header>
  );
}