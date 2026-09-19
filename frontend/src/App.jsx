import React, { useEffect, useState } from "react";
import "./styles.css";

import Header from "./components/Header";
import RoomCard from "./components/RoomCard";
import SitoutCard from "./components/SitoutCard";
import FireSafety from "./components/FireSafety";

const API = import.meta.env.VITE_API_URL;;

const emptyState = {
  connected: false,
  port: null,

  room1: {
    temperature: null,
    humidity: null,
    flame: null,
    motion: null,
    light: false,
    fan: false
  },

  room2: {
    temperature: null,
    humidity: null,
    flame: null,
    motion: null,
    light: false,
    fan: false
  },

  sitout: {
    light: false
  },

  alarm: false,
  last_update: null
};

export default function App() {

  // =====================================================
  // HOME STATE
  // =====================================================

  const [homeState, setHomeState] = useState(emptyState);



  // =====================================================
  // FLAME CURSOR TRAIL
  // =====================================================

 // =====================================================
// REAL FIRE / EMBER CURSOR
// =====================================================

const [sparks, setSparks] = useState([]);

useEffect(() => {
  let sparkId = 0;
  let lastX = 0;
  let lastY = 0;

  const moveCursor = (event) => {

    const distance = Math.hypot(
      event.clientX - lastX,
      event.clientY - lastY
    );

    lastX = event.clientX;
    lastY = event.clientY;

    // Don't create particles if mouse barely moved
    if (distance < 3) return;

    // Create 2–4 particles per movement
    const particleCount =
      Math.floor(Math.random() * 3) + 2;

    const newSparks = [];

    for (let i = 0; i < particleCount; i++) {

      const id = sparkId++;

      newSparks.push({
        id,

        x:
          event.clientX +
          (Math.random() - 0.5) * 14,

        y:
          event.clientY +
          (Math.random() - 0.5) * 14,

        size:
          Math.random() * 5 + 2,

        driftX:
          (Math.random() - 0.5) * 45,

        driftY:
          -(Math.random() * 55 + 25),

        rotation:
          Math.random() * 360,

        duration:
          Math.random() * 500 + 450
      });
    }


    setSparks((current) => [
      ...current.slice(-35),
      ...newSparks
    ]);


    newSparks.forEach((spark) => {

      setTimeout(() => {

        setSparks((current) =>
          current.filter(
            (item) => item.id !== spark.id
          )
        );

      }, spark.duration);

    });

  };


  window.addEventListener(
    "mousemove",
    moveCursor
  );


  return () => {

    window.removeEventListener(
      "mousemove",
      moveCursor
    );

  };

}, []);


  // =====================================================
  // GET CURRENT ESP32 STATE
  // =====================================================

  const fetchState = async () => {

    try {

      const response = await fetch(
        `${API}/api/state`
      );


      if (!response.ok) {

        throw new Error(
          "Backend unavailable"
        );

      }


      const data = await response.json();


      setHomeState(data);


    } catch (error) {

      console.log(
        "Backend unavailable"
      );


      setHomeState(emptyState);

    }

  };


  // =====================================================
  // START POLLING
  // =====================================================

 useEffect(() => {
  fetchState();

  const stateInterval = setInterval(() => {
    fetchState();
  }, 1000);

  return () => {
    clearInterval(stateInterval);
  };
}, []);

  // =====================================================
  // SEND COMMAND TO ESP32
  // =====================================================

  const sendCommand = async (
    device,
    value
  ) => {

    if (!homeState.connected) {

      alert(
        "ESP32 is not connected."
      );

      return;

    }


    try {

      const response = await fetch(

        `${API}/api/command`,

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            device: device,

            value: value ? 1 : 0

          })
        }

      );


      const data =
        await response.json();


      if (!data.success) {

        alert(
          data.error ||
          "Command failed"
        );

        return;

      }


      console.log(
        "ESP32 command sent:",
        data.command
      );


    } catch (error) {

      console.error(
        "Command error:",
        error
      );


      alert(
        "Could not communicate with Flask backend."
      );

    }

  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <>

      {/* =================================================
          FLAME CURSOR TRAIL
          ================================================= */}

      {/* =================================================
    REAL FIRE / EMBER CURSOR
    ================================================= */}

{sparks.map((spark) => (

  <span

    key={spark.id}

    className="cursor-ember"

    style={{
      left: `${spark.x}px`,
      top: `${spark.y}px`,

      "--ember-size": `${spark.size}px`,

      "--ember-x": `${spark.driftX}px`,

      "--ember-y": `${spark.driftY}px`,

      "--ember-rotation":
        `${spark.rotation}deg`,

      "--ember-duration":
        `${spark.duration}ms`
    }}

  />

))}

      <div className="app">


        {/* =================================================
            HEADER
            ================================================= */}

        <Header

          connected={
            homeState.connected
          }

          port={
            homeState.port
          }

        />


        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero">

          <div>

            <p className="eyebrow">

              SMART HOME • REAL-TIME CONTROL

            </p>


            <h1>

              Home,

              <br />

              <span>
                under control.
              </span>

            </h1>


            <p className="hero-description">

              Monitor your rooms, control
              appliances and stay aware
              of what's happening around
              your home.

            </p>

          </div>


          {/* SYSTEM STATUS */}

          <div className="system-status">

            <div className="status-icon">

              {
                homeState.alarm
                  ? "!"
                  : "✓"
              }

            </div>


            <div>

              <p className="status-title">

                {
                  homeState.alarm

                    ? "ALARM ACTIVE"

                    : homeState.connected

                      ? "SYSTEM ONLINE"

                      : "SYSTEM READY"
                }

              </p>


              <p className="status-text">

                {
                  homeState.alarm

                    ? "Fire safety alert detected"

                    : homeState.connected

                      ? `Connected to ${homeState.port}`

                      : "Waiting for hardware connection"
                }

              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            ESP32 CONNECTION
            ================================================= */}

        <section className="hardware-panel">
  <div>
    <p className="panel-label">
      HARDWARE BRIDGE
    </p>

    <h2>
      ESP32 Connection
    </h2>

    <p className="panel-description">
      {homeState.connected
        ? "ESP32 is connected through the Smartie Homie bridge."
        : "Waiting for the Smartie Homie bridge to connect the ESP32."}
    </p>
  </div>

  <div className="connection-controls">
    <div
      className={
        homeState.connected
          ? "bridge-status bridge-online"
          : "bridge-status"
      }
    >
      <span className="status-dot"></span>

      {homeState.connected
        ? "BRIDGE ONLINE"
        : "WAITING FOR BRIDGE"}
    </div>
  </div>
</section>

        {/* =================================================
            ROOMS
            ================================================= */}

        <section className="section-heading">

          <div>

            <p className="panel-label">

              HOME MONITORING

            </p>


            <h2>

              Rooms

            </h2>

          </div>


          <span className="live-label">

            {
              homeState.connected

                ? "● LIVE HARDWARE DATA"

                : "● WAITING FOR ESP32"
            }

          </span>

        </section>


        <section className="rooms-grid">


          {/* ROOM 1 */}

          <RoomCard

            roomNumber={1}

            data={
              homeState.room1
            }

            connected={
              homeState.connected
            }

            onCommand={
              sendCommand
            }

          />


          {/* ROOM 2 */}

          <RoomCard

            roomNumber={2}

            data={
              homeState.room2
            }

            connected={
              homeState.connected
            }

            onCommand={
              sendCommand
            }

          />

        </section>


        {/* =================================================
            SIT-OUT
            ================================================= */}

        <section className="section-heading">

          <div>

            <p className="panel-label">

              OUTDOOR MONITORING

            </p>


            <h2>

              Sit-out

            </h2>

          </div>

        </section>


        <SitoutCard

          data={
            homeState.sitout
          }

          connected={
            homeState.connected
          }

          onCommand={
            sendCommand
          }

        />


        {/* =================================================
            FIRE SAFETY
            ================================================= */}

        <FireSafety

          room1={
            homeState.room1
          }

          room2={
            homeState.room2
          }

          alarm={
            homeState.alarm
          }

          connected={
            homeState.connected
          }

          onDismiss={() =>
            sendCommand(
              "DISMISS_ALARM",
              1
            )
          }

        />


        {/* =================================================
            FOOTER
            ================================================= */}

        <footer>

          <span>

            SMARTIE HOMIE

          </span>


          <span>

            Real-time ESP32 telemetry
            • No simulated sensor values

          </span>

        </footer>


      </div>

    </>

  );

}