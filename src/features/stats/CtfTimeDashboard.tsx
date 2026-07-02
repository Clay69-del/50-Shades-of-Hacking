import React, { useEffect, useState } from 'react';
import { CtfTimeTeamData, YearRating } from './types';
import { HiTrendingUp, HiGlobeAlt, HiFlag, HiLightningBolt } from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';

// Use the deployment-local proxy path so production can add CTFtime-safe headers.
const PROXY_URL = '/api/ctftime?path=teams/389645';

// Mock data for local development
const mockData: CtfTimeTeamData = {
  id: 389645,
  name: 'PEG_D_SEC_C',
  primary_alias: 'Team Pri5m',
  country: 'NP',
  logo: '',
  aliases: ['50 Shades of Hacking', 'Team Pri5m'],
  academic: false,
  rating: {
    '2026': { rating_points: 61.86, rating_place: 798, organizer_points: 0, country_place: 7 }
  },
  country_standing: {
    country: 'NP',
    teams_listed: 8,
    country_place: 7,
    global_place: 798,
    points: 61.86,
    events: 17,
    next_target: {
      team_name: 'silent signal',
      country_place: 6,
      points_delta: 11.23,
    },
  },
};

const formatPoints = (value: number | undefined) => (value ?? 0).toFixed(2);

export const CtfTimeDashboard: React.FC = () => {
  const [stats, setStats] = useState<CtfTimeTeamData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're running locally (for dev purposes)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
      // Use mock data locally
      setStats(mockData);
      setLoading(false);
      return;
    }

    // Otherwise try the real proxy for production
    fetch(PROXY_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Proxy down');
        return res.json();
      })
      .then((data: CtfTimeTeamData) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving CTFtime metrics:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-900/30 border border-slate-900 p-6 rounded-lg animate-pulse flex items-center justify-center h-32 font-mono-tactical text-xs text-slate-500">
        <span>[SYNCING FROM CTFTIME NODE...]</span>
      </div>
    );
  }

  // Fallback fallback state if endpoint blocks connections or runs out of hits
  if (error || !stats) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-900/30 border border-red-500/20 p-4 rounded-lg font-mono-tactical text-xs text-center text-red-400">
        ⚠️ Failed to pull real-time team stats. Direct link:
        <a href="https://ctftime.org/team/389645" target="_blank" rel="noreferrer" className="underline ml-1 text-emerald-400">
          ctftime.org/team/389645
        </a>
      </div>
    );
  }

  // Dynamically grab current active calendar metrics
  const currentYear = new Date().getFullYear().toString(); // e.g., "2026"
  const currentYearStats = stats.rating[currentYear];
  
  // Check if current year has full rating data or just country_place
  const hasFullRating = currentYearStats && 'rating_points' in currentYearStats;
  const displayName = stats.primary_alias || stats.name;
  const legalName = stats.name && stats.name !== displayName ? stats.name : null;
  const countryStanding = stats.country_standing;
  const countryPlace = countryStanding?.country_place ?? currentYearStats?.country_place;
  const globalPlace = countryStanding?.global_place ?? (hasFullRating ? (currentYearStats as YearRating).rating_place : undefined);
  const ratingPoints = countryStanding?.points ?? (hasFullRating ? (currentYearStats as YearRating).rating_points : undefined);
  const nextTarget = countryStanding?.next_target;

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-950/80 border border-slate-800 rounded-lg font-mono-tactical shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-300 pointer-events-none">
        <FaTrophy className="w-24 h-24" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {stats.logo ? (
            <img src={stats.logo} alt="" className="w-14 h-14 rounded border border-slate-800 object-cover" />
          ) : (
            <div className="w-14 h-14 shrink-0 rounded bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_24px_rgba(52,211,153,0.12)]">
              P5
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
              <span className="uppercase tracking-wider">CTFtime Team #{stats.id}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span>{currentYear} live rating</span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white tracking-wide break-words">{displayName}</h3>
            {legalName && (
              <p className="mt-1 text-[11px] text-slate-500">
                Listed as <span className="text-slate-300">{legalName}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <div className="p-3 bg-slate-900/70 border border-slate-800 rounded">
            <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">
              <HiGlobeAlt className="w-3.5 h-3.5 text-slate-400" />
              <span>Global rank</span>
            </div>
            <p className="text-xl font-bold text-emerald-400">
              {globalPlace ? `#${globalPlace}` : 'N/A'}
            </p>
          </div>

          <div className="p-3 bg-slate-900/70 border border-slate-800 rounded">
            <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">
              <HiFlag className="w-3.5 h-3.5 text-slate-400" />
              <span>{stats.country || 'Country'}</span>
            </div>
            <p className="text-xl font-bold text-emerald-400">
              {countryPlace ? `#${countryPlace}` : 'N/A'}
            </p>
          </div>

          <div className="p-3 bg-slate-900/70 border border-slate-800 rounded">
            <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">
              <HiTrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span>Points</span>
            </div>
            <p className="text-xl font-bold text-emerald-400">
              {formatPoints(ratingPoints)}
            </p>
          </div>

          <div className="p-3 bg-slate-900/70 border border-slate-800 rounded">
            <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] uppercase tracking-wider mb-1.5">
              <HiLightningBolt className="w-3.5 h-3.5 text-slate-400" />
              <span>Events</span>
            </div>
            <p className="text-xl font-bold text-emerald-400">
              {countryStanding?.events ?? 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
          <div className="border border-slate-800 bg-slate-900/40 rounded p-3">
            <p className="text-slate-500 uppercase tracking-wider">Nepal leaderboard</p>
            <p className="mt-1 text-slate-200">
              {countryStanding ? `#${countryStanding.country_place} of ${countryStanding.teams_listed}` : 'Unavailable'}
            </p>
          </div>
          <div className="border border-slate-800 bg-slate-900/40 rounded p-3">
            <p className="text-slate-500 uppercase tracking-wider">Next Nepal target</p>
            <p className="mt-1 text-slate-200">
              {nextTarget ? `${nextTarget.team_name} (#${nextTarget.country_place})` : 'Top Nepal slot'}
            </p>
          </div>
          <div className="border border-slate-800 bg-slate-900/40 rounded p-3">
            <p className="text-slate-500 uppercase tracking-wider">Gap to next</p>
            <p className="mt-1 text-slate-200">
              {nextTarget ? `${formatPoints(nextTarget.points_delta)} pts` : '0.00 pts'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center text-[10px] text-slate-500">
          <span>
            {nextTarget
              ? `Live ${countryStanding?.country || stats.country} ranking from CTFtime country leaderboard`
              : `Country scope: ${stats.country || 'Global'}`}
          </span>
          <a
            href={`https://ctftime.org/team/${stats.id}`}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-500 hover:underline flex items-center space-x-1"
          >
            <span>View Profile Logs</span>
          </a>
        </div>
      </div>
    </div>
  );
};
