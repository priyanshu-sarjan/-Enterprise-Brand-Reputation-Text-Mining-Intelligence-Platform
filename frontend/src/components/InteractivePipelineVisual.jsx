import React from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Zap, Sparkles, Command } from "lucide-react";
import { TiltCard } from "./TiltCard";

export const InteractivePipelineVisual = () => {
  return (
    <TiltCard className="w-full max-w-md mx-auto">
      <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-7 shadow-2xl backdrop-blur-xl">
        
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Live Inference Node
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>84ms latency</span>
          </span>
        </div>

        {/* Dynamic Pipeline Flow */}
        <div className="my-5 space-y-3">
          
          {/* Stage 1 */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3.5 border border-slate-100/90 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">TF-IDF + L2 Regularizer</p>
                <p className="text-[11px] text-slate-500 font-medium">5,000 n-gram features (1,2)</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              94.2% Acc
            </span>
          </div>

          {/* Stage 2 */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3.5 border border-slate-100/90 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">LDA Topic Clustering</p>
                <p className="text-[11px] text-slate-500 font-medium">Root cause extraction (Cv = 0.582)</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              k = 5 clusters
            </span>
          </div>

          {/* Stage 3 */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3.5 border border-slate-100/90 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">Net Sentiment Score</p>
                <p className="text-[11px] text-slate-500 font-medium">Real-time formula aggregation</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              +42.6% NSS
            </span>
          </div>

        </div>

        {/* Live Pulse Metric Footer */}
        <div className="rounded-xl bg-emerald-50/90 p-3.5 border border-emerald-100/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-800">Triage Status</span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 font-['Outfit']">
            Autonomous Active
          </span>
        </div>

      </div>
    </TiltCard>
  );
};
export default InteractivePipelineVisual;
