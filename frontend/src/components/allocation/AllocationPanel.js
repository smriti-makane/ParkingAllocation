import React, { useState } from "react";

function AllocationPanel({ refreshSlots }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("vehicle");

  const handleUpload = (e) => setImage(e.target.files[0]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);

    const url =
      mode === "vehicle"
        ? "http://127.0.0.1:5000/upload"
        : "http://127.0.0.1:5000/parking-detect";

    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    setResult(data);
  };

  const bookSlot = async () => {
    await fetch("http://127.0.0.1:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: result.slot }),
    });

    alert("Slot Booked ✅");
    setResult(null); // 🔥 clear result
    refreshSlots();  // 🔥 update UI
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2 style={{ color: "red" }}>Smart Allocation Engine</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div onClick={() => setMode("vehicle")} style={{ border: "1px solid white", padding: "10px", cursor: "pointer" }}>
          Vehicle Upload
        </div>
        <div onClick={() => setMode("parking")} style={{ border: "1px solid white", padding: "10px", cursor: "pointer" }}>
          Parking Upload
        </div>
      </div>

      <input type="file" onChange={handleUpload} />

      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px", background: "red", color: "white" }}>
        Process
      </button>

      {result && mode === "vehicle" && (
        <>
          <h3>Detected: {result.detected.join(", ")}</h3>
          <h3>Suggested Slot: A{result.slot + 1}</h3>

          <button onClick={bookSlot} style={{ background: "green", color: "white", padding: "10px" }}>
            Book Slot
          </button>
        </>
      )}
    </div>
  );
}

export default AllocationPanel;