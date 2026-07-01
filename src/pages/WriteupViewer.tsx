import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getAllWriteups } from '../features/writeups/markdownEngine';
import { HiArrowLeft } from 'react-icons/hi';

export const WriteupViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const writeup = useMemo(() => {
    const all = getAllWriteups();
    return all.find((item) => item.slug === slug);
  }, [slug]);

  if (!writeup) {
    return (
      <div className="pt-24 text-center space-y-4 font-mono-tactical">
        <p className="text-red-400 font-bold">404: Operational Record Segment Not Found</p>
        <Link to="/writeups" className="text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-center space-x-1">
          <HiArrowLeft className="w-3 h-3" /> <span>Return to index</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-3xl mx-auto space-y-6 animate-fade-in font-mono-tactical">
      <Link to="/writeups" className="inline-flex items-center space-x-2 text-xs text-slate-500 hover:text-emerald-400 transition-colors">
        <HiArrowLeft className="w-4 h-4" />
        <span>Return to directory logs</span>
      </Link>

      <header className="border-b border-slate-900 pb-6 space-y-3">
        <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
          {writeup.metadata.category}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white pt-2">
          {writeup.metadata.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
          <p>Author: <span className="text-slate-300">{writeup.metadata.author}</span></p>
          <p>|</p>
          <p>Logged: <span className="text-slate-300">{writeup.metadata.date}</span></p>
          <p>|</p>
          <p>Difficulty: <span className="text-slate-300">[{writeup.metadata.difficulty}]</span></p>
        </div>
      </header>

      {/* Styled Markdown Viewport */}
      <article className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed tracking-wide space-y-4
        prose-headings:text-white prose-headings:font-bold prose-h2:text-xl prose-h2:border-b prose-h2:border-slate-900 prose-h2:pb-2
        prose-a:text-emerald-400 hover:prose-a:underline
        prose-code:text-emerald-300 prose-code:bg-slate-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
        prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto">
        <ReactMarkdown>{writeup.body}</ReactMarkdown>
      </article>
    </div>
  );
};
