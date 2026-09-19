from flask import Flask, jsonify, request
from flask_cors import CORS

import threading
import time


# =========================================================
# FLASK SETUP
# =========================================================

app = Flask(__name__)

CORS(app)


# =========================================================
# CLOUD BRIDGE STATE
# =========================================================

bridge_state = {

    "connected": False,

    "bridge_id": None,

    "last_update": None,

    "room1": {

        "temperature": None,
        "humidity": None,
        "flame": None,
        "motion": None,
        "light": False,
        "fan": False

    },

    "room2": {

        "temperature": None,
        "humidity": None,
        "flame": None,
        "motion": None,
        "light": False,
        "fan": False

    },

    "sitout": {

        "light": False

    },

    "alarm": False

}


# =========================================================
# COMMAND QUEUE
# =========================================================

command_queue = []

command_lock = threading.Lock()


# =========================================================
# BRIDGE TIMEOUT
# =========================================================

BRIDGE_TIMEOUT = 10


# =========================================================
# CHECK WHETHER BRIDGE IS ALIVE
# =========================================================

def update_bridge_status():

    if bridge_state["last_update"] is None:

        bridge_state["connected"] = False

        return


    elapsed = (
        time.time()
        - bridge_state["last_update"]
    )


    bridge_state["connected"] = (
        elapsed <= BRIDGE_TIMEOUT
    )


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "service": "Smartie Homie Cloud Backend",

        "status": "online"

    })


# =========================================================
# BRIDGE TELEMETRY
# =========================================================

@app.route(
    "/api/bridge/telemetry",
    methods=["POST"]
)
def bridge_telemetry():

    global bridge_state


    data = request.get_json()


    if not data:

        return jsonify({

            "success": False,

            "error": "No telemetry received"

        }), 400


    # -----------------------------------------------------
    # Bridge information
    # -----------------------------------------------------

    bridge_state["bridge_id"] = (
        data.get(
            "bridge_id",
            bridge_state["bridge_id"]
        )
    )


    bridge_state["last_update"] = time.time()

    bridge_state["connected"] = True


    # -----------------------------------------------------
    # Room 1
    # -----------------------------------------------------

    if "room1" in data:

        bridge_state["room1"] = data["room1"]


    # -----------------------------------------------------
    # Room 2
    # -----------------------------------------------------

    if "room2" in data:

        bridge_state["room2"] = data["room2"]


    # -----------------------------------------------------
    # Sit-out
    # -----------------------------------------------------

    if "sitout" in data:

        bridge_state["sitout"] = data["sitout"]


    # -----------------------------------------------------
    # Alarm
    # -----------------------------------------------------

    if "alarm" in data:

        bridge_state["alarm"] = data["alarm"]


    return jsonify({

        "success": True

    })


# =========================================================
# GET CURRENT BRIDGE / ESP32 STATE
# =========================================================

@app.route(
    "/api/bridge/state",
    methods=["GET"]
)
def get_bridge_state():

    update_bridge_status()


    return jsonify({

        "connected":
            bridge_state["connected"],

        "bridge_id":
            bridge_state["bridge_id"],

        "last_update":
            bridge_state["last_update"],

        "room1":
            bridge_state["room1"],

        "room2":
            bridge_state["room2"],

        "sitout":
            bridge_state["sitout"],

        "alarm":
            bridge_state["alarm"]

    })


# =========================================================
# RECEIVE COMMAND FROM VERCEL FRONTEND
# =========================================================

@app.route(
    "/api/bridge/command",
    methods=["POST"]
)
def create_command():

    data = request.get_json()


    if not data:

        return jsonify({

            "success": False,

            "error": "No command data"

        }), 400


    device = data.get("device")

    value = data.get("value")


    # -----------------------------------------------------
    # Allowed commands
    # -----------------------------------------------------

    allowed_devices = [

        "R1_LIGHT",

        "R1_FAN",

        "R2_LIGHT",

        "R2_FAN",

        "SITOUT_LIGHT",

        "DISMISS_ALARM"

    ]


    if device not in allowed_devices:

        return jsonify({

            "success": False,

            "error": "Invalid device"

        }), 400


    # -----------------------------------------------------
    # Create command
    # -----------------------------------------------------

    command = {

        "id": time.time_ns(),

        "device": device,

        "value": value,

        "created_at": time.time()

    }


    # -----------------------------------------------------
    # Add to queue
    # -----------------------------------------------------

    with command_lock:

        command_queue.append(
            command
        )


    return jsonify({

        "success": True,

        "command": command

    })


# =========================================================
# BRIDGE REQUESTS PENDING COMMANDS
# =========================================================

@app.route(
    "/api/bridge/command",
    methods=["GET"]
)
def get_commands():

    bridge_id = request.args.get(
        "bridge_id"
    )


    commands = []


    with command_lock:

        if command_queue:

            commands = command_queue.copy()

            command_queue.clear()


    return jsonify({

        "success": True,

        "bridge_id": bridge_id,

        "commands": commands

    })


# =========================================================
# FRONTEND STATE ENDPOINT
# =========================================================

@app.route(
    "/api/state",
    methods=["GET"]
)
def frontend_state():

    update_bridge_status()


    return jsonify({

        "connected":
            bridge_state["connected"],

        "port":
            None,

        "room1":
            bridge_state["room1"],

        "room2":
            bridge_state["room2"],

        "sitout":
            bridge_state["sitout"],

        "alarm":
            bridge_state["alarm"],

        "last_update":
            bridge_state["last_update"]

    })


# =========================================================
# FRONTEND COMMAND ENDPOINT
# =========================================================

@app.route(
    "/api/command",
    methods=["POST"]
)
def frontend_command():

    data = request.get_json()


    if not data:

        return jsonify({

            "success": False,

            "error": "No command data"

        }), 400


    device = data.get("device")

    value = data.get("value")


    allowed_devices = [

        "R1_LIGHT",

        "R1_FAN",

        "R2_LIGHT",

        "R2_FAN",

        "SITOUT_LIGHT",

        "DISMISS_ALARM"

    ]


    if device not in allowed_devices:

        return jsonify({

            "success": False,

            "error": "Invalid device"

        }), 400


    command = {

        "id": time.time_ns(),

        "device": device,

        "value": value,

        "created_at": time.time()

    }


    with command_lock:

        command_queue.append(
            command
        )


    return jsonify({

        "success": True,

        "command": command

    })


# =========================================================
# SERVER
# =========================================================

if __name__ == "__main__":

    print()
    print("=" * 45)
    print("       SMARTIE HOMIE CLOUD BACKEND")
    print("=" * 45)
    print("Server starting...")
    print("=" * 45)
    print()

    app.run(

        host="0.0.0.0",

        port=5000

    )