import React, { useState, useMemo } from 'react';
import SpotCard from './SpotCard';
import { 
  Filter, 
  Search, 
  Layers, 
  Zap, 
  Accessibility, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Wrench,
  Sparkles,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export default function ParkingGrid({ 
  spots, 
  onSelectSpot, 
  onToggleSpot, 
  selectedSpot, 
  recommendedSpotId,
  onRefresh,
  isLoading
}) {
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const zones = ['ALL', 'Zone A', 'Zone B', 'Zone C', 'Zone D'];

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      // Zone match
      if (zoneFilter !== 'ALL' && spot.zone !== zoneFilter) return false;
      // Status match
      if (statusFilter !== 'ALL' && spot.status !== statusFilter) return false;
      // Type match
      if (typeFilter !== 'ALL' && spot.type !== typeFilter) return false;
      // Search query (matches spot name, zone, or license plate)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = spot.name.toLowerCase().includes(q);
        const matchesZone = spot.zone.toLowerCase().includes(q);
        const matchesPlate = spot.licensePlate?.toLowerCase().includes(q);
        if (!matchesName && !matchesZone && !matchesPlate) return false;
      }
      return true;
    });
  }, [spots, zoneFilter, statusFilter, typeFilter, searchQuery]);

  const countAvailable = filteredSpots.filter((s) => s.status === 'available').length;
  const countOccupied = filteredSpots.filter((s) => s.status === 'occupied').length;

  return (
    <div id="parking-grid-section" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              Live Parking Bay Grid
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {countAvailable} Available / {filteredSpots.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time optical & sensor status across all parking zones. Click any bay to inspect or reserve.
          </p>
        </div>

        {/* Search bar & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bay ID or plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-700 text-sm text-white placeholder-slate-500 rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center disabled:opacity-50"
            title="Refresh slot telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Quick Type Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-800/80">
        {/* Zone Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setZoneFilter(zone)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                zoneFilter === zone
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Type and Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Dropdown/Chips */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950/80 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="available">🟢 Available Only</option>
            <option value="occupied">🔴 Occupied Only</option>
            <option value="reserved">🟡 Reserved</option>
            <option value="maintenance">⚪ Maintenance</option>
          </select>

          {/* Type Dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950/80 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Bay Types</option>
            <option value="standard">Standard Bays</option>
            <option value="ev">⚡ EV Fast Charging</option>
            <option value="accessible">♿ Accessible</option>
            <option value="compact">Compact Cars</option>
            <option value="vip">⭐ VIP Reserved</option>
          </select>
        </div>
      </div>

      {/* Color Code Status Legend */}
      <div className="py-3 px-3.5 my-3 bg-slate-950/50 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>Status Key:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="text-slate-300 font-medium">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span className="text-slate-300 font-medium">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-slate-300 font-medium">EV Station (Available)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
            <span className="text-slate-300 font-medium">Accessible (Available)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#facc15]" />
            <span className="text-slate-300 font-medium">Reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span className="text-slate-300 font-medium">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Grid of Spots */}
      {filteredSpots.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-slate-950/30 rounded-xl border border-dashed border-slate-800">
          <Layers className="w-10 h-10 mx-auto text-slate-600 mb-2" />
          <p className="font-semibold text-base text-slate-300">No parking spots match your filter criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting your filters or search terms.</p>
          <button
            onClick={() => {
              setZoneFilter('ALL');
              setStatusFilter('ALL');
              setTypeFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-4 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 pt-2">
          {filteredSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              onSelect={onSelectSpot}
              onQuickToggle={onToggleSpot}
              isSelected={selectedSpot?.id === spot.id}
              isRecommended={recommendedSpotId === spot.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
