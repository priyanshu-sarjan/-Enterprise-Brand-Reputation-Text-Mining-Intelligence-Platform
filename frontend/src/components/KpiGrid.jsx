import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Star, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const KpiGrid = ({ kpis, onFilterUrgent, onNavigateToPlayground }) => {
  const data = kpis || {
    total_reviews: 10000,
    net_sentiment_score: 43.4,
    positive_percentage: 65.4,
    neutral_percentage: 12.7,
    negative_percentage: 22.0,
    avg_rating: 3.80,
    high_urgency_count: 436,
    high_urgency_rate: 4.4,
    estimated_churn_arr_risk: 975566.01,
    top_complaint_topic: "Customer Support & Return Policy Friction"
  };

  const nssFormatted = data.net_sentiment_score > 0 
    ? `+${data.net_sentiment_score}%` 
    : `${data.net_sentiment_score}%`;

  return (
    <div className="w-full space-y-4">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Net Sentiment Score (NSS) */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/80 rounded-bl-[80px] -z-0 transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Net Sentiment Score
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                Live Metric
              </span>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 font-['Outfit']">
                {nssFormatted}
              </span>
              <span className="text-xs text-slate-500 font-semibold">NSS Score</span>
            </div>

            {/* Micro Breakdown Bar */}
            <div className="mt-4">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  style={{ width: `${data.positive_percentage || 65.4}%` }} 
                  className="bg-emerald-500" 
                  title={`Positive: ${data.positive_percentage}%`} 
                />
                <div 
                  style={{ width: `${data.neutral_percentage || 12.7}%` }} 
                  className="bg-slate-300" 
                  title={`Neutral: ${data.neutral_percentage}%`} 
                />
                <div 
                  style={{ width: `${data.negative_percentage || 22.0}%` }} 
                  className="bg-rose-500" 
                  title={`Negative: ${data.negative_percentage}%`} 
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5">
                <span className="text-emerald-700 font-bold">Pos {data.positive_percentage || 65.4}%</span>
                <span className="text-slate-500">Neu {data.neutral_percentage || 12.7}%</span>
                <span className="text-rose-700 font-bold">Neg {data.negative_percentage || 22.0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Total Customer Volume */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/80 rounded-bl-[80px] -z-0 transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Review Volume
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                <Users className="w-3 h-3 text-indigo-600" />
                100% Real Corpus
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 font-['Outfit']">
                {(data.total_reviews || 10000).toLocaleString()}+
              </span>
              <span className="text-xs text-slate-500 font-semibold">Reviews</span>
            </div>

            <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
              Multi-channel ingestion across Amazon Electronics, Trustpilot & Google Play datasets.
            </p>
          </div>
        </div>

        {/* Card 3: Urgent Triage Escalations */}
        <div 
          onClick={onFilterUrgent}
          className="dsm-card p-6 bg-white relative overflow-hidden group border border-rose-200/80 hover:border-rose-400 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/90 rounded-bl-[80px] -z-0 transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Urgent Triage
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-full animate-pulse">
                Action Required
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-rose-700 font-['Outfit']">
                {data.high_urgency_count || 436}
              </span>
              <span className="text-xs text-rose-600 font-bold">
                Escalations ({data.high_urgency_rate || 4.4}%)
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-rose-800 font-semibold pt-1 border-t border-rose-100">
              <span>View Churn Risks</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 4: ARR Churn Exposure */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/80 rounded-bl-[80px] -z-0 transition-transform group-hover:scale-110 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ARR Churn Exposure
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                <DollarSign className="w-3 h-3 text-amber-600" />
                Financial Impact
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
                ${data.estimated_churn_arr_risk ? (data.estimated_churn_arr_risk >= 1000000 ? `${(data.estimated_churn_arr_risk / 1000000).toFixed(2)}M` : `${Math.round(data.estimated_churn_arr_risk / 1000)}k`) : "$975k"}
              </span>
              <span className="text-xs text-slate-500 font-semibold">ARR At Risk</span>
            </div>

            <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
              Calculated from negative feedback among verified repeat buyers ($149+ AOV).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default KpiGrid;
