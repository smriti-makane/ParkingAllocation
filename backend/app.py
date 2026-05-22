from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



# same slots
slots = [
    {"id": 1, "name": "A1", "status": "free"},
    {"id": 2, "name": "A2", "status": "free"},
    {"id": 3, "name": "A3", "status": "free"},
    {"id": 4, "name": "A4", "status": "free"},
    {"id": 5, "name": "B1", "status": "free"},
    {"id": 6, "name": "B2", "status": "free"},
    {"id": 7, "name": "B4", "status": "free"},
]


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']

    # 🔥 simulate detection (replace with YOLO later)
    for slot in slots:
        slot["status"] = random.choice(["free", "booked"])

    return jsonify({
        "slots": slots,
        "available": len([s for s in slots if s["status"] == "free"])
    })

@app.route('/book', methods=['POST'])
def book():
    data = request.json
    slot_id = data.get("slot_id")

    for slot in slots:
        if slot["id"] == slot_id and slot["status"] == "free":
            slot["status"] = "booked"

    return jsonify({"message": "booked"})



@app.route('/reset', methods=['POST'])
def reset():
    for slot in slots:
        slot["status"] = "free"
    return jsonify({"message": "reset"})

if __name__ == "__main__":
    app.run(debug=True)