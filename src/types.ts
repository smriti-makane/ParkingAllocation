export interface ParkingSpot {
  id: number;
  name: string;
  zone: string;
  floor: string;
  type: "standard" | "ev" | "accessible" | "compact" | "vip" | "maintenance";
  status: "available" | "occupied" | "reserved" | "maintenance";
  distanceToEntrance: number;
  occupiedSince?: string;
  licensePlate?: string;
  evChargingStatus?: "idle" | "charging" | "complete";
  sensorBattery?: number;
  pricePerHour: number;
}

export interface ParkingStats {
  total: number;
  available: number;
  occupied: number;
  reserved: number;
  maintenance: number;
  occupancyRate: number;
}

export interface ActivityLog {
  id: string;
  text: string;
  time: string;
  type: "entry" | "exit" | "reserve" | "alert";
}
