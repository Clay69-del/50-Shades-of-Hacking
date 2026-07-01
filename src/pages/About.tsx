import React from 'react';
import { MemberCard, MemberProps } from '../components/MemberCard';

export const About: React.FC = () => {
  const teamMembers: MemberProps[] = [
    {
      name: "Yogendra Badu",
      role: "Training & Academic Coordinator",
      specialties: ["Network Pentesting", "Web Development", "Digital Forensics"],
      certifications: ["eJPT", "APISec ACP"],
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
    },
    // Add additional teammates here following the profile interface structure
  ];

  return (
    <div className="pt-24 space-y-12 animate-fade-in">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-3xl font-bold font-mono-tactical border-l-2 border-emerald-500 pl-3 text-white">
          Mission Parameter
        </h1>
        <p className="font-mono-tactical text-slate-400 leading-relaxed">
          Team Pri5m operates as a collaborative collective dedicated to identifying infrastructural flaws, running advanced cyber defense exercises, and producing comprehensive technical write-ups. We balance offensive methodologies with empirical forensics tracking to protect modern software stacks.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold font-mono-tactical text-white">
          Active Operator Manifest
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};
