import React from 'react';
import { 
  ParkingSquare, 
  CheckCircle2, 
  XCircle, 
  Percent, 
  Zap, 
  Accessibility,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function StatsOverview({ stats, spots }) {
  const evAvailable = spots.filter(s => s.type === 'ev' && s.status === 'available').length;
  const evTotal = spots.filter(s => s.type === 'ev').length;
  
  const accessibleAvailable = spots.filter(s => s.type === 'accessible' && s.status === 'available').length;
  const accessibleTotal = spots.filter(s => s.type === 'accessible').length;

  return (
    <div id="stats-overview" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. Available Spaces */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available Bays</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {stats.available}
          </span>
          <span className="text-xs text-slate-400">of {stats.total} total</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
          <span className="text-emerald-400/90 font-medium">Ready for parking</span>
          <span className="font-mono font-semibold">{Math.round((stats.available / (stats.total || 1)) * 100)}%</span>
        </div>
      </div>

      {/* 2. Occupied Spaces */}
      <div className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-rose-500/50 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Occupied Bays</span>
          <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">
            {stats.occupied}
          </span>
          <span className="text-xs text-slate-400">vehicles parked</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
          <span>Turnover active</span>
          <span className="text-rose-400/90 font-mono font-semibold">{stats.occupancyRate}% load</span>
        </div>
      </div>

      {/* 3. Occupancy Load Gauge */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Occupancy Rate</span>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {stats.occupancyRate}%
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            stats.occupancyRate > 80 ? 'bg-rose-500/20 text-rose-300' : stats.occupancyRate > 50 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
          }`}>
            {stats.occupancyRate > 80 ? 'High' : stats.occupancyRate > 50 ? 'Moderate' : 'Optimal'}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              stats.occupancyRate > 80 ? 'bg-rose-500' : stats.occupancyRate > 50 ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${stats.occupancyRate}%` }}
          />
        </div>
      </div>

      {/* 4. Special Zones (EV & Accessible) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-slate-700 transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Specialty Bays</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-slate-950/60 p-2 rounded-xl border border-sky-500/20 flex flex-col">
            <div className="flex items-center gap-1 text-[11px] text-sky-300 font-medium">
              <Zap className="w-3 h-3 text-sky-400" /> EV Free
            </div>
            <span className="text-lg font-bold font-mono text-sky-400 mt-0.5">
              {evAvailable} <span className="text-xs font-normal text-slate-400">/{evTotal}</span>
            </span>
          </div>

          <div className="bg-slate-950/60 p-2 rounded-xl border border-purple-500/20 flex flex-col">
            <div className="flex items-center gap-1 text-[11px] text-purple-300 font-medium">
              <Accessibility className="w-3 h-3 text-purple-400" /> Accessible
            </div>
            <span className="text-lg font-bold font-mono text-purple-400 mt-0.5">
              {accessibleAvailable} <span className="text-xs font-normal text-slate-400">/{accessibleTotal}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
