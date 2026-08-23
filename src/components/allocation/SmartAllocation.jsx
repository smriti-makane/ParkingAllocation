import React, { useState } from 'react';
import { 
  Sparkles, 
  Car, 
  Zap, 
  Accessibility, 
  Truck, 
  DollarSign, 
  Navigation,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function SmartAllocation({ spots, onAllocateAndHighlight, onBookSpot }) {
  const [vehicleType, setVehicleType] = useState('standard');
  const [preference, setPreference] = useState('nearest_entrance');
  const [recommended, setRecommended] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');

  const handleFindOptimal = async () => {
    setIsSearching(true);
    try {
      const res = await fetch('/api/allocate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleType, preference }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommended(data.recommended);
        if (data.recommended && onAllocateAndHighlight) {
          onAllocateAndHighlight(data.recommended.id);
        }
      } else {
        // Fallback local logic
        const available = spots.filter(s => s.status === 'available');
        let matched = available;
        if (vehicleType === 'ev') matched = available.filter(s => s.type === 'ev');
        else if (vehicleType === 'accessible') matched = available.filter(s => s.type === 'accessible');
        else if (vehicleType === 'compact') matched = available.filter(s => s.type === 'compact');

        const pick = matched.length > 0 ? matched[0] : available[0];
        setRecommended(pick || null);
        if (pick && onAllocateAndHighlight) onAllocateAndHighlight(pick.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInstantBook = () => {
    if (!recommended) return;
    onBookSpot(recommended, licensePlate.trim() || undefined);
    setRecommended(null);
    setLicensePlate('');
  };

  return (
    <div id="smart-allocation-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Smart Allocation Engine</h3>
            <p className="text-xs text-slate-400">Auto-match vehicle specifications with optimal vacant bay</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Vehicle Type Options */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            1. Vehicle Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'standard', label: 'Sedan / Standard', icon: Car },
              { id: 'ev', label: 'EV Electric', icon: Zap },
              { id: 'accessible', label: 'Accessible', icon: Accessibility },
              { id: 'compact', label: 'Compact / Small', icon: Truck },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = vehicleType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVehicleType(item.id)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Allocation Priority */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            2. Allocation Preference
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPreference('nearest_entrance')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                preference === 'nearest_entrance'
                  ? 'bg-slate-800 border-emerald-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <div className="font-semibold">Nearest to Entrance</div>
                <div className="text-[10px] text-slate-400">Shortest walking distance</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPreference('cheapest')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                preference === 'cheapest'
                  ? 'bg-slate-800 border-emerald-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <div className="font-semibold">Economical Rate</div>
                <div className="text-[10px] text-slate-400">Lowest $/hour rate</div>
              </div>
            </button>
          </div>
        </div>

        {/* Find Button */}
        <button
          id="find-optimal-spot-btn"
          type="button"
          onClick={handleFindOptimal}
          disabled={isSearching}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className={`w-4 h-4 text-slate-950 ${isSearching ? 'animate-spin' : ''}`} />
          <span>{isSearching ? 'Calculating Optimal Space...' : 'Find Optimal Parking Space'}</span>
        </button>

        {/* Suggested Result Card */}
        {recommended && (
          <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-bold text-sm text-white font-mono">
                  Recommended: Bay {recommended.name}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  {recommended.zone}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                ${recommended.pricePerHour.toFixed(1)}/hr
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-300 flex items-center justify-between">
              <span>{recommended.distanceToEntrance}m from Entrance</span>
              <span className="capitalize">{recommended.type} Bay</span>
            </div>

            {/* Quick input for license plate and 1-click book */}
            <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="License plate (optional)"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleInstantBook}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
