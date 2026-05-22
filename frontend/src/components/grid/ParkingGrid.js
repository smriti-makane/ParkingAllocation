import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

const getColor = (status) => {
  switch (status) {
    case "available":
      return "#22c55e"; // green
    case "occupied":
      return "#ef4444"; // red
    case "ev":
      return "#3b82f6"; // blue
    case "accessible":
      return "#facc15"; // yellow
    default:
      return "#ccc";
  }
};

const ParkingGrid = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch slots
  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API}/slots`);
      const data = await res.json();
      setSlots(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Book slot
  const bookSlot = async (id) => {
    try {
      const res = await fetch(`${API}/book/${id}`, {
        method: "POST",
      });

      if (!res.ok) {
        alert("Already booked!");
        return;
      }

      // ✅ IMPORTANT: refresh UI
      fetchSlots();

    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
      {slots.map((slot) => (
        <div
          key={slot.id}
          onClick={() => bookSlot(slot.id)}
          style={{
            backgroundColor: getColor(slot.status),
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {slot.id}
          <br />
          {slot.status}
        </div>
      ))}
    </div>
  );
};

export default ParkingGrid;