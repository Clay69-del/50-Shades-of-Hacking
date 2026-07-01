import React from 'react';
// import { useEffect, useState } from 'react';
// import { CtfTimeTeamData } from './types';
import { HiTrendingUp, HiGlobeAlt } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';

// TODO: Uncomment and update with working CTFtime API proxy
// const PROXY_URL = 'https://your-working-proxy.workers.dev';

export const CtfTimeDashboard: React.FC = () => {
  // TODO: Uncomment this when working proxy is available
  // const [stats, setStats] = useState<CtfTimeTeamData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);

  // useEffect(() => {
  //   fetch(PROXY_URL)
  //     .then((res) => {
  //       if (!res.ok) throw new Error('Proxy down');
  //       return res.json();
  //     })
  //     .then((data: CtfTimeTeamData) => {
  //       setStats(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error retrieving CTFtime metrics:", err);
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="w-full max-w-md mx-auto bg-slate-900/30 border border-slate-900 p-6 rounded-lg animate-pulse flex items-center justify-center h-32 font-mono-tactical text-xs text-slate-500">
  //       <span>[SYNCING FROM CTFTIME NODE...]</span>
  //     </div>
  //   );
  // }

  // Fallback state - showing static info
  return (
    <div className="w-full max-w-md mx-auto bg-slate-900/40 border border-slate-900 rounded-lg p-6 font-mono-tactical shadow-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
      <div className="absolute top-0 right-0 p-3 opacity-10 text-slate-400 pointer-events-none">
        <FaTrophy className="w-20 h-20" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold">
          P5
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-wide">Team Pri5m</h3>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider">
            CTFtime Team ID: #389645
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 bg-slate-950/60 border border-slate-900 rounded">
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
            <HiGlobeAlt className="w-3.5 h-3.5 text-slate-400" />
            <span>Rank</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">
            Coming Soon
          </p>
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-900 rounded">
          <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
            <HiTrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span>Total Points</span>
          </div>
          <p className="text-xl font-bold text-emerald-400">
            Coming Soon
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-950/60 flex justify-between items-center text-[10px] text-slate-500">
        <span>Country Scope: Global</span>
        <a 
          href="https://ctftime.org/team/389645"
          target="_blank"
          rel="noreferrer"
          className="text-emerald-500 hover:underline flex items-center space-x-1"
        >
          <span>View Profile</span>
        </a>
      </div>
    </div>
  );
};
