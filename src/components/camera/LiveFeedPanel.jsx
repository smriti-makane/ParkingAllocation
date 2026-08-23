import React, { useState } from 'react';
import { Camera, Radio, Eye, RefreshCw, Maximize2, Sparkles, ShieldCheck } from 'lucide-react';

export default function LiveFeedPanel({ onScan, isScanning }) {
  const [selectedCam, setSelectedCam] = useState('CAM-01');

  const cameras = [
    { id: 'CAM-01', name: 'Main Entrance & Gate A', status: 'Live', fps: '30 FPS', resolution: '4K HD', zone: 'Zone A', detectedVehicles: 2 },
    { id: 'CAM-02', name: 'Central Bay & EV Hub', status: 'Live', fps: '28 FPS', resolution: '1080p', zone: 'Zone B', detectedVehicles: 4 },
    { id: 'CAM-03', name: 'North Wing Aisles', status: 'Live', fps: '30 FPS', resolution: '1080p', zone: 'Zone C', detectedVehicles: 3 },
    { id: 'CAM-04', name: 'East Wing Exit Lane', status: 'Live', fps: '29 FPS', resolution: '1080p', zone: 'Zone D', detectedVehicles: 1 },
  ];

  const currentCam = cameras.find(c => c.id === selectedCam) || cameras[0];

  return (
    <div id="live-camera-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Optical Vision Feeds (CCTV)
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                AI Inference Online
              </span>
            </h3>
            <p className="text-xs text-slate-400">Live bay occupancy detection via multi-angle surveillance feeds</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onScan}
          disabled={isScanning}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-sky-400' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Trigger CV Pass'}</span>
        </button>
      </div>

      {/* Main Camera Viewfinder */}
      <div className="mt-4 relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-3.5 select-none">
        {/* Simulated Camera Feed Overlay with scanning beam */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
        
        {/* Subtle grid lines simulating parking lanes */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Dynamic Scanning Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-[bounce_1.5s_infinite] pointer-events-none" />
        )}

        {/* Bounding boxes (Simulated Computer Vision Detection Overlays) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-20 border-2 border-emerald-400/80 bg-emerald-500/10 rounded flex flex-col justify-between p-1 pointer-events-none">
          <span className="text-[9px] font-mono font-bold bg-emerald-500 text-slate-950 px-1 py-0.2 rounded w-max">
            BAY VACANT (98%)
          </span>
          <span className="text-[8px] font-mono text-emerald-300 self-end">A-01</span>
        </div>

        <div className="absolute top-1/3 right-1/4 w-36 h-24 border-2 border-rose-500/80 bg-rose-500/10 rounded flex flex-col justify-between p-1 pointer-events-none">
          <span className="text-[9px] font-mono font-bold bg-rose-500 text-white px-1 py-0.2 rounded w-max">
            VEHICLE: CA-78X9
          </span>
          <span className="text-[8px] font-mono text-rose-300 self-end">A-02 (OCCUPIED)</span>
        </div>

        {/* Top Camera Metadata */}
        <div className="relative z-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-rose-600/90 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE
            </span>
            <span className="font-mono text-slate-200 font-semibold">{currentCam.name}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            <span>{currentCam.resolution}</span>
            <span>•</span>
            <span className="text-emerald-400">{currentCam.fps}</span>
          </div>
        </div>

        {/* Center Crosshair */}
        <div className="relative z-10 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Bottom Camera Metadata */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Vehicles tracked in frame: <strong className="text-white">{currentCam.detectedVehicles}</strong></span>
          </div>
          <div className="font-mono text-slate-400">
            LOC: {currentCam.zone} • SENSOR SYNCED
          </div>
        </div>
      </div>

      {/* Camera Selection Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        {cameras.map((cam) => {
          const isSelected = selectedCam === cam.id;
          return (
            <button
              key={cam.id}
              type="button"
              onClick={() => setSelectedCam(cam.id)}
              className={`p-2 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-sky-500/15 border-sky-500/50 text-white shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="font-bold font-mono text-sky-400">{cam.id}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] font-medium truncate">{cam.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
