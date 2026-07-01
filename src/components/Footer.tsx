import React from 'react';
import { FaGithub, FaDiscord, FaTrophy } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-auto font-mono-tactical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Team Pri5m. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="https://ctftime.org/team/389645" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaTrophy className="h-5 w-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaGithub className="h-5 w-5" />
          </a>
          <a href="https://discord.gg" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaDiscord className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
