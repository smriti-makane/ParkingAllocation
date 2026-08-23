import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/dashboard/Header';
import StatsOverview from './components/dashboard/StatsOverview';
import ParkingGrid from './components/grid/ParkingGrid';
import SpotDetailsModal from './components/details/SpotDetailsModal';
import SmartAllocation from './components/allocation/SmartAllocation';
import LiveFeedPanel from './components/camera/LiveFeedPanel';
import ActivityLogPanel from './components/logs/ActivityLogPanel';

export default function App() {
  const [spots, setSpots] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0,
    reserved: 0,
    maintenance: 0,
    occupancyRate: 0,
  });
  const [logs, setLogs] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [recommendedSpotId, setRecommendedSpotId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Fetch spots & stats from backend
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/slots');
      if (res.ok) {
        const data = await res.json();
        if (data.spots) {
          setSpots(data.spots);
          setStats(data.stats);
          if (data.logs) setLogs(data.logs);
        } else if (Array.isArray(data)) {
          // Compatibility if plain array returned
          setSpots(data);
          const total = data.length;
          const available = data.filter((s) => s.status === 'available' || s.status === 'free').length;
          const occupied = total - available;
          setStats({
            total,
            available,
            occupied,
            reserved: 0,
            maintenance: 0,
            occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0,
          });
        }
      }
    } catch (err) {
      console.error('Error loading parking data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Quick toggle between available / occupied
  const handleToggleSpot = async (spot) => {
    try {
      const res = await fetch(`/api/slots/${spot.id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  // Specific booking
  const handleBookSpot = async (spot, licensePlate) => {
    try {
      const res = await fetch(`/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot_id: spot.id, licensePlate }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  // Trigger CV detection scan
  const handleSimulateDetection = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/parking-detect', { method: 'POST' });
      if (res.ok) {
        await fetchDashboardData();
      }
    } catch (err) {
      console.error('Detection error:', err);
    } finally {
      setTimeout(() => setIsScanning(false), 800);
    }
  };

  // Reset all spots to free
  const handleResetAll = async () => {
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        setRecommendedSpotId(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  const handleAllocateAndHighlight = (spotId) => {
    setRecommendedSpotId(spotId);
    const target = spots.find(s => s.id === spotId);
    if (target) {
      // Scroll to grid smoothly
      const el = document.getElementById(`spot-card-${target.name}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header
        onSimulateDetection={handleSimulateDetection}
        onResetAll={handleResetAll}
        isScanning={isScanning}
        totalSpots={stats.total}
        availableSpots={stats.available}
      />

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI / Capacity Overview Cards */}
        <StatsOverview stats={stats} spots={spots} />

        {/* Primary Parking Spot Grid with Status-Color-Coding */}
        <ParkingGrid
          spots={spots}
          onSelectSpot={(spot) => setSelectedSpot(spot)}
          onToggleSpot={handleToggleSpot}
          selectedSpot={selectedSpot}
          recommendedSpotId={recommendedSpotId}
          onRefresh={fetchDashboardData}
          isLoading={isLoading}
        />

        {/* Lower Two-Column Section: Smart Allocation Engine & Live Camera Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Smart Allocation Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SmartAllocation
              spots={spots}
              onAllocateAndHighlight={handleAllocateAndHighlight}
              onBookSpot={handleBookSpot}
            />
            <ActivityLogPanel logs={logs} />
          </div>

          {/* Optical Surveillance & Feeds (7 cols) */}
          <div className="lg:col-span-7">
            <LiveFeedPanel
              onScan={handleSimulateDetection}
              isScanning={isScanning}
            />
          </div>
        </div>
      </main>

      {/* Spot Inspection & Details Modal */}
      {selectedSpot && (
        <SpotDetailsModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
          onToggleSpot={handleToggleSpot}
          onBookSpot={handleBookSpot}
        />
      )}
    </div>
  );
}
