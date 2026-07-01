import React from 'react';

export const Resources: React.FC = () => {
  const toolset = [
    { name: "Linux OS Environments", target: "Arch Linux, Garuda, Kali Linux (WSL Layer)" },
    { name: "Mobile Diagnostics & Exploit", target: "mtkclient (MediaTek exploitation), adb engineering tools" },
    { name: "Hardware Integration Platforms", target: "ESP32 microcontrollers, mmWave smart environment telemetry" },
    { name: "Networking Reference Models", target: "CCNA framework paths, EIGRP / OSPF routing protocol structures" },
  ];

  return (
    <div className="pt-24 space-y-12 animate-fade-in font-mono-tactical">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-3xl font-bold border-l-2 border-emerald-500 pl-3 text-white">
          Resource Repository
        </h1>
        <p className="text-slate-400 leading-relaxed">
          A centralized directory documenting our standard operational development platforms, network routing tracks, and low-level deployment dependencies.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Core Technology Matrix</h2>
        <div className="overflow-x-auto border border-slate-900 rounded-lg shadow-xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-xs">
                <th className="py-3 px-4 font-semibold">Classification</th>
                <th className="py-3 px-4 font-semibold">Operational Spectrum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-950/40 text-slate-300">
              {toolset.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                  <td className="py-3 px-4">{item.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
