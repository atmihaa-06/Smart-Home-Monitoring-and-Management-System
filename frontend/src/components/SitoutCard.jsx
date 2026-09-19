import React from "react";

export default function SitoutCard({
  data = {},
  connected = false,
  onCommand
}) {
  const light = data.light ?? false;

  return (
    <div className="sitout-card">

      <div className="sitout-visual">
        <div className="radar-ring">
          <div className="radar-dot"></div>
        </div>
      </div>

      <div className="sitout-info">

        <span className="panel-label">
          OUTDOOR AREA
        </span>

        <h2>
          Sit-out
        </h2>

        <p>
          Ultrasonic motion detection
        </p>

        <div className="sitout-status">
          <span className="status-dot"></span>

          {connected
            ? "ESP32 SENSOR ONLINE"
            : "WAITING FOR SENSOR"}
        </div>

        <button
          className={`control-button sitout-button ${
            light ? "control-active" : ""
          }`}
          onClick={() =>
            onCommand("SITOUT_LIGHT", !light)
          }
          disabled={!connected}
        >
          <span>💡</span>

          Sit-out Light

          <b>
            {light ? "ON" : "OFF"}
          </b>
        </button>

      </div>

    </div>
  );
}