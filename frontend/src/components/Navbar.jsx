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
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E8E7E2]/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Academic Tag */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="font-extrabold text-3xl tracking-tight text-[#121826] font-['Outfit']">
              DSM
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] mb-1 group-hover:scale-125 transition-transform" />
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#E2E8F0]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              IIT Roorkee · NPTEL
            </span>
            <span className="text-xs text-[#64748B] font-medium hidden xl:inline">
              Business Analytics & Text Mining
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-[#E8E7E2] shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#121826] text-white shadow-sm' 
                    : 'text-[#475569] hover:text-[#121826] hover:bg-[#F1F5F9]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F97316]' : 'text-[#64748B]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#F97316] text-white' : 'bg-[#EFF6FF] text-[#2563EB]'
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E2E8F0] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="hidden sm:inline">Typescale</span>
          </button>

          {/* LinkedIn Post Kit (Phase 6) */}
          <button
            onClick={onOpenLinkedIn}
            title="LinkedIn Project Showcase & Post Generator"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0A66C2] hover:bg-[#F0F7FF] hover:border-[#93C5FD] transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn Kit</span>
          </button>

          {/* Main Action Pill */}
          <button
            onClick={onQuickAnalyze}
            className="btn-pill-primary flex items-center gap-2 text-sm !py-2.5 !px-5"
          >
            <span>Analyze Text</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
