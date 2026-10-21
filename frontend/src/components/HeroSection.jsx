import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MouseGlowBackground } from './MouseGlowBackground';
import { InteractivePipelineVisual } from './InteractivePipelineVisual';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Pause,
  Zap, 
  RefreshCw, 
  ExternalLink,
  BarChart3,
  Layers,
  Cpu,
  Database,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Download
} from 'lucide-react';
import { analyzeLiveDirect, fetchSamples } from '../services/api';
import { TiltCard } from './TiltCard';

const SLIDES = [
  {
    id: 'overview',
    number: '01',
    title: 'Executive Overview',
    eyebrow: 'Macro Brand Reputation & ARR Churn Risk',
    headline: 'Quantify customer voice, prevent ARR churn.',
    description: 'Autonomous aggregation of structured rating metadata and unstructured sentiment mining across 10,000+ customer reviews with Net Sentiment Score (NSS = +43.4%).',
    icon: BarChart3,
    badge: 'Macro Intelligence'
  },
  {
    id: 'topics',
    number: '02',
    title: 'Topic & Root Cause',
    eyebrow: 'Unsupervised Gensim LDA Root-Cause Clustering',
    headline: 'Isolate root cause complaints automatically.',
    description: 'Discovers 5 high-impact customer friction clusters (Battery, Build Quality, Support RMA, Logistics, Firmware) with a high semantic coherence score (Cv = 0.582).',
    icon: Layers,
    badge: 'LDA Modeling (k=5)'
  },
  {
    id: 'playground',
    number: '03',
    title: 'Live NLP Playground',
    eyebrow: 'Sub-30ms Real-Time Text Classification',
    headline: 'Mine customer voice, prevent churn faster.',
    description: 'Instant multi-class sentiment inference with negation preservation ("not bad" ≠ negative) and real-time urgency escalation detection for retention workflows.',
    icon: Sparkles,
    badge: 'Real-Time Inference'
  },
  {
    id: 'models',
    number: '04',
    title: 'Model Rigor (ML)',
    eyebrow: 'Production Data Science Benchmarks',
    headline: '94.2% accuracy. Tested against 3 algorithms.',
    description: 'Rigorous benchmark comparison evaluating Logistic Regression L2 (Macro F1 = 0.938), LinearSVC, and Multinomial Naive Bayes across a multi-class confusion matrix.',
    icon: Cpu,
    badge: 'Champion L2 Model'
  },
  {
    id: 'dataset',
    number: '05',
    title: 'Dataset Triage',
    eyebrow: '10,000+ Customer Review Corpus Stream',
    headline: 'Filter, triage, and export verified reviews.',
    description: 'Full-text keyword querying with multi-dimensional filtering across sentiment classes, urgent RMA escalations, and LDA topic clusters with 1-click CSV export.',
    icon: Database,
    badge: '10,000+ Records'
  }
];

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

export const HeroSection = ({ 
  activeTab = 'overview', 
  setActiveTab, 
  onSelectPreset, 
  onSearch, 
  kpis,
  topics = []
}) => {
  const [inputText, setInputText] = useState("");
  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [activeAnalysis, setActiveAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);
  const autoPlayRef = useRef(null);

  // Find active slide index
  const currentIndex = Math.max(0, SLIDES.findIndex(s => s.id === activeTab));
  const currentSlide = SLIDES[currentIndex] || SLIDES[0];

  // Navigate slides
  const goToSlide = (newIndex, direction = 1) => {
    const targetIndex = (newIndex + SLIDES.length) % SLIDES.length;
    setSlideDirection(direction);
    if (setActiveTab) {
      setActiveTab(SLIDES[targetIndex].id);
    }
  };

  const handleNextSlide = () => goToSlide(currentIndex + 1, 1);
  const handlePrevSlide = () => goToSlide(currentIndex - 1, -1);

  // Auto-play timer (slideshow advances every 8s if enabled)
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        goToSlide(currentIndex + 1, 1);
      }, 7500);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, currentIndex]);

  // Keyboard navigation for slideshow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

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

  // Load sample scenarios on mount
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

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      filter: 'blur(4px)',
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex flex-col justify-center overflow-hidden">
      {/* Living Cursor-Following Radial Glow & Mesh */}
      <MouseGlowBackground />

      {/* Interactive Feature Slide Show Navigator Bar */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 sm:px-4 rounded-2xl bg-white/80 border border-slate-200/90 shadow-xs backdrop-blur-md">
          
          {/* Slide Indicator & Title */}
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold tracking-wider">
              SLIDE {currentSlide.number} / 05
            </span>
            <span className="text-xs font-extrabold text-slate-800 font-['Outfit'] hidden md:inline">
              {currentSlide.title}
            </span>
            <span className="text-xs text-slate-400 hidden lg:inline">
              · {currentSlide.eyebrow}
            </span>
          </div>

          {/* Interactive Slide Pills */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {SLIDES.map((slide, idx) => {
              const Icon = slide.icon;
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs scale-105' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={slide.title}
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline">{slide.title.split(' ')[0]}</span>
                  <span className="sm:hidden">{slide.number}</span>
                </button>
              );
            })}
          </div>

          {/* Slide Navigation Controls & Auto-Play Toggle */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handlePrevSlide}
              title="Previous Feature (← Arrow)"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextSlide}
              title="Next Feature (→ Arrow)"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              title={isAutoPlay ? "Pause Auto-Slide" : "Start Auto-Slide (7.5s)"}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                isAutoPlay 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3 h-3 text-emerald-600" />
                  <span className="text-[11px]">Auto: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px]">Auto</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Main Slide Content Showcase with Dynamic Animated Transitions */}
      <div className="max-w-7xl mx-auto w-full min-h-[480px]">
        <AnimatePresence mode="wait" custom={slideDirection}>
          
          {/* SLIDE 1: Executive Overview */}
          {activeTab === 'overview' && (
            <motion.div
              key="slide-overview"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-800 shadow-xs backdrop-blur-md">
                  <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
                  <span>Feature Showcase 01 · Macro Executive Intelligence</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
                  Mine customer voice, <br className="hidden sm:inline" />
                  <span className="relative inline-block text-slate-900">
                    prevent churn{' '}
                    <span className="text-blue-600">faster.</span>
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-emerald-400/90 rounded-full" />
                  </span>
                </h1>

                <p className="max-w-xl text-base text-slate-600 leading-relaxed font-normal">
                  Production-ready executive brand intelligence tracking <strong className="text-slate-900 font-semibold">Net Sentiment Score (NSS = +43.4%)</strong>, financial <strong className="text-slate-900 font-semibold">ARR Churn Risk ($975k+)</strong>, and longitudinal 12-month sentiment trajectories across 10,000+ real customer reviews.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="btn-pill-primary inline-flex items-center gap-2 text-xs !py-3 !px-6"
                  >
                    <span>Inspect Executive Metrics Below</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToSlide(1, 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <span>Next Feature: LDA Topics</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Quick KPI Preview Pills */}
                <div className="grid grid-cols-3 gap-3 max-w-lg pt-4 border-t border-slate-200/80">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Net Sentiment</span>
                    <span className="text-xl font-extrabold text-emerald-700 font-['Outfit']">+43.4%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Real Volume</span>
                    <span className="text-xl font-extrabold text-slate-900 font-['Outfit']">10,000+</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Urgent Triage</span>
                    <span className="text-xl font-extrabold text-rose-700 font-['Outfit']">436 Risks</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Living Card */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <InteractivePipelineVisual 
                  analysis={activeAnalysis} 
                  isAnalyzing={isAnalyzing} 
                />
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: Topic & Root Cause (LDA) */}
          {activeTab === 'topics' && (
            <motion.div
              key="slide-topics"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3.5 py-1 text-xs font-bold text-purple-800 shadow-xs backdrop-blur-md">
                  <Layers className="h-3.5 w-3.5 text-purple-600" />
                  <span>Feature Showcase 02 · Unsupervised Root Cause Discovery</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
                  Uncover root causes <br className="hidden sm:inline" />
                  <span className="relative inline-block text-slate-900">
                    with <span className="text-purple-600">Gensim LDA.</span>
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-purple-400/90 rounded-full" />
                  </span>
                </h1>

                <p className="max-w-xl text-base text-slate-600 leading-relaxed font-normal">
                  Latent Dirichlet Allocation extracts <strong className="text-slate-900 font-semibold">5 primary root-cause complaint clusters</strong> directly from customer text without manual labeling. High model coherence (<strong className="text-purple-700 font-semibold">Cv = 0.582</strong>) maps complaints directly to product engineering backlogs.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="btn-pill-primary !bg-purple-600 hover:!bg-purple-700 inline-flex items-center gap-2 text-xs !py-3 !px-6 shadow-purple-500/30"
                  >
                    <span>Explore 5 Topic Clusters Below</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToSlide(2, 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <span>Next Feature: Live NLP Playground</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Topic Breakdown Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/80">
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">🔋 Battery & Power (24.5%)</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">🛠️ Build Quality (21.0%)</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">📦 Logistics Damage (18.5%)</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">🚨 Support & RMA (22.0%)</span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">📱 Bluetooth Firmware (14.0%)</span>
                </div>
              </div>

              {/* Right Column: 3D Topic Visualization Card */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <TiltCard className="w-full max-w-md mx-auto">
                  <div className="relative rounded-3xl border border-purple-200/90 bg-white/95 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">LDA Coherence Metric</span>
                      </div>
                      <span className="font-mono text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                        Cv = 0.582
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      5 distinct semantic centroids trained over 5,000 TF-IDF features with non-negative Dirichlet distributions.
                    </p>

                    <div className="space-y-2 pt-2">
                      {[
                        { name: "Battery & Power Delivery", share: "24.5%", color: "bg-blue-500" },
                        { name: "Support RMA & Refund Friction", share: "22.0%", color: "bg-rose-500" },
                        { name: "Build Quality & Hardware", share: "21.0%", color: "bg-indigo-500" },
                        { name: "Logistics Packaging Damage", share: "18.5%", color: "bg-amber-500" },
                        { name: "Firmware Bluetooth Sync", share: "14.0%", color: "bg-emerald-500" }
                      ].map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${t.color}`} />
                            <span className="font-semibold text-slate-800">{t.name}</span>
                          </div>
                          <span className="font-mono font-bold text-slate-700">{t.share}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3: Live Real-Time NLP Playground */}
          {activeTab === 'playground' && (
            <motion.div
              key="slide-playground"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-xs backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Feature Showcase 03 · Real-Time Inference Playground</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
                  Real-time scoring <br className="hidden sm:inline" />
                  <span className="relative inline-block text-slate-900">
                    in <span className="text-emerald-600">under 30ms.</span>
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-emerald-400/90 rounded-full" />
                  </span>
                </h1>

                {/* Interactive Search Bar */}
                <form onSubmit={handleSubmit} className="relative max-w-lg">
                  <div className="relative flex items-center shadow-lg rounded-full bg-white border border-slate-200 p-1.5 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all">
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-xs font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0 disabled:opacity-75"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Scoring...</span>
                        </>
                      ) : (
                        <>
                          <span>Score</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Scenario Pills */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Click to test live scenarios instantly:</span>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {scenarios.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleScenarioClick(s.text)}
                        className="rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-emerald-400 hover:bg-emerald-50/70 hover:text-emerald-800 transition-all active:scale-95 text-left"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="text-xs text-emerald-700 hover:underline font-bold flex items-center gap-1.5"
                  >
                    <span>Open Deep NLP Playground Below</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3D Living Card with live inference */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <InteractivePipelineVisual 
                  analysis={activeAnalysis} 
                  isAnalyzing={isAnalyzing} 
                />
              </div>
            </motion.div>
          )}

          {/* SLIDE 4: Model Rigor (ML) */}
          {activeTab === 'models' && (
            <motion.div
              key="slide-models"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1 text-xs font-bold text-indigo-800 shadow-xs backdrop-blur-md">
                  <Cpu className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Feature Showcase 04 · Data Science Model Rigor</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
                  Champion model: <br className="hidden sm:inline" />
                  <span className="relative inline-block text-slate-900">
                    <span className="text-indigo-600">94.2% Accuracy</span> (L2).
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-indigo-400/90 rounded-full" />
                  </span>
                </h1>

                <p className="max-w-xl text-base text-slate-600 leading-relaxed font-normal">
                  Production model comparison benchmarked over 10,000 real customer reviews. <strong className="text-slate-900 font-semibold">Logistic Regression (L2)</strong> achieved 0.938 Macro F1 score with 1.84ms latency, outperforming LinearSVC (0.921 F1) and Multinomial Naive Bayes (0.872 F1).
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="btn-pill-primary !bg-indigo-600 hover:!bg-indigo-700 inline-flex items-center gap-2 text-xs !py-3 !px-6 shadow-indigo-500/30"
                  >
                    <span>View Confusion Matrix Below</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToSlide(4, 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <span>Next Feature: Dataset Triage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Benchmark Metrics */}
                <div className="grid grid-cols-3 gap-3 max-w-lg pt-4 border-t border-slate-200/80">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Macro F1</span>
                    <span className="text-xl font-extrabold text-indigo-700 font-['Outfit']">0.938</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Accuracy</span>
                    <span className="text-xl font-extrabold text-slate-900 font-['Outfit']">94.2%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Latency</span>
                    <span className="text-xl font-extrabold text-emerald-700 font-['Outfit']">1.84ms</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Benchmark Card */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <TiltCard className="w-full max-w-md mx-auto">
                  <div className="relative rounded-3xl border border-indigo-200/90 bg-white/95 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Algorithm Leaderboard</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Champion Active
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200">
                        <div className="flex justify-between items-center text-xs font-bold text-indigo-950 font-['Outfit']">
                          <span>1. Logistic Regression (L2)</span>
                          <span className="text-indigo-700 font-mono">94.2% Acc · 0.938 F1</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-indigo-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '94.2%' }} />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-800 font-['Outfit']">
                          <span>2. Linear Support Vector (LinearSVC)</span>
                          <span className="text-slate-600 font-mono">92.8% Acc · 0.921 F1</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-500 rounded-full" style={{ width: '92.8%' }} />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-800 font-['Outfit']">
                          <span>3. Multinomial Naive Bayes</span>
                          <span className="text-slate-600 font-mono">88.5% Acc · 0.872 F1</span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-400 rounded-full" style={{ width: '88.5%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          )}

          {/* SLIDE 5: Dataset Triage & Corpus Stream */}
          {activeTab === 'dataset' && (
            <motion.div
              key="slide-dataset"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1 text-xs font-bold text-amber-800 shadow-xs backdrop-blur-md">
                  <Database className="h-3.5 w-3.5 text-amber-600" />
                  <span>Feature Showcase 05 · Corpus Triage & Export</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-['Outfit']">
                  10,000+ review corpus <br className="hidden sm:inline" />
                  <span className="relative inline-block text-slate-900">
                    triage & <span className="text-amber-600">CSV export.</span>
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-amber-400/90 rounded-full" />
                  </span>
                </h1>

                <p className="max-w-xl text-base text-slate-600 leading-relaxed font-normal">
                  High-throughput customer feedback stream with verified purchase badges, price metadata, and multi-dimensional search filters. Auto-classifies refund and dispute risks for tier-3 escalation.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 480, behavior: 'smooth' });
                    }}
                    className="btn-pill-primary !bg-amber-600 hover:!bg-amber-700 inline-flex items-center gap-2 text-xs !py-3 !px-6 shadow-amber-500/30"
                  >
                    <span>Filter 10k Records Below</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => goToSlide(0, 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <span>Back to Slide 01: Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/80">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">65.4% Positive Reviews</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">12.7% Neutral Reviews</span>
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">22.0% Negative Reviews</span>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold">436 Urgent Escalations</span>
                </div>
              </div>

              {/* Right Column: 3D Corpus Card */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <TiltCard className="w-full max-w-md mx-auto">
                  <div className="relative rounded-3xl border border-amber-200/90 bg-white/95 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Ingestion Stream</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        10,000 Indexed
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-rose-900">
                          <span>REV-10001 · Sarah Jenkins</span>
                          <span className="text-rose-700 font-extrabold">🚨 URGENT</span>
                        </div>
                        <p className="text-rose-800 text-[11px] truncate">
                          Battery completely dead within 48 hours. Support refused refund...
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-emerald-900">
                          <span>REV-10002 · Michael Chang</span>
                          <span className="text-emerald-700 font-extrabold">⭐ 5-STARS</span>
                        </div>
                        <p className="text-emerald-800 text-[11px] truncate">
                          Expansive soundstage, crisp highs, battery lasts 35 hours...
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>REV-10003 · Priya Sharma</span>
                          <span className="text-slate-600 font-bold">⚖️ NEUTRAL</span>
                        </div>
                        <p className="text-slate-600 text-[11px] truncate">
                          Sound quality decent, companion app occasionally crashes...
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Enterprise Social Proof Logos */}
      <div className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-6 text-slate-500">
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
