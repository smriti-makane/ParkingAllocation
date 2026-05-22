import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [slots, setSlots] = useState([]);
  const [vehicleSize, setVehicleSize] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    setSlots([
      { id: 1, name: "A1", status: "free", type: "normal" },
      { id: 2, name: "A2", status: "free", type: "ev" },
      { id: 3, name: "A3", status: "free", type: "accessible" },
      { id: 4, name: "A4", status: "free", type: "normal" },

      { id: 5, name: "B1", status: "free", type: "ev" },
      { id: 6, name: "B2", status: "free", type: "normal" },
      { id: 7, name: "B3", status: "free", type: "accessible" },
      { id: 8, name: "B4", status: "free", type: "normal" },

      { id: 9, name: "C1", status: "free", type: "normal" },
      { id: 10, name: "C2", status: "free", type: "ev" },
      { id: 11, name: "C3", status: "free", type: "accessible" },
      { id: 12, name: "C4", status: "free", type: "normal" },
    ]);
  }, []);

  const total = slots.length;
  const available = slots.filter((s) => s.status === "free").length;
  const occupied = slots.filter((s) => s.status === "booked").length;
  const rate = total ? ((occupied / total) * 100).toFixed(1) : 0;

  const handleSuggest = () => {
    if (!vehicleSize) {
      alert("Select vehicle size");
      return;
    }

    const freeSlots = slots.filter((s) => s.status === "free");

    if (freeSlots.length === 0) {
      alert("No slots available");
      return;
    }

    const randomSlot =
      freeSlots[Math.floor(Math.random() * freeSlots.length)];

    const updatedSlots = slots.map((slot) =>
      slot.id === randomSlot.id
        ? { ...slot, status: "booked" }
        : slot
    );

    setSlots(updatedSlots);
    setSelectedSlot(randomSlot.name);
  };

  const getColor = (slot) => {
    if (slot.status === "booked") return "#ef4444";
    if (slot.type === "ev") return "#3b82f6";
    if (slot.type === "accessible") return "#a855f7";
    return "#22c55e";
  };

  return (
    <div className="app">

      {/* 🔥 HEADER WITH LOGO */}
      <div className="header">
        <div className="header-content">
          <h1 className="title-text">ParkyourLot</h1>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="card">
          <p>Total Spaces</p>
          <h2 className="red">{total}</h2>
        </div>

        <div className="card">
          <p>Available Spaces</p>
          <h2 className="green">{available}</h2>
        </div>

        <div className="card">
          <p>Occupied Spaces</p>
          <h2 className="red">{occupied}</h2>
        </div>

        <div className="card">
          <p>Occupancy Rate</p>
          <h2 className="yellow">{rate}%</h2>
        </div>
      </div>

      {/* CAMERA */}
      <h2 className="title">Simulated Camera Feeds</h2>
      <div className="camera-container">
        <div className="camera-card">
          <p>📹 Entrance Camera</p>
          <div className="camera-feed">Feed 1</div>
        </div>

        <div className="camera-card">
          <p>📹 Section A Camera</p>
          <div className="camera-feed">Feed 2</div>
        </div>

        <div className="camera-card">
          <p>📹 Exit Camera</p>
          <div className="camera-feed">Feed 3</div>
        </div>

        <div className="camera-card">
          <p>📹 EV Charging Zone</p>
          <div className="camera-feed">Feed 4</div>
        </div>
      </div>

      {/* GRID */}
      <h2 className="title">Parking Lot Overview</h2>
      <div className="grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="slot-card"
            onClick={() => setActiveSlot(slot)}
            style={{ backgroundColor: getColor(slot) }}
          >
            {slot.name}
          </div>
        ))}
      </div>

      {/* PANEL */}
      <div className="panel">
        <h2 className="panel-title">🧠 Smart Allocation Engine</h2>
        <p className="panel-sub">
          Get AI-powered suggestions for the optimal parking space.
        </p>

        <label>Vehicle Size</label>
        <select
          value={vehicleSize}
          onChange={(e) => setVehicleSize(e.target.value)}
        >
          <option value="">Select vehicle size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>Destination Proximity (Optional)</label>
        <input
          type="text"
          placeholder="e.g., Near Entrance A, Far from elevators"
          className="input-box"
        />

        <p className="available">
          Currently available spaces: {available}
        </p>

        {selectedSlot && (
          <p className="result">
            ✅ Allocated Slot: <b>{selectedSlot}</b>
          </p>
        )}

        <button onClick={handleSuggest}>
          Suggest Optimal Space
        </button>
      </div>

      {/* MODAL */}
      {activeSlot && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setActiveSlot(null)}>✖</span>

            <h2 className="modal-title">Space {activeSlot.name}</h2>
            <p className="modal-sub">
              Detailed information for parking space {activeSlot.name}.
            </p>

            <div className="car-icon">🚗</div>

            <div className="modal-info">
              <p>Status:</p>
              <span className={activeSlot.status === "free" ? "tag green-bg" : "tag red-bg"}>
                {activeSlot.status === "free" ? "Available" : "Occupied"}
              </span>
            </div>

            <div className="modal-info">
              <p>Type:</p>
              <span className="type">
                {activeSlot.type === "ev"
                  ? "EV Charging"
                  : activeSlot.type === "accessible"
                  ? "Handicap"
                  : "Normal"}
              </span>
            </div>

            <div className="modal-info">
              <p>Restrictions:</p>
              <span className="restriction">
                {activeSlot.type === "ev"
                  ? "EV vehicles only"
                  : activeSlot.type === "accessible"
                  ? "Reserved for disabled"
                  : "General parking"}
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
export default App;
