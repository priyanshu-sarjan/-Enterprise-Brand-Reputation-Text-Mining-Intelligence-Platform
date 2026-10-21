import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  Cpu, 
  Terminal,
  Activity,
  CheckCircle2,
  Command
} from 'lucide-react';

export default function HeroSection({ 
  onSelectPreset, 
  onSearch, 
  kpis 
}) {
  const [searchInput, setSearchInput] = useState('');

  const quickPresets = [
    {
      label: '🚨 High Churn Refund Risk',
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
      text: 'The battery completely died after two days. Customer service hung up on me and refused my refund. Total scam and fraud!'
    },
    {
      label: '🔋 Battery Degradation',
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
      text: 'Battery drains within 2 hours of use and gets boiling hot when charging overnight. Very disappointing.'
    },
    {
      label: '🎧 5-Star Audiophile Praise',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      text: 'Superb noise cancellation and crystal clear audio fidelity! Battery lasts an entire week. Best purchase this year.'
    },
    {
      label: '📦 Crushed Packaging',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      text: 'The shipment box arrived torn and crushed. The manufacturer seal was broken and charging cable is missing.'
    },
    {
      label: '⚖️ Negation Nuance ("Not bad")',
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      text: 'Not bad at all, actually surprisingly good audio fidelity and build quality for the price bracket.'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectPreset(searchInput.trim());
    }
  };

  return (
    <section className="relative pt-8 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Layout (Aesthetic reproducing Screenshot 1, 4 & 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Search, and Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Introducing Enterprise Text Mining Intelligence</span>
            </div>

            {/* Giant Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#121826] tracking-tight leading-[1.12] font-['Outfit']">
              Mine customer voice, <br className="hidden sm:inline" />
              prevent churn{' '}
              <span className="relative inline-block text-[#2563EB]">
                faster.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C50 2 150 2 199 5.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-[#64748B] max-w-xl font-normal leading-relaxed">
              A production-ready NLP intelligence platform combining 
              <strong className="text-[#1E293B] font-semibold"> TF-IDF n-grams</strong>, 
              <strong className="text-[#1E293B] font-semibold"> L2 Logistic Classifiers</strong>, and 
              <strong className="text-[#1E293B] font-semibold"> Gensim LDA Topic Modeling</strong> to triage critical churn risks before financial quarter closes.
            </p>

            {/* Search / Text Input Bar (directly matching Screenshot 1) */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <div className="relative flex items-center shadow-lg rounded-full bg-white border border-[#E2E8F0] p-1.5 focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10 transition-all">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Paste a customer review or enter root cause keyword..."
                  className="w-full px-5 py-3 text-sm text-[#1E293B] bg-transparent outline-none placeholder:text-[#94A3B8]"
                />
                <button
                  type="submit"
                  className="w-12 h-12 flex-shrink-0 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center text-white shadow-md transition-all hover:scale-105 active:scale-95"
                  title="Run Real-time Text Mining Analysis"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Quick Presets Pills */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Test Live Scenarios:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectPreset(preset.text)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${preset.color}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Bauhaus Visual Composition (Inspired by Screenshot 1, 2, 4 & 5) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Canvas Container */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Giant Circular Green Portrait Background (Screenshot 1) */}
              <div className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full bg-[#10B981] flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Decorative Pattern inside circle */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:16px_16px]" />
                
                {/* Central Thumbs-up / Analyst Graphic Card */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl mb-3 shadow-inner">
                    👍
                  </div>
                  <span className="font-extrabold text-xl font-['Outfit']">94.2% Precision</span>
                  <span className="text-xs text-white/90 font-medium">L2 Regularized Model</span>
                </div>
              </div>

              {/* Yellow Speech Bubble Badge (Screenshot 1 top-left) */}
              <div className="absolute -top-3 -left-2 z-20 bg-[#F59E0B] w-24 h-16 rounded-2xl rounded-bl-sm shadow-xl flex flex-col justify-center px-4 space-y-1.5 animate-float">
                <div className="w-12 h-2 bg-[#121826] rounded-full" />
                <div className="w-8 h-2 bg-[#121826] rounded-full" />
              </div>

              {/* Tangerine Circle with Arrow (Screenshot 1 right side) */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer">
                <ArrowRight className="w-7 h-7" />
              </div>

              {/* Purple Quadrant Shape (Screenshot 3 & 6) */}
              <div className="absolute -bottom-4 left-6 z-10 w-16 h-16 bg-[#8B5CF6] rounded-tl-[64px] shadow-lg opacity-90" />

              {/* Connected Command Node Floating Card (Screenshot 4 & 5) */}
              <div className="absolute -bottom-8 -right-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E2E8F0] shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  <Command className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Triage Engine</div>
                  <div className="text-sm font-extrabold text-[#121826]">Sub-100ms Inference</div>
                </div>
              </div>

              {/* Concentric Circle Gauge Badge (Screenshot 4) */}
              <div className="absolute top-4 right-2 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E2E8F0] shadow-md flex items-center gap-2 text-xs font-bold text-[#121826]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>NSS: +42.6%</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Feature Cards (Directly matching 3 bottom cards from Screenshot 1) */}
        <div className="mt-16 pt-12 border-t border-[#E8E7E2] grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1: Design Guideline / Preprocessor */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all hover:shadow-md">
            {/* Geometric Mark (Screenshot 1: pink triangle + green quadrant) */}
            <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center">
              <div className="w-6 h-6 bg-[#EC4899] rotate-45 rounded-sm absolute top-1 left-1" />
              <div className="w-6 h-6 bg-[#10B981] rounded-br-2xl absolute bottom-1 right-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121826] font-['Outfit']">Phase 1: NLP Normalization</h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Contraction expansion, HTML stripping, and business stop words preserving critical negation nuance ("not", "never", "bad").
              </p>
            </div>
          </div>

          {/* Feature 2: UI Components / LDA Topic Modeling */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all hover:shadow-md">
            {/* Geometric Mark (Screenshot 1: heart / quadrant composition) */}
            <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center">
              <div className="w-5 h-5 bg-[#F97316] rounded-full absolute top-1 left-2" />
              <div className="w-5 h-5 bg-[#8B5CF6] rounded-full absolute top-1 right-2" />
              <div className="w-6 h-6 bg-[#10B981] rotate-45 absolute bottom-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121826] font-['Outfit']">Phase 2: LDA Root Cause</h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Gensim LDA topic modeling isolating 5 complaint clusters (Battery, Build Quality, Support, Delivery, Firmware) with Coherence $C_v=0.582$.
              </p>
            </div>
          </div>

          {/* Feature 3: Developer Tutorial / Scikit-Learn Rigor */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-[#E2E8F0] transition-all hover:shadow-md">
            {/* Geometric Mark (Screenshot 1: triangle + circle + purple) */}
            <div className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-[#10B981] absolute top-1" />
              <div className="w-5 h-5 bg-[#F59E0B] rounded-full absolute bottom-1 left-1" />
              <div className="w-5 h-5 bg-[#8B5CF6] rounded-sm absolute bottom-1 right-1" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121826] font-['Outfit']">Phase 3 & 4: Production REST API</h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                FastAPI endpoints delivering sub-100ms text prediction, executive Net Sentiment Score (NSS), and ARR churn exposure calculation.
              </p>
            </div>
          </div>

        </div>

        {/* Enterprise Client Social Proof Logos (Inspired by Screenshot 4) */}
        <div className="mt-12 pt-8 flex flex-wrap items-center justify-center sm:justify-between gap-6 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold text-[#64748B]">
          <span className="tracking-widest uppercase text-[11px] font-extrabold text-[#94A3B8]">
            BENCHMARKED ON 50K+ ENTERPRISE REVIEWS
          </span>
          <div className="flex items-center gap-8 text-sm font-extrabold font-['Outfit'] text-[#334155]">
            <span>Google Play</span>
            <span>NETFLIX</span>
            <span>Spotify</span>
            <span>amazon</span>
            <span>Trustpilot</span>
          </div>
        </div>

      </div>
    </section>
  );
}
