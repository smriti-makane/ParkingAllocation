import React from "react";

function StatsCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1f1f1f",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "200px",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;
