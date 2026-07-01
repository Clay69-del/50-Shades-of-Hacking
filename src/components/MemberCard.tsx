import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export interface MemberProps {
  name: string;
  role: string;
  specialties: string[];
  certifications?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
}

export const MemberCard: React.FC<MemberProps> = ({
  name,
  role,
  specialties,
  certifications,
  githubUrl,
  linkedinUrl,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-900 rounded-lg p-6 flex flex-col justify-between font-mono-tactical hover:border-emerald-500/20 transition-all duration-300 shadow-lg">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">{name}</h3>
          <p className="text-xs text-emerald-400 uppercase tracking-wider">{role}</p>
        </div>

        {/* Specialties Tags */}
        <div className="flex flex-wrap gap-2">
          {specialties.map((spec) => (
            <span key={spec} className="text-xs px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-800 rounded">
              {spec}
            </span>
          ))}
        </div>

        {/* Certifications Block */}
        {certifications && certifications.length > 0 && (
          <div className="pt-2 border-t border-slate-950 space-y-1">
            <p className="text-[10px] uppercase text-slate-500 tracking-wider">Verified Certs</p>
            <div className="flex flex-wrap gap-1">
              {certifications.map((cert) => (
                <span key={cert} className="text-[11px] font-bold text-slate-300">
                  [{cert}]
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profiles Anchor links */}
      <div className="flex space-x-4 pt-6 mt-4 border-t border-slate-950/40 text-slate-400">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaGithub className="w-4 h-4" />
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaLinkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
