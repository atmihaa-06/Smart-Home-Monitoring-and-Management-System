import React from "react";

export default function FireSafety({
  room1 = {},
  room2 = {},
  alarm = false,
  connected = false,
  onDismiss
}) {
  const room1Flame = room1.flame === true;
  const room2Flame = room2.flame === true;

  const room1Status = !connected
    ? "--"
    : room1Flame
      ? "FLAME DETECTED"
      : "CLEAR";

  const room2Status = !connected
    ? "--"
    : room2Flame
      ? "FLAME DETECTED"
      : "CLEAR";

  return (
    <section
      className={
        alarm
          ? "fire-panel alarm-active"
          : "fire-panel"
      }
    >

      {/* HEADER */}

      <div className="fire-header">

        <div>
          <span className="panel-label">
            SAFETY SYSTEM
          </span>

          <h2>
            Fire & Safety
          </h2>
        </div>

        <div className="safe-badge">
          {alarm
            ? "● ALARM ACTIVE"
            : connected
              ? "● SYSTEM SAFE"
              : "● SYSTEM STANDBY"}
        </div>

      </div>


      {/* ROOM STATUS */}

      <div className="fire-rooms">

        <div
          className={
            room1Flame
              ? "fire-room room-danger"
              : "fire-room"
          }
        >
          <span>
            ROOM 1
          </span>

          <strong>
            {room1Status}
          </strong>
        </div>


        <div
          className={
            room2Flame
              ? "fire-room room-danger"
              : "fire-room"
          }
        >
          <span>
            ROOM 2
          </span>

          <strong>
            {room2Status}
          </strong>
        </div>

      </div>


      {/* MESSAGE */}

      <div className="fire-message">

        {alarm
          ? "Emergency condition reported by ESP32."
          : connected
            ? "Fire monitoring active."
            : "Waiting for ESP32 safety telemetry"}

      </div>


      {/* DISMISS */}

      {alarm && connected && (
        <button
          className="dismiss-button"
          onClick={onDismiss}
        >
          DISMISS ALARM
        </button>
      )}

    </section>
  );
}