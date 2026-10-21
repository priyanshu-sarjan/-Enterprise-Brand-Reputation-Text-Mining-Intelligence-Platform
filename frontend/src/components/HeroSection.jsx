import React, { useState, useEffect } from 'react';
import { MouseGlowBackground } from './MouseGlowBackground';
import { InteractivePipelineVisual } from './InteractivePipelineVisual';
import { Sparkles, ArrowRight, Zap, RefreshCw, ExternalLink } from 'lucide-react';
import { analyzeLiveDirect, fetchSamples } from '../services/api';

const DEFAULT_SCENARIOS = [
  { 
    label: "🚨 High Churn Refund Risk", 
    text: "Product stopped working within 2 days. Customer support hung up and refused refund. Filing a fraud dispute!" 
  },
  { 
    label: "🔋 Battery Degradation", 
    text: "Battery drains from 100% to 15% in just two hours of minimal usage. Overheats while charging." 
  },
  { 
    label: "🎧 5-Star Audiophile Praise", 
    text: "Soundstage is expansive, crisp highs and punchy bass. Unbelievable comfort. Best purchase of the year!" 
  },
  { 
    label: "📦 Logistics Damage", 
    text: "The outer box arrived crushed and taped together, but the internal hardware was surprisingly intact." 
  },
  { 
    label: "⚖️ Negation Nuance ('Not bad')", 
    text: "Honestly, the build quality is not bad for the price point, actually surprisingly good audio fidelity." 
  }
];

export const HeroSection = ({ onSelectPreset, onSearch, kpis }) => {
  const [inputText, setInputText] = useState("");
  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Trigger analysis on text
  const triggerAnalysis = async (textToAnalyze) => {
    if (!textToAnalyze || !textToAnalyze.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeLiveDirect(textToAnalyze.trim());
      setActiveAnalysis(res);
    } catch (err) {
      console.error("Live analysis failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // On mount: fetch real samples from backend and run initial benchmark review
  useEffect(() => {
    async function loadInitial() {
      try {
        const samples = await fetchSamples();
        if (samples && Array.isArray(samples) && samples.length > 0) {
          const mapped = samples.slice(0, 5).map(s => {
            const isNegative = s.sentiment === 0;
            const isPositive = s.sentiment === 2;
            const labelPrefix = isNegative ? "🚨" : (isPositive ? "⭐" : "⚖️");
            return {
              label: `${labelPrefix} ${s.review_title || (isNegative ? 'Urgent Churn' : (isPositive ? 'Top Rated' : 'Neutral Voice'))}`,
              text: s.text
            };
          });
          setScenarios(mapped);
        }
      } catch (e) {
        // Fallback to default scenarios
      }

      // Run initial live analysis on first scenario
      triggerAnalysis(DEFAULT_SCENARIOS[0].text);
    }

    loadInitial();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      triggerAnalysis(inputText.trim());
    }
  };

  const handleScenarioClick = (scenarioText) => {
    setInputText(scenarioText);
    triggerAnalysis(scenarioText);
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Living Cursor-Following Radial Glow & Mesh */}
      <MouseGlowBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        
        {/* Left Column: Headlines, Styled Search Bar, and Scenarios (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>ReputeIQ v2.4 Enterprise Production</span>
          </div>

          {/* Giant Display Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
            Mine customer voice, <br className="hidden sm:inline" />
            <span className="relative inline-block text-slate-900">
              prevent churn{' '}
              <span className="text-blue-600">faster.</span>
              <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-emerald-400/90 rounded-full" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-base text-slate-600 leading-relaxed font-normal">
            A production-ready NLP intelligence platform combining{" "}
            <strong className="text-slate-900 font-semibold">TF-IDF n-grams</strong>,{" "}
            <strong className="text-slate-900 font-semibold">L2 Logistic Classifiers</strong>, and{" "}
            <strong className="text-slate-900 font-semibold">Gensim LDA Topic Modeling</strong> to triage critical churn risks before financial quarter closes.
          </p>

          {/* Interactive Search / Analysis Bar */}
          <form onSubmit={handleSubmit} className="relative max-w-lg">
            <div className="relative flex items-center shadow-lg rounded-full bg-white border border-slate-200 p-1.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste customer review or root cause keyword..."
                className="w-full px-5 py-3 text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0 disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Scoring...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Live Scenario Pills */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between max-w-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Test Live Scenarios (Instant Scoring):</span>
              </p>
              {inputText && (
                <button
                  type="button"
                  onClick={() => onSelectPreset && onSelectPreset(inputText)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Open Deep NLP Playground</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {scenarios.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleScenarioClick(s.text)}
                  className="rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-blue-400 hover:bg-blue-50/70 hover:text-blue-700 transition-all active:scale-95 text-left"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: 3D Living Card (5 Cols) with live inference */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <InteractivePipelineVisual 
            analysis={activeAnalysis} 
            isAnalyzing={isAnalyzing} 
          />
        </div>

      </div>

      {/* Enterprise Social Proof Logos */}
      <div className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6 text-slate-500">
        <span className="tracking-widest uppercase text-[11px] font-extrabold text-slate-400">
          BENCHMARKED ON 50K+ ENTERPRISE REVIEWS
        </span>
        <div className="flex items-center gap-8 text-sm font-extrabold font-['Outfit'] text-slate-700">
          <span className="hover:text-slate-900 transition-colors">Google Play</span>
          <span className="hover:text-slate-900 transition-colors">NETFLIX</span>
          <span className="hover:text-slate-900 transition-colors">Spotify</span>
          <span className="hover:text-slate-900 transition-colors">amazon</span>
          <span className="hover:text-slate-900 transition-colors">Trustpilot</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
