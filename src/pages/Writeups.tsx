import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllWriteups, WriteupPost } from '../features/writeups/markdownEngine';
import { HiSearch, HiFolderOpen } from 'react-icons/hi';

export const Writeups: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const writeups: WriteupPost[] = useMemo(() => getAllWriteups(), []);

  const categories = ['All', 'Forensics', 'Web', 'Crypto', 'Reverse', 'Networking'];

  // Filter content matching both category selections and search criteria keywords
  const filteredWriteups = writeups.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.metadata.category === activeCategory;
    const matchesSearch = item.metadata.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.metadata.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 space-y-8 animate-fade-in font-mono-tactical">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold border-l-2 border-emerald-500 pl-3 text-white">Database Write-ups</h1>
        <p className="text-slate-400 text-sm">Documented solutions and exploit vectors from past operations.</p>
      </div>

      {/* Control Bar: Filter Buttons & Search Inputs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs rounded border transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <HiSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Query keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Render Results Grid */}
      {filteredWriteups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWriteups.map((post) => (
            <Link
              key={post.slug}
              to={`/writeups/${post.slug}`}
              className="group block bg-slate-900/40 border border-slate-900 hover:border-emerald-500/20 rounded-lg p-6 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 border border-slate-800 rounded">
                    {post.metadata.category}
                  </span>
                  <span className="text-slate-500">{post.metadata.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  {post.metadata.title}
                </h3>
                <div className="flex justify-between items-center pt-2 text-[11px] text-slate-500 border-t border-slate-950">
                  <span>Op: {post.metadata.author}</span>
                  <span className={
                    post.metadata.difficulty === 'Hard' ? 'text-red-400' :
                    post.metadata.difficulty === 'Medium' ? 'text-amber-400' : 'text-emerald-500'
                  }>
                    [{post.metadata.difficulty}]
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-900 rounded-lg flex flex-col items-center justify-center space-y-2">
          <HiFolderOpen className="w-8 h-8 opacity-40" />
          <p className="text-sm">No operational records match criteria index queries.</p>
        </div>
      )}
    </div>
  );
};
