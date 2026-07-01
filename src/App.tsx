import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Resources } from './pages/Resources';
import { Writeups } from './pages/Writeups';
import { WriteupViewer } from './pages/WriteupViewer';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
        {/* Fixed Navigation Head */}
        <Navbar />

        {/* Primary Content Target */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/writeups" element={<Writeups />} />
            <Route path="/writeups/:slug" element={<WriteupViewer />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>

        {/* Global Structural Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
