import React, { useEffect, useState } from "react";

import Header from "../layout/Header";
import StatsCard from "../components/cards/StatsCard";
import ParkingGrid from "../components/grid/ParkingGrid";
import CameraPanel from "../components/camera/CameraPanel";
import AllocationPanel from "../components/allocation/AllocationPanel";

function Dashboard() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await fetch("/api/slots");
      const data = await res.json();
      setSlots([...data]);
    } catch (err) {
      console.log("Error fetching slots:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const total = slots.length;
  const occupied = slots.filter((s) => (Array.isArray(s) ? s[1] === 1 : s.status === "booked" || s.status === "occupied")).length;
  const empty = total - occupied;

  return (
    <div style={{ background: "#0b1220", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />

      <div style={{ width: "90%", maxWidth: "1000px" }}>
        <div style={{ display: "flex", gap: "20px", padding: "20px", justifyContent: "center" }}>
          <StatsCard title="Total Spaces" value={total} />
          <StatsCard title="Available Spaces" value={empty} />
          <StatsCard title="Occupied Spaces" value={occupied} />
        </div>

        <ParkingGrid slots={slots} />
        <CameraPanel />
        <AllocationPanel refreshSlots={fetchSlots} />
      </div>
    </div>
  );
}

export default Dashboard;
