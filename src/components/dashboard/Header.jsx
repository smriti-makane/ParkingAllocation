import React, { useState, useEffect } from 'react';
import { 
  ParkingCircle, 
  RefreshCw, 
  RotateCcw, 
  Radio, 
  ShieldCheck, 
  Clock,
  Sparkles,
  Camera
} from 'lucide-react';

export default function Header({ 
  onSimulateDetection, 
  onResetAll, 
  isScanning, 
  totalSpots, 
  availableSpots 
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & System Status */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-xl">
            <ParkingCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                ParkyourLot
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Smart Allocation
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Radio className="w-3 h-3" /> Live Sensors Active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                {timeStr || '12:00:00 PM'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Summary Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Available:</span>
            <span className="font-bold font-mono text-emerald-400">{availableSpots}</span>
            <span className="text-slate-600">/</span>
            <span className="font-bold font-mono text-slate-300">{totalSpots}</span>
          </div>

          {/* Simulate CV / Camera Detection Button */}
          <button
            id="simulate-detection-btn"
            onClick={onSimulateDetection}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <Camera className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Feeds...' : 'Simulate Vision Scan'}</span>
          </button>

          {/* Reset System */}
          <button
            id="reset-slots-btn"
            onClick={onResetAll}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition-colors flex items-center gap-1.5 active:scale-95"
            title="Reset all bays to free"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Reset All</span>
          </button>
        </div>
      </div>
    </header>
  );
}
