import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";

export interface ParkingSpot {
  id: number;
  name: string;
  zone: string;
  floor: string;
  type: "standard" | "ev" | "accessible" | "compact" | "vip";
  status: "available" | "occupied" | "reserved" | "maintenance";
  distanceToEntrance: number; // in meters
  occupiedSince?: string;
  licensePlate?: string;
  evChargingStatus?: "idle" | "charging" | "complete";
  sensorBattery?: number;
  pricePerHour: number;
}

const INITIAL_SPOTS: ParkingSpot[] = [
  // Zone A - Entrance & Premium / Accessible / EV
  { id: 1, name: "A-01", zone: "Zone A", floor: "Level 1", type: "accessible", status: "available", distanceToEntrance: 12, pricePerHour: 4.0, sensorBattery: 98 },
  { id: 2, name: "A-02", zone: "Zone A", floor: "Level 1", type: "accessible", status: "occupied", distanceToEntrance: 15, licensePlate: "CA-78X9", occupiedSince: "24 mins ago", pricePerHour: 4.0, sensorBattery: 95 },
  { id: 3, name: "A-03", zone: "Zone A", floor: "Level 1", type: "ev", status: "available", distanceToEntrance: 20, evChargingStatus: "idle", pricePerHour: 6.0, sensorBattery: 92 },
  { id: 4, name: "A-04", zone: "Zone A", floor: "Level 1", type: "ev", status: "occupied", distanceToEntrance: 22, licensePlate: "TS-884E", occupiedSince: "1 hr 12m ago", evChargingStatus: "charging", pricePerHour: 6.0, sensorBattery: 89 },
  { id: 5, name: "A-05", zone: "Zone A", floor: "Level 1", type: "vip", status: "reserved", distanceToEntrance: 25, pricePerHour: 8.0, sensorBattery: 100 },
  { id: 6, name: "A-06", zone: "Zone A", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 28, pricePerHour: 4.0, sensorBattery: 94 },
  { id: 7, name: "A-07", zone: "Zone A", floor: "Level 1", type: "compact", status: "occupied", distanceToEntrance: 32, licensePlate: "NY-21M4", occupiedSince: "45 mins ago", pricePerHour: 3.5, sensorBattery: 91 },
  { id: 8, name: "A-08", zone: "Zone A", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 35, pricePerHour: 4.0, sensorBattery: 96 },

  // Zone B - Central Fast Turnover
  { id: 9, name: "B-01", zone: "Zone B", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 40, pricePerHour: 4.0, sensorBattery: 88 },
  { id: 10, name: "B-02", zone: "Zone B", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 42, licensePlate: "TX-401B", occupiedSince: "10 mins ago", pricePerHour: 4.0, sensorBattery: 97 },
  { id: 11, name: "B-03", zone: "Zone B", floor: "Level 1", type: "ev", status: "available", distanceToEntrance: 45, evChargingStatus: "idle", pricePerHour: 6.0, sensorBattery: 90 },
  { id: 12, name: "B-04", zone: "Zone B", floor: "Level 1", type: "compact", status: "available", distanceToEntrance: 48, pricePerHour: 3.5, sensorBattery: 93 },
  { id: 13, name: "B-05", zone: "Zone B", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 50, licensePlate: "FL-99A1", occupiedSince: "2 hrs ago", pricePerHour: 4.0, sensorBattery: 85 },
  { id: 14, name: "B-06", zone: "Zone B", floor: "Level 1", type: "accessible", status: "available", distanceToEntrance: 52, pricePerHour: 4.0, sensorBattery: 99 },
  { id: 15, name: "B-07", zone: "Zone B", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 55, pricePerHour: 4.0, sensorBattery: 92 },
  { id: 16, name: "B-08", zone: "Zone B", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 58, licensePlate: "WA-62K7", occupiedSince: "5 mins ago", pricePerHour: 4.0, sensorBattery: 94 },

  // Zone C - North Wing
  { id: 17, name: "C-01", zone: "Zone C", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 60, pricePerHour: 3.5, sensorBattery: 91 },
  { id: 18, name: "C-02", zone: "Zone C", floor: "Level 1", type: "ev", status: "occupied", distanceToEntrance: 62, licensePlate: "IL-33D9", occupiedSince: "55 mins ago", evChargingStatus: "charging", pricePerHour: 6.0, sensorBattery: 86 },
  { id: 19, name: "C-03", zone: "Zone C", floor: "Level 1", type: "compact", status: "available", distanceToEntrance: 65, pricePerHour: 3.5, sensorBattery: 95 },
  { id: 20, name: "C-04", zone: "Zone C", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 68, licensePlate: "OR-77P2", occupiedSince: "38 mins ago", pricePerHour: 3.5, sensorBattery: 89 },
  { id: 21, name: "C-05", zone: "Zone C", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 70, pricePerHour: 3.5, sensorBattery: 93 },
  { id: 22, name: "C-06", zone: "Zone C", floor: "Level 1", type: "compact", status: "available", distanceToEntrance: 72, pricePerHour: 3.5, sensorBattery: 97 },
  { id: 23, name: "C-07", zone: "Zone C", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 75, licensePlate: "CO-19Z8", occupiedSince: "1 hr 40m ago", pricePerHour: 3.5, sensorBattery: 84 },
  { id: 24, name: "C-08", zone: "Zone C", floor: "Level 1", type: "maintenance", status: "maintenance", distanceToEntrance: 78, pricePerHour: 0.0, sensorBattery: 42 },

  // Zone D - East Wing & Long Term
  { id: 25, name: "D-01", zone: "Zone D", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 80, pricePerHour: 3.0, sensorBattery: 92 },
  { id: 26, name: "D-02", zone: "Zone D", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 82, pricePerHour: 3.0, sensorBattery: 95 },
  { id: 27, name: "D-03", zone: "Zone D", floor: "Level 1", type: "ev", status: "available", distanceToEntrance: 85, evChargingStatus: "idle", pricePerHour: 5.5, sensorBattery: 98 },
  { id: 28, name: "D-04", zone: "Zone D", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 88, licensePlate: "NV-55T4", occupiedSince: "3 hrs ago", pricePerHour: 3.0, sensorBattery: 87 },
  { id: 29, name: "D-05", zone: "Zone D", floor: "Level 1", type: "compact", status: "available", distanceToEntrance: 90, pricePerHour: 3.0, sensorBattery: 94 },
  { id: 30, name: "D-06", zone: "Zone D", floor: "Level 1", type: "standard", status: "occupied", distanceToEntrance: 92, licensePlate: "AZ-80R1", occupiedSince: "15 mins ago", pricePerHour: 3.0, sensorBattery: 90 },
  { id: 31, name: "D-07", zone: "Zone D", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 95, pricePerHour: 3.0, sensorBattery: 96 },
  { id: 32, name: "D-08", zone: "Zone D", floor: "Level 1", type: "standard", status: "available", distanceToEntrance: 98, pricePerHour: 3.0, sensorBattery: 91 },
];

let parkingSpots: ParkingSpot[] = JSON.parse(JSON.stringify(INITIAL_SPOTS));

let activityLogs: Array<{ id: string; text: string; time: string; type: "entry" | "exit" | "reserve" | "alert" }> = [
  { id: "log-1", text: "Spot A-04 occupied by TS-884E (EV Charging started)", time: "Just now", type: "entry" },
  { id: "log-2", text: "Spot B-02 occupied by TX-401B", time: "10m ago", type: "entry" },
  { id: "log-3", text: "Spot A-05 status updated to Reserved", time: "18m ago", type: "reserve" },
  { id: "log-4", text: "Spot C-06 vacated and marked Available", time: "25m ago", type: "exit" },
];

const RANDOM_PLATES = ["CA-4981", "TX-7721", "NY-8832", "WA-1190", "FL-4033", "IL-6029", "CO-3318", "NV-9014"];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Get all spots & statistics
  app.get(["/slots", "/api/slots", "/api/spots"], (req, res) => {
    const total = parkingSpots.length;
    const available = parkingSpots.filter((s) => s.status === "available").length;
    const occupied = parkingSpots.filter((s) => s.status === "occupied").length;
    const reserved = parkingSpots.filter((s) => s.status === "reserved").length;
    const maintenance = parkingSpots.filter((s) => s.status === "maintenance").length;

    res.json({
      spots: parkingSpots,
      stats: {
        total,
        available,
        occupied,
        reserved,
        maintenance,
        occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0,
      },
      logs: activityLogs.slice(0, 10),
    });
  });

  // Toggle or update spot status
  app.post(["/api/slots/:id/toggle", "/api/spots/:id/toggle"], (req, res) => {
    const id = parseInt(req.params.id, 10);
    const spotIndex = parkingSpots.findIndex((s) => s.id === id);

    if (spotIndex === -1) {
      return res.status(404).json({ error: "Spot not found" });
    }

    const spot = parkingSpots[spotIndex];
    if (spot.status === "available") {
      const plate = req.body.licensePlate || RANDOM_PLATES[Math.floor(Math.random() * RANDOM_PLATES.length)];
      spot.status = "occupied";
      spot.licensePlate = plate;
      spot.occupiedSince = "Just now";
      if (spot.type === "ev") spot.evChargingStatus = "charging";

      activityLogs.unshift({
        id: `log-${Date.now()}`,
        text: `Spot ${spot.name} occupied by ${plate}`,
        time: "Just now",
        type: "entry",
      });
    } else if (spot.status === "occupied") {
      const prevPlate = spot.licensePlate;
      spot.status = "available";
      spot.licensePlate = undefined;
      spot.occupiedSince = undefined;
      if (spot.type === "ev") spot.evChargingStatus = "idle";

      activityLogs.unshift({
        id: `log-${Date.now()}`,
        text: `Spot ${spot.name} vacated (${prevPlate || "Vehicle"} departed)`,
        time: "Just now",
        type: "exit",
      });
    } else if (spot.status === "reserved") {
      spot.status = "available";
      activityLogs.unshift({
        id: `log-${Date.now()}`,
        text: `Reservation cancelled for Spot ${spot.name}`,
        time: "Just now",
        type: "exit",
      });
    }

    res.json({ success: true, spot, spots: parkingSpots });
  });

  // Book / Reserve a spot
  app.post(["/book", "/api/book", "/api/slots/:id/book", "/api/book/:id"], (req, res) => {
    const reqId = req.params.id ? parseInt(req.params.id, 10) : req.body.slot_id || (typeof req.body.slot === "number" ? req.body.slot + 1 : undefined);
    
    let targetSpot = parkingSpots.find((s) => s.id === reqId || s.name === req.body.slot_name);
    
    // If no specific spot provided, find first available matching vehicle requirement
    if (!targetSpot) {
      const vehicleType = req.body.vehicleType || "standard";
      const available = parkingSpots.filter((s) => s.status === "available");
      if (vehicleType === "ev") {
        targetSpot = available.find((s) => s.type === "ev") || available[0];
      } else if (vehicleType === "accessible") {
        targetSpot = available.find((s) => s.type === "accessible") || available[0];
      } else if (vehicleType === "compact") {
        targetSpot = available.find((s) => s.type === "compact" || s.type === "standard") || available[0];
      } else {
        targetSpot = available.find((s) => s.type === "standard" || s.type === "compact") || available[0];
      }
    }

    if (!targetSpot || targetSpot.status !== "available") {
      return res.status(400).json({ error: "Selected spot is not available", spots: parkingSpots });
    }

    targetSpot.status = "occupied";
    targetSpot.licensePlate = req.body.licensePlate || RANDOM_PLATES[Math.floor(Math.random() * RANDOM_PLATES.length)];
    targetSpot.occupiedSince = "Just now";
    if (targetSpot.type === "ev") targetSpot.evChargingStatus = "charging";

    activityLogs.unshift({
      id: `log-${Date.now()}`,
      text: `Spot ${targetSpot.name} booked for ${targetSpot.licensePlate}`,
      time: "Just now",
      type: "reserve",
    });

    res.json({
      message: "booked",
      success: true,
      spot: targetSpot,
      spots: parkingSpots,
    });
  });

  // Smart Allocation Recommendation
  app.post(["/api/allocate", "/api/suggest"], (req, res) => {
    const { vehicleType, preference } = req.body;
    let candidates = parkingSpots.filter((s) => s.status === "available");

    if (candidates.length === 0) {
      return res.status(404).json({ error: "No available parking spots found" });
    }

    if (vehicleType === "ev") {
      const evSpots = candidates.filter((s) => s.type === "ev");
      if (evSpots.length > 0) candidates = evSpots;
    } else if (vehicleType === "accessible") {
      const accSpots = candidates.filter((s) => s.type === "accessible");
      if (accSpots.length > 0) candidates = accSpots;
    } else if (vehicleType === "compact") {
      const compSpots = candidates.filter((s) => s.type === "compact");
      if (compSpots.length > 0) candidates = compSpots;
    }

    // Sort by proximity
    if (preference === "nearest_entrance") {
      candidates.sort((a, b) => a.distanceToEntrance - b.distanceToEntrance);
    } else if (preference === "cheapest") {
      candidates.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else {
      candidates.sort((a, b) => a.distanceToEntrance - b.distanceToEntrance);
    }

    const recommended = candidates[0];
    res.json({
      recommended,
      availableCount: candidates.length,
      alternatives: candidates.slice(1, 4),
    });
  });

  // AI Camera / CV Detection Simulation
  app.post(["/upload", "/parking-detect", "/api/upload", "/api/parking-detect"], (req, res) => {
    parkingSpots = parkingSpots.map((spot) => {
      if (spot.status === "maintenance") return spot;
      const isOcc = Math.random() > 0.45;
      return {
        ...spot,
        status: isOcc ? "occupied" : "available",
        licensePlate: isOcc ? (spot.licensePlate || RANDOM_PLATES[Math.floor(Math.random() * RANDOM_PLATES.length)]) : undefined,
        occupiedSince: isOcc ? (spot.occupiedSince || `${Math.floor(Math.random() * 45) + 5} mins ago`) : undefined,
        evChargingStatus: spot.type === "ev" ? (isOcc ? "charging" : "idle") : undefined,
      };
    });

    const available = parkingSpots.filter((s) => s.status === "available");
    activityLogs.unshift({
      id: `log-${Date.now()}`,
      text: `Live vision scan completed: ${available.length} free bays recognized`,
      time: "Just now",
      type: "alert",
    });

    res.json({
      spots: parkingSpots,
      available: available.length,
      detected: [`Bay occupancy refreshed via CCTV feeds`],
      slot: available.length > 0 ? available[0].id - 1 : 0,
    });
  });

  // Reset to initial or all free
  app.post(["/reset", "/api/reset"], (req, res) => {
    parkingSpots = parkingSpots.map((spot) => ({
      ...spot,
      status: "available",
      licensePlate: undefined,
      occupiedSince: undefined,
      evChargingStatus: spot.type === "ev" ? "idle" : undefined,
    }));

    activityLogs.unshift({
      id: `log-${Date.now()}`,
      text: "All parking bays reset to Available",
      time: "Just now",
      type: "alert",
    });

    res.json({ message: "reset", spots: parkingSpots });
  });

  // Vite development middleware or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: 3000 },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
