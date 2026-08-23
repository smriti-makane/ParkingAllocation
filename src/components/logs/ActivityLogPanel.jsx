import React from 'react';
import { History, ArrowDownLeft, ArrowUpRight, ShieldCheck, AlertCircle, Bookmark } from 'lucide-react';

export default function ActivityLogPanel({ logs }) {
  return (
    <div id="activity-log-panel" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Activity Log</h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Real-time Stream</span>
      </div>

      <div className="mt-3 space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
        {logs.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No recent activity logged yet.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">
                  {log.type === 'entry' ? (
                    <div className="w-5 h-5 rounded-md bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <ArrowDownLeft className="w-3 h-3" />
                    </div>
                  ) : log.type === 'exit' ? (
                    <div className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  ) : log.type === 'reserve' ? (
                    <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Bookmark className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-slate-200">{log.text}</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{log.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
