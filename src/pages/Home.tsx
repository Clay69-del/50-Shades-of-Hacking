import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiTerminal } from 'react-icons/hi';
import { FaMicrochip } from 'react-icons/fa';
import { CtfTimeDashboard } from '../features/stats/CtfTimeDashboard';

export const Home: React.FC = () => {
  return (
    <div className="pt-24 space-y-16 animate-fade-in">
      {/* Hero / Terminal Section */}
      <section className="text-center max-w-3xl mx-auto py-12 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono-tactical">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Node Active // Batch-37 SEC-B Connection Secure</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-mono-tactical">
          Team <span className="text-emerald-400">Pri5m</span>
        </h1>
        <p className="text-xl font-mono-tactical text-slate-400 max-w-2xl mx-auto">
          50 Shades of Hacking. A technical collective specialized in offensive security, digital forensics, and infrastructure assessments.
        </p>
        
        <div className="py-4">
          <CtfTimeDashboard />
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4 font-mono-tactical">
          <Link
            to="/writeups"
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            <span>Decrypt Write-ups</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-6 py-3 rounded-md transition-colors"
          >
            <span>Analyze Team Profiles</span>
          </Link>
        </div>
      </section>

      <hr className="border-slate-900" />

      {/* Core Domains Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-mono-tactical border-l-2 border-emerald-500 pl-3">
          Operational Core Domains
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono-tactical">
          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-lg space-y-3">
            <HiTerminal className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Offensive Engineering</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Active engagement in penetration testing, exploit development, and specialized web architecture assessments.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-lg space-y-3">
            <HiShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Digital Forensics</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Deep-dive file system analysis, cryptographic parsing, mobile kernel tracking, and digital artifact recovery.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-lg space-y-3">
            <FaMicrochip className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Hardware &amp; IoT Security</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Analyzing low-level infrastructure via microcontrollers, firmware unpacking, and custom low-level client tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
