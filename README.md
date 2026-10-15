# 🏠 Smart Home Monitoring and Management System Using ESP32 and Arduino

An IoT-based smart home system that integrates embedded hardware, real-time sensor monitoring, cloud connectivity, and an interactive web dashboard to monitor home environments and control connected appliances.

## 📌 Project Overview

The **Smart Home Monitoring and Management System** uses an ESP32 microcontroller and Arduino-based hardware to monitor two indoor rooms and an outdoor sit-out area. It collects environmental and safety-related sensor data and enables users to control lights and fans through a web dashboard.

A Python hardware bridge connects the ESP32 to the cloud backend through USB serial communication, allowing sensor telemetry and control commands to move between the physical hardware and the dashboard.

## ✨ Key Features

- **Real-Time Hardware Monitoring:** Displays the current ESP32 connection status.
- **Bridge Connectivity:** Shows `WAITING FOR BRIDGE` when the hardware bridge is unavailable and `BRIDGE ONLINE` when live telemetry is received.
- **Temperature and Humidity Monitoring:** Displays real-time environmental readings for Room 1 and Room 2.
- **Motion Detection:** Monitors movement using motion sensors.
- **Flame Detection:** Detects flame conditions and supports safety responses.
- **Room-Wise Appliance Control:** Provides separate light and fan controls for both rooms.
- **Sit-Out Monitoring:** Uses ultrasonic distance detection to monitor the outdoor area.
- **Sit-Out Light Control:** Allows the user to control the outdoor light through the dashboard.
- **Cloud Integration:** Transfers sensor readings and device commands through the cloud backend.
- **Interactive Dashboard:** Features individual room cards, animated indicators, safety alerts, and dynamic visual effects.

## 🛠️ Hardware Components

| Component | Purpose |
|---|---|
| ESP32 development board | Main microcontroller for hardware communication and control |
| Temperature and humidity sensor | Measures indoor environmental conditions |
| PIR/IR motion sensor | Detects movement in monitored areas |
| Flame sensor | Detects flame conditions |
| Ultrasonic sensor (HC-SR04) | Measures distance in the sit-out area |
| Motor driver module | Controls connected DC motors |
| DC geared motors | Demonstrates motorized appliance control |
| Breadboards | Supports circuit assembly and prototyping |
| Jumper wires | Connects sensors, modules, and the controller |
| USB cable | Supports programming, power, and serial communication |
| LEDs and other circuit components | Provide status indication and support circuit operation |

*Note: Exact sensor and module models may vary depending on the assembled circuit.*

## 💻 Software and Technologies

- **Embedded Hardware:** ESP32
- **Microcontroller Programming:** Arduino IDE and Arduino-compatible programming
- **Hardware Communication:** USB serial communication
- **Hardware Bridge:** Python
- **Frontend:** React.js
- **Backend:** Cloud-connected API/backend
- **Dashboard:** HTML, CSS, JavaScript, and React components

## 🏗️ System Architecture

The project consists of four main layers:

1. **ESP32 Hardware Layer:** Reads sensor data and operates connected devices.
2. **Python Hardware Bridge:** Communicates with the ESP32 over USB serial and exchanges telemetry and control commands with the cloud backend.
3. **Cloud Backend:** Processes or stores the latest sensor states and handles dashboard requests.
4. **Web Dashboard:** Displays live system information and provides appliance controls.

### System Data Flow

**Sensor Data Flow:**

ESP32 Sensors → Python Hardware Bridge → Cloud Backend → Web Dashboard

**Device Control Flow:**

Web Dashboard → Cloud Backend → Python Hardware Bridge → USB Serial → ESP32 → Physical Device

This architecture connects the embedded hardware to a centralized monitoring and control interface.

## 🏡 Monitored Areas

### Room 1
- Real-time temperature and humidity monitoring.
- Motion and flame detection.
- Independent light and fan controls.
- Environmental and safety status display.

### Room 2
- Independent temperature and humidity monitoring.
- Motion and flame detection.
- Separate light and fan controls.
- Room-specific status updates.

### Sit-Out Area
- Ultrasonic-based distance detection.
- Outdoor area status monitoring.
- Software-based sit-out light control.

## 🔄 Hardware and Safety Behaviour

The embedded system combines sensor readings with device-control logic.

- Environmental readings are transmitted for dashboard display.
- Motion sensors provide movement status for the monitored areas.
- Flame detection supports safety-related responses, including switching off the affected room's light and fan and activating warning indicators where configured.
- Humidity-based fan control can adjust fan operation according to the programmed thresholds.
- The sit-out ultrasonic sensor provides distance-based detection.

The exact responses depend on the logic programmed into the microcontroller.

## 📊 Dashboard and User Interface

The web dashboard provides a centralized interface for monitoring and controlling the smart home.

- Separate cards for Room 1, Room 2, and the Sit-Out area.
- Real-time temperature and humidity readings.
- Motion and flame status indicators.
- Light and fan control switches.
- ESP32 hardware bridge connection status.
- Animated indicators for fans, motion, and safety alerts.
- Dynamic background, cursor effects, and interactive visual elements.

## 🚀 Getting Started

### Prerequisites

Install or prepare the following:

- Arduino IDE.
- ESP32 board support in Arduino IDE.
- Python 3.
- Node.js and npm.
- USB data cable compatible with the ESP32.
- Access to the cloud backend and its required configuration.
- Required Python and frontend dependencies.

### 1. Set Up the ESP32

1. Connect the ESP32 to your computer using a USB data cable.
2. Open the embedded firmware in Arduino IDE.
3. Select the appropriate ESP32 board and serial port.
4. Verify the sensor connections and configured GPIO pins.
5. Upload the firmware to the ESP32.

### 2. Configure the Python Hardware Bridge

1. Navigate to the directory containing the Python bridge script.
2. Install the Python dependencies listed in the project's dependency file.
3. Configure the correct serial port and baud rate to match the ESP32 firmware.
4. Configure the cloud backend connection using the project's existing settings.
5. Start the Python bridge.

The bridge should receive sensor telemetry and forward it to the backend. It should also relay supported device-control commands to the ESP32.

### 3. Start the Frontend

1. Navigate to the React frontend directory.
2. Install the dependencies using `npm install`.
3. Configure the backend API URL according to the project settings.
4. Start the development server using `npm run dev`.
5. Open the local URL printed by the development server.

### 4. Verify the System

- Confirm that the ESP32 is connected and the Python bridge is running.
- Check whether the dashboard displays `BRIDGE ONLINE`.
- Verify that temperature, humidity, motion, flame, and sit-out readings update as expected.
- Test the light and fan controls and verify that the corresponding physical hardware responds.
- Confirm that safety-related behaviour works as programmed.

*Important: Directory names, dependency files, serial settings, API URLs, and startup commands must match the actual repository configuration.*

## 🔍 Troubleshooting

| Issue | What to check |
|---|---|
| `WAITING FOR BRIDGE` | Confirm that the Python bridge is running and receiving ESP32 telemetry. |
| No sensor readings | Check sensor wiring, GPIO assignments, firmware, and serial output. |
| Dashboard does not update | Verify the cloud backend connection and frontend API configuration. |
| Controls do not operate hardware | Check the command flow, serial connection, motor driver, and actuator wiring. |
| Serial connection fails | Verify the correct COM port, baud rate, USB cable, and serial-port permissions. |
| Incorrect sensor values | Check the sensor connections, sensor type, and firmware reading logic. |

## 🔮 Future Enhancements

- Automated appliance scheduling.
- Historical sensor-data visualizations.
- Mobile-friendly monitoring and notifications.
- Expanded energy monitoring and optimization.
- Additional rooms and sensor integrations.
- Improved device authentication and communication security.

## 🎯 Project Objective

The objective of this project is to demonstrate how embedded systems, IoT communication, cloud-connected services, and web technologies can work together to create a smart home environment with real-time monitoring, appliance control, and safety-oriented automation.

## 👥 Contributors

- **Atmihaa M B**
- **Devpriya Jain**
- **Kajal Sandeep Baravkar**
- **Isabel Joy**
  
## 👥 Project Information

**Project Title:** Smart Home Monitoring and Management System Using ESP32 and Arduino

**Domain:** Embedded Systems, Internet of Things (IoT), and Smart Home Automation

**Core Components:** ESP32, Arduino-compatible firmware, Python hardware bridge, cloud backend, and React dashboard.
