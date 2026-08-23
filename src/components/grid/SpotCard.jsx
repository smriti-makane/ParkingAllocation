import React from 'react';
import { 
  Car, 
  Zap, 
  Accessibility, 
  Lock, 
  Wrench, 
  BatteryCharging, 
  Clock, 
  Navigation,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';

export default function SpotCard({ spot, onSelect, onQuickToggle, isSelected, isRecommended }) {
  const isAvailable = spot.status === 'available';
  const isOccupied = spot.status === 'occupied';
  const isReserved = spot.status === 'reserved';
  const isMaintenance = spot.status === 'maintenance';

  // Status-based styling
  const getCardTheme = () => {
    if (isMaintenance) {
      return {
        border: 'border-slate-700 hover:border-slate-600',
        bg: 'bg-slate-900/60',
        badgeBg: 'bg-slate-800 text-slate-400 border-slate-700',
        led: 'bg-slate-500 shadow-slate-500/50',
        textAccent: 'text-slate-400',
      };
    }
    if (isReserved) {
      return {
        border: 'border-amber-500/40 hover:border-amber-400',
        bg: 'bg-amber-950/20',
        badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        led: 'bg-amber-400 shadow-amber-400/50 animate-pulse',
        textAccent: 'text-amber-400',
      };
    }
    if (isOccupied) {
      return {
        border: 'border-rose-500/50 hover:border-rose-400',
        bg: 'bg-rose-950/25',
        badgeBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        led: 'bg-rose-500 shadow-rose-500/80 shadow-[0_0_8px_#f43f5e]',
        textAccent: 'text-rose-400',
      };
    }
    // Available
    if (spot.type === 'ev') {
      return {
        border: 'border-sky-500/50 hover:border-sky-400 hover:shadow-sky-500/20',
        bg: 'bg-sky-950/20 hover:bg-sky-950/30',
        badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
        led: 'bg-sky-400 shadow-sky-400/80 shadow-[0_0_8px_#38bdf8]',
        textAccent: 'text-sky-400',
      };
    }
    if (spot.type === 'accessible') {
      return {
        border: 'border-purple-500/50 hover:border-purple-400 hover:shadow-purple-500/20',
        bg: 'bg-purple-950/20 hover:bg-purple-950/30',
        badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        led: 'bg-purple-400 shadow-purple-400/80 shadow-[0_0_8px_#c084fc]',
        textAccent: 'text-purple-400',
      };
    }
    return {
      border: 'border-emerald-500/50 hover:border-emerald-400 hover:shadow-emerald-500/20',
      bg: 'bg-emerald-950/20 hover:bg-emerald-950/30',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      led: 'bg-emerald-400 shadow-emerald-400/80 shadow-[0_0_8px_#34d399]',
      textAccent: 'text-emerald-400',
    };
  };

  const theme = getCardTheme();

  return (
    <div
      id={`spot-card-${spot.name}`}
      onClick={() => onSelect(spot)}
      className={`relative group rounded-xl p-3.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none
        ${theme.bg} ${theme.border}
        ${isSelected ? 'ring-2 ring-white/80 scale-[1.02] shadow-lg' : 'hover:-translate-y-0.5 shadow-sm'}
        ${isRecommended ? 'ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]' : ''}
      `}
    >
      {/* Recommended Tag */}
      {isRecommended && (
        <div className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> Best Match
        </div>
      )}

      {/* Top row: Spot Identifier & Status LED */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${theme.led}`} />
          <span className="font-bold text-base tracking-tight text-white font-mono">
            {spot.name}
          </span>
        </div>

        {/* Spot Type Icon / Tag */}
        <div className="flex items-center gap-1">
          {spot.type === 'ev' && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Zap className="w-3 h-3 text-sky-400" /> EV
            </span>
          )}
          {spot.type === 'accessible' && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Accessibility className="w-3 h-3 text-purple-400" /> Accessible
            </span>
          )}
          {spot.type === 'compact' && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Compact
            </span>
          )}
          {spot.type === 'vip' && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              VIP
            </span>
          )}
        </div>
      </div>

      {/* Center visual: Car silhouette or Open Bay graphics */}
      <div className="my-2 py-3 px-2 rounded-lg bg-slate-950/40 border border-white/5 flex flex-col items-center justify-center min-h-[72px] relative overflow-hidden">
        {/* Bay parking line markers */}
        <div className="absolute inset-y-1 left-1.5 w-0.5 bg-dashed bg-slate-700/60" />
        <div className="absolute inset-y-1 right-1.5 w-0.5 bg-dashed bg-slate-700/60" />

        {isOccupied ? (
          <div className="flex flex-col items-center gap-1 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="relative">
              <Car className="w-8 h-8 text-rose-400" />
              {spot.type === 'ev' && spot.evChargingStatus === 'charging' && (
                <Zap className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
              )}
            </div>
            {spot.licensePlate ? (
              <span className="text-[11px] font-mono font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-slate-200 tracking-wider">
                {spot.licensePlate}
              </span>
            ) : (
              <span className="text-[11px] text-rose-300 font-medium">Occupied</span>
            )}
          </div>
        ) : isReserved ? (
          <div className="flex flex-col items-center gap-1 text-amber-400">
            <Lock className="w-6 h-6 text-amber-400/80" />
            <span className="text-[11px] font-semibold text-amber-300">Reserved</span>
          </div>
        ) : isMaintenance ? (
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <Wrench className="w-6 h-6 text-slate-500" />
            <span className="text-[11px] font-medium text-slate-400">Under Service</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-6 h-6 text-emerald-400/90" />
            <span className="text-xs font-semibold tracking-wide text-emerald-300 uppercase text-[11px]">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Bottom info footer */}
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <Navigation className="w-3 h-3 text-slate-500" />
          <span>{spot.distanceToEntrance}m</span>
        </div>

        {isOccupied && spot.occupiedSince ? (
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{spot.occupiedSince}</span>
          </div>
        ) : (
          <div className="font-semibold text-slate-300">
            ${spot.pricePerHour.toFixed(1)}/hr
          </div>
        )}
      </div>

      {/* Quick Action Overlay on hover */}
      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between gap-1.5 opacity-90 group-hover:opacity-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickToggle(spot);
          }}
          className={`w-full py-1 px-2 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1
            ${isAvailable 
              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30' 
              : isOccupied 
              ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}`}
        >
          {isAvailable ? 'Book Spot' : isOccupied ? 'Release Bay' : 'Inspect'}
        </button>
      </div>
    </div>
  );
}
