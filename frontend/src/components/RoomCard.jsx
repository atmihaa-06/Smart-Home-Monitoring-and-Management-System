import React from "react";

export default function RoomCard({
  roomNumber,
  data = {},
  connected = false,
  onCommand
}) {
  const temperature = data.temperature;
  const humidity = data.humidity;

  const motion = data.motion ?? false;
  const flame = data.flame ?? false;
  const light = data.light ?? false;
  const fan = data.fan ?? false;

  const lightDevice =
    roomNumber === 1 ? "R1_LIGHT" : "R2_LIGHT";

  const fanDevice =
    roomNumber === 1 ? "R1_FAN" : "R2_FAN";


  return (
    <div
      className={
        flame
          ? "room-card room-card-danger"
          : "room-card"
      }
    >

      {/* HEADER */}

      <div className="room-header">

        <div>

          <span className="room-number">
            {roomNumber === 1 ? "01" : "02"}
          </span>

          <h3>
            Room {roomNumber}
          </h3>

        </div>

        <span
          className={
            connected
              ? "offline-badge online-badge"
              : "offline-badge"
          }
        >
          {connected ? "ONLINE" : "OFFLINE"}
        </span>

      </div>


      {/* SENSOR GRID */}

      <div className="sensor-grid">

        {/* TEMPERATURE */}

        <div className="sensor">

          <span>
            Temperature
          </span>

          <strong>
            {connected && temperature != null
              ? `${temperature} °C`
              : "-- °C"}
          </strong>

        </div>


        {/* HUMIDITY */}

        <div className="sensor humidity-sensor">

          <span>
            Humidity
          </span>

          <strong>
            {connected && humidity != null
              ? `${humidity} %`
              : "-- %"}
          </strong>

          {connected && humidity != null && (
            <div className="humidity-bar">
              <div
                className="humidity-fill"
                style={{
                  width: `${Math.min(
                    Math.max(humidity, 0),
                    100
                  )}%`
                }}
              ></div>
            </div>
          )}

        </div>


        {/* MOTION */}

        <div
          className={
            motion
              ? "sensor motion-active"
              : "sensor"
          }
        >

          <span>
            Motion
          </span>

          <strong>
            {!connected
              ? "--"
              : motion
                ? "DETECTED"
                : "CLEAR"}
          </strong>

          {connected && motion && (
            <div className="motion-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

        </div>


        {/* FLAME */}

        <div
          className={
            flame
              ? "sensor flame-active"
              : "sensor"
          }
        >

          <span>
            Flame
          </span>

          <strong>
            {!connected
              ? "--"
              : flame
                ? "DETECTED"
                : "CLEAR"}
          </strong>

        </div>

      </div>


      {/* CONTROLS */}

      <div className="room-controls">

        <button
          className={`control-button ${
            light ? "control-active" : ""
          }`}
          onClick={() =>
            onCommand(lightDevice, !light)
          }
          disabled={!connected}
        >

          <span className="light-icon">
            💡
          </span>

          Room Light

          <b>
            {light ? "ON" : "OFF"}
          </b>

        </button>


        <button
          className={`control-button ${
            fan ? "control-active" : ""
          }`}
          onClick={() =>
            onCommand(fanDevice, !fan)
          }
          disabled={!connected}
        >

          <span
            className={
              fan
                ? "fan-icon fan-spinning"
                : "fan-icon"
            }
          >
            🌀
          </span>

          Fan

          <b>
            {fan ? "ON" : "OFF"}
          </b>

        </button>

      </div>

    </div>
  );
}