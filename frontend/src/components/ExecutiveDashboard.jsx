import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Star, 
  DollarSign, 
  Users, 
  HelpCircle,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  BarChart2
} from 'lucide-react';

export default function ExecutiveDashboard({ kpis, trends, onNavigateToPlayground, onFilterUrgent }) {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const activeKPIs = kpis || {
    total_reviews: 1200,
    net_sentiment_score: 42.6,
    positive_percentage: 64.8,
    neutral_percentage: 13.0,
    negative_percentage: 22.2,
    average_rating: 4.12,
    high_urgency_count: 184,
    high_urgency_rate: 15.3,
    estimated_churn_arr_risk: 142800.0,
    top_complaint_topic: "Customer Support & Return Policy Friction"
  };

  const trendData = trends && trends.length > 0 ? trends : [];
  const maxTotal = Math.max(...trendData.map(t => t.total_count || 100), 120);

  return (
    <div className="space-y-10">
      
      {/* Executive Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E7E2]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <span>Phase 4: Executive Business Analytics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>Formula: NSS = (% Pos - % Neg)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
            Macro Brand Reputation & Churn Exposure
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Real-time aggregation of structured rating metadata and unstructured sentiment mining across 1,200+ customer reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onFilterUrgent}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-all shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>View {activeKPIs.high_urgency_count} Urgent Escalations</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards with Bauhaus Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Net Sentiment Score (NSS) */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFF6FF] rounded-bl-[80px] -z-0 transition-all group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Net Sentiment Score</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                +6.4% MoM
              </span>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#121826] font-['Outfit']">
                {activeKPIs.net_sentiment_score > 0 ? `+${activeKPIs.net_sentiment_score}%` : `${activeKPIs.net_sentiment_score}%`}
              </span>
              <span className="text-xs text-[#64748B] font-medium">NSS</span>
            </div>

            {/* Distribution Bar */}
            <div className="mt-4">
              <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden flex">
                <div style={{ width: `${activeKPIs.positive_percentage}%` }} className="bg-[#10B981]" title={`Positive: ${activeKPIs.positive_percentage}%`} />
                <div style={{ width: `${activeKPIs.neutral_percentage}%` }} className="bg-[#CBD5E1]" title={`Neutral: ${activeKPIs.neutral_percentage}%`} />
                <div style={{ width: `${activeKPIs.negative_percentage}%` }} className="bg-[#EF4444]" title={`Negative: ${activeKPIs.negative_percentage}%`} />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-[#64748B] mt-1.5">
                <span className="text-[#10B981]">Pos {activeKPIs.positive_percentage}%</span>
                <span className="text-[#94A3B8]">Neu {activeKPIs.neutral_percentage}%</span>
                <span className="text-[#EF4444]">Neg {activeKPIs.negative_percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Financial ARR Churn Risk Exposure */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FEF2F2] rounded-bl-[80px] -z-0 transition-all group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">ARR At Churn Risk</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                Exposure
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#EF4444] font-['Outfit']">
                ${(activeKPIs.estimated_churn_arr_risk || 0).toLocaleString()}
              </span>
            </div>

            <p className="mt-3 text-xs text-[#64748B] leading-relaxed">
              Calculated from negative reviews among verified repeat buyers multiplied by LTV churn coefficient.
            </p>
          </div>
        </div>

        {/* Card 3: Average Product Rating */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FEF3C7] rounded-bl-[80px] -z-0 transition-all group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Average Rating</span>
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#121826] font-['Outfit']">
                {activeKPIs.average_rating}
              </span>
              <span className="text-xs text-[#64748B] font-medium">/ 5.0</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
              <span>Total Volume:</span>
              <span className="font-bold text-[#121826]">{activeKPIs.total_reviews} Reviews</span>
            </div>
          </div>
        </div>

        {/* Card 4: High Urgency Escalation Rate */}
        <div className="dsm-card p-6 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFF7ED] rounded-bl-[80px] -z-0 transition-all group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Urgent Escalations</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#F97316] font-['Outfit']">
                {activeKPIs.high_urgency_count}
              </span>
              <span className="text-xs text-[#F97316] font-bold">({activeKPIs.high_urgency_rate}%)</span>
            </div>

            <div className="mt-3 text-xs text-[#64748B] flex items-center justify-between">
              <span>Top Root Cause:</span>
              <span className="font-semibold text-[#121826] truncate max-w-[120px]" title={activeKPIs.top_complaint_topic}>
                Support RMA
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 12-Month Interactive Sentiment & NSS Trend Chart */}
      <div className="dsm-card p-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#121826] font-['Outfit']">
              12-Month Longitudinal Sentiment & NSS Trajectory
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Hover over any month to view review volume breakdown and Net Sentiment Score evolution.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#10B981]" />
              <span className="text-[#475569]">Positive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#CBD5E1]" />
              <span className="text-[#475569]">Neutral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#EF4444]" />
              <span className="text-[#475569]">Negative</span>
            </div>
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#E2E8F0]">
              <span className="w-4 h-0.5 bg-[#2563EB]" />
              <span className="text-[#2563EB] font-bold">NSS Line</span>
            </div>
          </div>
        </div>

        {/* Interactive Visual Bar & Trend Chart */}
        <div className="relative pt-6">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-end h-64 border-b border-[#E2E8F0] pb-2">
            {trendData.map((item, idx) => {
              const posHeight = ((item.positive_count || 1) / maxTotal) * 100;
              const neuHeight = ((item.neutral_count || 1) / maxTotal) * 100;
              const negHeight = ((item.negative_count || 1) / maxTotal) * 100;
              const isHovered = selectedMonth === item.month;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setSelectedMonth(item.month)}
                  onMouseLeave={() => setSelectedMonth(null)}
                  className="flex flex-col items-center h-full justify-end cursor-pointer group relative"
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-16 z-30 bg-[#121826] text-white p-2.5 rounded-xl shadow-xl text-[11px] whitespace-nowrap min-w-[130px] animate-float pointer-events-none">
                      <div className="font-bold text-[#F97316] mb-1">{item.month}</div>
                      <div className="flex justify-between gap-3 text-slate-300">
                        <span>Total:</span>
                        <strong className="text-white">{item.total_count}</strong>
                      </div>
                      <div className="flex justify-between gap-3 text-emerald-400">
                        <span>Pos / Neg:</span>
                        <span>{item.positive_count} / {item.negative_count}</span>
                      </div>
                      <div className="flex justify-between gap-3 text-blue-300 font-bold border-t border-slate-700 pt-1 mt-1">
                        <span>NSS:</span>
                        <span>{item.net_sentiment_score}%</span>
                      </div>
                    </div>
                  )}

                  {/* Stacked Vertical Bar */}
                  <div className={`w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col-reverse transition-all duration-200 ${
                    isHovered ? 'ring-2 ring-[#2563EB] scale-105' : 'group-hover:opacity-90'
                  }`}>
                    {/* Positive segment */}
                    <div 
                      style={{ height: `${posHeight * 1.8}px` }} 
                      className="bg-[#10B981] w-full"
                    />
                    {/* Neutral segment */}
                    <div 
                      style={{ height: `${neuHeight * 1.8}px` }} 
                      className="bg-[#CBD5E1] w-full"
                    />
                    {/* Negative segment */}
                    <div 
                      style={{ height: `${negHeight * 1.8}px` }} 
                      className="bg-[#EF4444] w-full"
                    />
                  </div>

                  {/* NSS Pill Badge at the top of bar */}
                  <span className={`text-[10px] font-bold mt-2 transition-colors ${
                    isHovered ? 'text-[#2563EB]' : 'text-[#64748B]'
                  }`}>
                    {item.month.split('-')[1]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Month labels & axis footer */}
          <div className="flex justify-between text-xs text-[#94A3B8] font-medium mt-3 px-1">
            <span>Past 12 Months Longitudinal Horizon</span>
            <span>Formula: Net Sentiment Score = ((Pos% - Neg%) / Total) × 100</span>
          </div>
        </div>

      </div>

    </div>
  );
}
