import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Zap, AlertTriangle, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { TiltCard } from "./TiltCard";

export const InteractivePipelineVisual = ({ analysis, isAnalyzing = false }) => {
  // Safe fallbacks if no analysis yet
  const sentiment = analysis?.sentiment || "Negative";
  const confidence = analysis?.confidence || 94.2;
  const isUrgent = analysis?.is_urgent_churn_risk ?? true;
  const latency = analysis?.latency_ms || 28.4;
  const topic = analysis?.topic || "Customer Support & Return Policy Friction";
  const tokens = analysis?.clean_tokens || ["refund", "stopped", "fraud", "dispute", "support"];

  // Sentiment styling tokens
  const isPositive = sentiment === "Positive";
  const isNegative = sentiment === "Negative";

  const sentimentColor = isPositive 
    ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : (isNegative 
        ? "text-rose-700 bg-rose-50 border-rose-200" 
        : "text-amber-700 bg-amber-50 border-amber-200");

  const sentimentDot = isPositive 
    ? "bg-emerald-500" 
    : (isNegative ? "bg-rose-500" : "bg-amber-500");

  return (
    <TiltCard className="w-full max-w-md mx-auto">
      <div className="relative rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-7 shadow-2xl backdrop-blur-xl overflow-hidden transition-all">
        
        {/* Living Ambient Lighting Gradients */}
        <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          isUrgent ? "bg-rose-400/20" : (isPositive ? "bg-emerald-400/20" : "bg-blue-400/15")
        }`} />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                isAnalyzing ? "bg-blue-400" : "bg-emerald-400"
              }`} />
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                isAnalyzing ? "bg-blue-500" : "bg-emerald-500"
              }`} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isAnalyzing ? "Running Inference..." : "Live Inference Node"}
            </span>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-slate-100/90 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200/70 shadow-xs">
            <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="font-mono">{latency}ms</span>
          </span>
        </div>

        {/* Real-time Urgency Escalation Alert Banner */}
        <AnimatePresence mode="wait">
          {isUrgent ? (
            <motion.div
              key="urgent-alert"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-50/80 to-amber-50 border border-rose-200/90 shadow-xs flex items-start gap-2.5"
            >
              <div className="p-1 rounded-lg bg-rose-100 text-rose-700 flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-rose-900 tracking-tight flex items-center gap-1.5 font-['Outfit']">
                  <span>HIGH-PRIORITY ESCALATION ALERT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                </div>
                <p className="text-rose-700 text-[11px] font-medium leading-tight mt-0.5">
                  Critical churn trigger detected · Instant dispatch to retention queue.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="standard-status"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-xs flex items-center justify-between text-slate-600"
            >
              <span className="font-medium text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Sentiment Classification
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs border ${sentimentColor}`}>
                {sentiment} ({confidence}%)
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Pipeline Flow */}
        <div className="my-4 space-y-2.5">
          
          {/* Stage 1: Classifier */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3 border border-slate-100/90 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">TF-IDF + L2 Logistic Model</p>
                <p className="text-[10px] text-slate-500 font-medium">5k n-gram features (1,2)</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${sentimentColor}`}>
                {sentiment}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-0.5">{confidence}% conf</span>
            </div>
          </div>

          {/* Stage 2: LDA Topic Root Cause */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3 border border-slate-100/90 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">LDA Topic Assignment</p>
                <p className="text-[10px] text-slate-500 font-medium truncate max-w-[160px]" title={topic}>
                  {topic}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
              k = 5 clusters
            </span>
          </div>

          {/* Stage 3: NSS Platform Aggregation */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50/90 p-3 border border-slate-100/90 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 font-['Outfit']">Net Sentiment Score (NSS)</p>
                <p className="text-[10px] text-slate-500 font-medium">10,000 real reviews benchmarked</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              +43.4% NSS
            </span>
          </div>

        </div>

        {/* Clean Tokens Preview Pill Bar */}
        {tokens && tokens.length > 0 && (
          <div className="mb-3 px-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tokens:</span>
              {tokens.slice(0, 5).map((tok, i) => (
                <span key={i} className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                  {tok}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Live Pulse Metric Footer */}
        <div className={`rounded-xl p-3 border flex items-center justify-between transition-colors ${
          isUrgent 
            ? "bg-rose-50/90 border-rose-200 text-rose-800" 
            : "bg-emerald-50/90 border-emerald-100 text-emerald-800"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${sentimentDot}`} />
            <span className="text-xs font-medium">
              {isUrgent ? "Escalation Queue" : "Triage Engine"}
            </span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider font-['Outfit']">
            {isUrgent ? "Priority Tier-3 Active" : "Autonomous Active"}
          </span>
        </div>

      </div>
    </TiltCard>
  );
};

export default InteractivePipelineVisual;
