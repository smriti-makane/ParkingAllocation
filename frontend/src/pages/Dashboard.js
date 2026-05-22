import React, { useEffect, useState } from "react";

import Header from "../layout/Header";
import StatsCard from "../components/cards/StatsCard";
import ParkingGrid from "../components/grid/ParkingGrid";
import CameraPanel from "../components/camera/CameraPanel";
import AllocationPanel from "../components/allocation/AllocationPanel";

function Dashboard() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    const res = await fetch("http://127.0.0.1:5000/slots");
    const data = await res.json();
    setSlots([...data]); // force re-render
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const total = slots.length;
  const occupied = slots.filter((s) => s[1] === 1).length;
  const empty = total - occupied;

  return (
    <div style={{ background: "#121212", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />

      <div style={{ width: "90%", maxWidth: "1000px" }}>
        
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <StatsCard title="Total Spaces" value={total} />
          <StatsCard title="Available Spaces" value={empty} />
          <StatsCard title="Occupied Spaces" value={occupied} />
        </div>

        <ParkingGrid slots={slots} />
        <CameraPanel />

        {/* ✅ FIXED */}
        <AllocationPanel refreshSlots={fetchSlots} />

      </div>
    </div>
  );
}

export default Dashboard;