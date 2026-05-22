function CameraPanel() {
  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "white", marginBottom: "10px" }}>Live Camera Feed</h3>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live Feed"
        style={{ width: "640px", borderRadius: "12px", border: "2px solid #333" }}
      />
    </div>
  );
}

export default CameraPanel;