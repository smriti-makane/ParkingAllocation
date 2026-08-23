import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Zap, 
  Accessibility, 
  Battery, 
  Navigation, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Wrench,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function SpotDetailsModal({ spot, onClose, onToggleSpot, onBookSpot }) {
  const [customPlate, setCustomPlate] = useState('');
  const [durationHours, setDurationHours] = useState(2);

  if (!spot) return null;

  const isAvailable = spot.status === 'available';
  const isOccupied = spot.status === 'occupied';
  const isReserved = spot.status === 'reserved';
  const isMaintenance = spot.status === 'maintenance';

  const totalPrice = (spot.pricePerHour * durationHours).toFixed(2);

  const handleBook = () => {
    onBookSpot(spot, customPlate.trim() || undefined);
    onClose();
  };

  const handleToggle = () => {
    onToggleSpot(spot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="spot-details-modal"
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${
              isAvailable ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' :
              isOccupied ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' :
              isReserved ? 'bg-amber-400 shadow-[0_0_10px_#facc15]' :
              'bg-slate-500'
            }`} />
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                Bay {spot.name}
                <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {spot.zone} • {spot.floor}
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Visual Status Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isAvailable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
            isOccupied ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
            isReserved ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
            'bg-slate-800/40 border-slate-700 text-slate-400'
          }`}>
            <div className="flex items-center gap-3">
              {isAvailable ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> :
               isOccupied ? <Car className="w-6 h-6 text-rose-400" /> :
               isReserved ? <Lock className="w-6 h-6 text-amber-400" /> :
               <Wrench className="w-6 h-6 text-slate-400" />}
              <div>
                <div className="font-bold text-sm uppercase tracking-wider">
                  {spot.status}
                </div>
                <div className="text-xs opacity-80">
                  {isAvailable ? 'Ready for immediate parking' :
                   isOccupied ? (spot.licensePlate ? `Occupied by ${spot.licensePlate}` : 'Vehicle currently parked') :
                   isReserved ? 'Reserved by customer' : 'Temporarily unavailable'}
                </div>
              </div>
            </div>

            {spot.occupiedSince && (
              <div className="text-right">
                <div className="text-[11px] opacity-70">Duration</div>
                <div className="text-xs font-semibold font-mono">{spot.occupiedSince}</div>
              </div>
            )}
          </div>

          {/* Technical Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-500" /> Bay Type
              </div>
              <div className="font-bold text-white capitalize flex items-center gap-1.5">
                {spot.type === 'ev' && <Zap className="w-3.5 h-3.5 text-sky-400" />}
                {spot.type === 'accessible' && <Accessibility className="w-3.5 h-3.5 text-purple-400" />}
                {spot.type}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-slate-500" /> Entrance Distance
              </div>
              <div className="font-bold text-white font-mono">
                {spot.distanceToEntrance} meters
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" /> Hourly Rate
              </div>
              <div className="font-bold text-white font-mono text-emerald-400">
                ${spot.pricePerHour.toFixed(2)}/hr
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-slate-500" /> IoT Sensor
              </div>
              <div className="font-bold text-white font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {spot.sensorBattery || 95}% Battery
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 col-span-2">
              <div className="text-slate-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Restrictions
              </div>
              <div className="text-slate-300 font-medium">
                {spot.type === 'ev' ? 'Electric Vehicles only (charging must be active)' :
                 spot.type === 'accessible' ? 'Valid handicap permit required' :
                 spot.type === 'compact' ? 'Vehicles under 4.5m length' :
                 'Standard vehicles allowed'}
              </div>
            </div>
          </div>

          {/* If Available: Booking Form */}
          {isAvailable && (
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Space Reservation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">
                    License Plate (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., CA-9824"
                    value={customPlate}
                    onChange={(e) => setCustomPlate(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">
                    Estimated Duration
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={1}>1 Hour (${(spot.pricePerHour * 1).toFixed(2)})</option>
                    <option value={2}>2 Hours (${(spot.pricePerHour * 2).toFixed(2)})</option>
                    <option value={4}>4 Hours (${(spot.pricePerHour * 4).toFixed(2)})</option>
                    <option value={8}>8 Hours / Full Day (${(spot.pricePerHour * 8).toFixed(2)})</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {isAvailable ? (
              <button
                type="button"
                onClick={handleBook}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                Reserve Space (${totalPrice})
              </button>
            ) : isOccupied ? (
              <button
                type="button"
                onClick={handleToggle}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950 transition-all flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                Release & Mark Available
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggle}
                className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-all"
              >
                Toggle Status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
