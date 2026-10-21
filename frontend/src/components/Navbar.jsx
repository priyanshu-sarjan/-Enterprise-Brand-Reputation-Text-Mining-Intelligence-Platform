import React from 'react';
import { 
  BarChart3, 
  Layers, 
  Sparkles, 
  Cpu, 
  Database, 
  Sliders, 
  Share2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenTypescale, 
  onOpenLinkedIn,
  onQuickAnalyze
}) {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'topics', label: 'Topic & Root Cause', icon: Layers },
    { id: 'playground', label: 'Live NLP Playground', icon: Sparkles, badge: 'Realtime' },
    { id: 'models', label: 'Model Rigor (ML)', icon: Cpu },
    { id: 'dataset', label: 'Dataset Triage', icon: Database }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Academic Tag */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="font-extrabold text-3xl tracking-tight text-slate-900 font-['Outfit']">
              DSM
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mb-1 group-hover:scale-125 transition-transform" />
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              IIT Roorkee · NPTEL
            </span>
            <span className="text-xs text-slate-500 font-medium hidden xl:inline">
              Business Analytics & Text Mining
            </span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-xs backdrop-blur-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2.5">
          {/* Typescale Design Controller (from UI Screenshot 3) */}
          <button
            onClick={onOpenTypescale}
            title="Design System & Typescale Inspector"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Typescale</span>
          </button>

          {/* LinkedIn Post Kit (Phase 6) */}
          <button
            onClick={onOpenLinkedIn}
            title="LinkedIn Project Showcase & Post Generator"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-[#0A66C2] hover:bg-blue-50/60 hover:border-blue-200 transition-all shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn Kit</span>
          </button>

          {/* Main Action Pill */}
          <button
            onClick={onQuickAnalyze}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>Analyze Text</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
