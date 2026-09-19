# Smartie Homie — Web Dashboard

Modern React/Vite frontend + Flask/PySerial backend for the supplied ESP32 serial protocol.

## Run backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally http://localhost:5173.

### Important firmware notes
1. The supplied ESP32 sketch currently maps **fan speed from temperature**, not humidity. If your requirement is higher humidity = higher fan speed, change that firmware calculation.
2. The supplied telemetry does not currently send a dedicated ultrasonic/sit-out motion field, so the dashboard cannot show true sit-out motion until the firmware adds one.
3. During flame detection the firmware switches physical light/fan outputs off but does not reset R1L/R1F/R2L/R2F state variables, so the UI can temporarily show the requested state instead of the physical safety override. Reset those state variables on flame if you want exact UI/hardware mirroring.
