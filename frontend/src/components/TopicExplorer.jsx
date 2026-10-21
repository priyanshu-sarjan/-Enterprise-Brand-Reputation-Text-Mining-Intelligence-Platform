import React, { useState } from 'react';
import { 
  Layers, 
  BatteryCharging, 
  Wrench, 
  Package, 
  Headphones, 
  Wifi, 
  AlertCircle, 
  Star, 
  ArrowRight,
  TrendingDown,
  Sparkles,
  Search
} from 'lucide-react';

export default function TopicExplorer({ topics, onSelectTopicForTriage }) {
  const [selectedTopicId, setSelectedTopicId] = useState(1);

  const topicIcons = {
    1: BatteryCharging,
    2: Wrench,
    3: Package,
    4: Headphones,
    5: Wifi
  };

  const topicColors = {
    1: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-[#F59E0B]' },
    2: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', bar: 'bg-[#F43F5E]' },
    3: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-[#2563EB]' },
    4: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-[#EF4444]' },
    5: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', bar: 'bg-[#8B5CF6]' }
  };

  const activeTopic = (topics && topics.find(t => t.topic_id === selectedTopicId)) || (topics && topics[0]) || null;

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <div className="pb-6 border-b border-[#E8E7E2] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
            <span>Phase 2: Unsupervised Text Mining</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span>Gensim LDA Multicore (k=5, C_v = 0.582)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
            Root Cause & Complaint Topic Clustering
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Unsupervised Latent Dirichlet Allocation (LDA) models automatically categorizing negative and neutral reviews into 5 primary operational failure vectors.
          </p>
        </div>

        {/* Global Coherence Badge */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Model Coherence</div>
            <div className="text-base font-extrabold text-[#121826]">C_v = 0.582 (Optimal)</div>
          </div>
        </div>
      </div>

      {/* Grid: Topic Cards List on Left, Deep-Dive Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 5 Topic Cards (Horizontal Bars) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2 px-1">
            Identified Complaint Clusters
          </div>

          {topics && topics.map((topic) => {
            const Icon = topicIcons[topic.topic_id] || Layers;
            const colors = topicColors[topic.topic_id] || topicColors[1];
            const isSelected = selectedTopicId === topic.topic_id;

            return (
              <div
                key={topic.topic_id}
                onClick={() => setSelectedTopicId(topic.topic_id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white border-[#2563EB] shadow-lg ring-2 ring-[#2563EB]/10 translate-x-1' 
                    : 'bg-white/80 hover:bg-white border-[#E2E8F0] hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#121826] font-['Outfit']">{topic.name}</h4>
                      <span className="text-[11px] text-[#64748B]">{topic.review_count} complaints logged</span>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-[#121826] font-['Outfit']">
                    {topic.share_percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden mt-3">
                  <div
                    style={{ width: `${topic.share_percentage * 3.5}%` }}
                    className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Inspector for Active Topic */}
        {activeTopic && (
          <div className="lg:col-span-7 dsm-card p-8 bg-white border border-[#E2E8F0]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E7E2]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Topic #{activeTopic.topic_id} Deep-Dive
                </span>
                <h3 className="text-2xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
                  {activeTopic.name}
                </h3>
              </div>

              <button
                onClick={() => onSelectTopicForTriage(activeTopic.name)}
                className="btn-pill-dark text-xs !py-2.5 !px-4 self-start sm:self-auto"
              >
                <span>Filter Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-[#475569] mt-6 leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              {activeTopic.description}
            </p>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E7E2]">
                <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Complaint Share</div>
                <div className="text-2xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
                  {activeTopic.share_percentage}%
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">{activeTopic.review_count} Reviews</div>
              </div>

              <div className="p-4 rounded-xl bg-[#FEF2F2] border border-red-100">
                <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Churn Multiplier</div>
                <div className="text-2xl font-extrabold text-[#EF4444] font-['Outfit'] mt-1">
                  {activeTopic.churn_multiplier}x
                </div>
                <div className="text-[11px] text-red-600 mt-1">Elevated Attrition Risk</div>
              </div>

              <div className="p-4 rounded-xl bg-[#FEF3C7] border border-amber-100">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Avg Star Rating</div>
                <div className="text-2xl font-extrabold text-amber-800 font-['Outfit'] mt-1 flex items-center gap-1">
                  {activeTopic.avg_rating}
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="text-[11px] text-amber-700 mt-1">Severely Degraded</div>
              </div>

            </div>

            {/* Top 10 Keywords Cloud with Weights (Phase 2 & 4 requirement) */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#121826]">
                  Top 10 Latent Keywords & Topic Weights
                </span>
                <span className="text-xs text-[#64748B]">Gensim Term Importance</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activeTopic.top_keywords && activeTopic.top_keywords.map((kw, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#CBD5E1] text-xs font-semibold text-[#1E293B] shadow-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
                  >
                    <span>{kw.word}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
                      {kw.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Cross-functional Action */}
            <div className="mt-8 pt-6 border-t border-[#E8E7E2] flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-semibold text-[#121826]">Recommended Action:</span>
              <span>Notify Engineering QA & Supply Chain Leads via Automated Jira Webhook</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
