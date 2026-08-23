import React from "react";

function CameraPanel() {
  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "white", marginBottom: "10px" }}>Live Camera Feed</h3>
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          height: "360px",
          background: "#1f2937",
          borderRadius: "12px",
          border: "2px solid #374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: "18px"
        }}
      >
        Live Camera Feed (Active)
      </div>
    </div>
  );
}

export default CameraPanel;
