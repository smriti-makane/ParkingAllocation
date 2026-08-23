import React, { useState } from "react";

function AllocationPanel({ refreshSlots }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("vehicle");

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const url =
      mode === "vehicle"
        ? "/api/upload"
        : "/api/parking-detect";

    try {
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  const bookSlot = async () => {
    if (!result) return;
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: result.slot }),
      });

      alert("Slot Booked ✅");
      setResult(null);
      if (refreshSlots) refreshSlots();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2 style={{ color: "#ef4444" }}>Smart Allocation Engine</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "15px" }}>
        <div
          onClick={() => setMode("vehicle")}
          style={{
            border: mode === "vehicle" ? "2px solid #ef4444" : "1px solid #374151",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            background: mode === "vehicle" ? "#1f2937" : "transparent"
          }}
        >
          Vehicle Upload
        </div>
        <div
          onClick={() => setMode("parking")}
          style={{
            border: mode === "parking" ? "2px solid #ef4444" : "1px solid #374151",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            background: mode === "parking" ? "#1f2937" : "transparent"
          }}
        >
          Parking Upload
        </div>
      </div>

      <input type="file" onChange={handleUpload} style={{ color: "#9ca3af" }} />

      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px", background: "#991b1b", color: "white" }}>
        Process Detection
      </button>

      {result && mode === "vehicle" && (
        <div style={{ marginTop: "15px", padding: "15px", background: "#1f2937", borderRadius: "8px" }}>
          <h3>Detected: {result.detected ? result.detected.join(", ") : "Vehicle"}</h3>
          <h3>Suggested Slot: A{result.slot !== undefined ? result.slot + 1 : 1}</h3>

          <button onClick={bookSlot} style={{ background: "#22c55e", color: "white", padding: "10px" }}>
            Book Slot
          </button>
        </div>
      )}
    </div>
  );
}

export default AllocationPanel;
