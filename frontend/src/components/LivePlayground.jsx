import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Tag, 
  Layers, 
  Zap, 
  Clock, 
  Code2, 
  ArrowRight,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { analyzeReviewText } from '../services/api';

export default function LivePlayground({ initialText = '' }) {
  const [text, setText] = useState(initialText || 'The battery completely died after 3 hours of usage. Customer support was rude and refused my refund. Filing a fraud dispute with my credit card company!');
  const [productCategory, setProductCategory] = useState('Electronics');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleReviews = [
    {
      label: '🚨 Critical Legal/Refund Risk',
      sentiment: 'Negative',
      text: 'The battery exploded while charging overnight and burned my desk. Customer service refused my refund claim! I will file a lawsuit and report this company for fraud.'
    },
    {
      label: '🔋 Battery Failure Complaint',
      sentiment: 'Negative',
      text: 'Battery life is utterly disappointing. Drains from 100% to dead within 90 minutes. USB-C port is loose and will not charge properly.'
    },
    {
      label: '🌟 5-Star Enthusiastic Praise',
      sentiment: 'Positive',
      text: 'Phenomenal audio fidelity, ultra-plush memory foam ear cups, and lightning fast Bluetooth 5.3 pairing. Best investment I made this quarter!'
    },
    {
      label: '⚖️ Negation Nuance ("Not bad")',
      sentiment: 'Positive',
      text: 'Not bad at all. Actually surprisingly good sound clarity and durable headband for an entry level headset.'
    },
    {
      label: '📦 Unboxing & Logistics Damage',
      sentiment: 'Negative',
      text: 'The shipping box arrived completely crushed and torn open. The auxiliary cable was missing from the carton.'
    },
    {
      label: '📱 Software / App Glitch',
      sentiment: 'Neutral',
      text: 'Hardware is acceptable for the price, but the companion smartphone app crashes repeatedly on Android 14.'
    }
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeReviewText(text, productCategory);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run on mount if no result
  React.useEffect(() => {
    if (!result) {
      handleAnalyze();
    }
  }, []);

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <div className="pb-6 border-b border-[#E8E7E2] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <span>Phase 4: Real-Time NLP Inference Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>FastAPI Sub-100ms REST Pipeline</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
            Live Customer Review Playground
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Paste any unstructured customer feedback or choose an operational failure scenario below to observe real-time text normalization, sentiment classification, and churn triage.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-3 py-1.5 rounded-full border border-[#A7F3D0]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Model Live: Logistic Regression (L2)</span>
        </div>
      </div>

      {/* Main Grid: Input Column & Live Results Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form & Sample Scenarios */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="dsm-card p-6 bg-white border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#121826] flex items-center gap-1.5">
                <span>Customer Review Text</span>
              </label>
              <div className="flex items-center gap-3">
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1 text-[#334155] outline-none"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Audio">Audio</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Smart Home">Smart Home</option>
                  <option value="Gaming">Gaming</option>
                </select>
                <span className="text-xs text-[#94A3B8] font-mono">{text.length} chars</span>
              </div>
            </div>

            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste raw review text here to test sentiment, root cause topic, and urgency classification..."
              className="w-full p-4 rounded-xl border border-[#CBD5E1] text-sm text-[#1E293B] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 outline-none transition-all leading-relaxed placeholder:text-[#94A3B8]"
            />

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setText('')}
                className="text-xs text-[#64748B] hover:text-[#121826] font-medium"
              >
                Clear input
              </button>

              <button
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
                className="btn-pill-primary flex items-center gap-2 !py-2.5 !px-6 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#FDE047]" />
                    <span>Analyze Review</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sample Scenarios Deck */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] px-1">
              Test Live Scenarios:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleReviews.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setText(sample.text);
                    setResult(null);
                  }}
                  className="text-left p-3 rounded-xl bg-white/80 hover:bg-white border border-[#E2E8F0] hover:border-[#2563EB] shadow-sm hover:shadow transition-all group"
                >
                  <div className="text-xs font-bold text-[#121826] group-hover:text-[#2563EB] transition-colors">
                    {sample.label}
                  </div>
                  <div className="text-[11px] text-[#64748B] line-clamp-2 mt-1">
                    "{sample.text}"
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Prediction Results & Preprocessing Trace */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6">
              
              {/* Primary Prediction Banner Card */}
              <div className="dsm-card p-6 bg-white border border-[#E2E8F0] relative overflow-hidden">
                
                {/* Background Accent Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  result.sentiment === 'Positive' ? 'bg-[#10B981]' : (result.sentiment === 'Negative' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]')
                }`} />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Predicted Sentiment
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-2xl font-extrabold font-['Outfit'] ${
                        result.sentiment === 'Positive' ? 'text-[#10B981]' : (result.sentiment === 'Negative' ? 'text-[#EF4444]' : 'text-[#F59E0B]')
                      }`}>
                        {result.sentiment}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569]">
                        {Math.round(result.sentiment_score * 100)}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Urgency Pill Indicator (Phase 4 requirement) */}
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                      Triage Status
                    </span>
                    {result.is_urgent_escalation ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-300 animate-pulse">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                        🚨 URGENT ESCALATION
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Standard Triage
                      </span>
                    )}
                  </div>
                </div>

                {/* Probability Breakdown Bar */}
                <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
                  <div className="flex justify-between text-xs font-semibold text-[#64748B] mb-1.5">
                    <span>Class Probability Distribution:</span>
                    <span className="font-mono text-[11px]">
                      Pos: {Math.round((result.probabilities?.Positive || 0) * 100)}% | 
                      Neu: {Math.round((result.probabilities?.Neutral || 0) * 100)}% | 
                      Neg: {Math.round((result.probabilities?.Negative || 0) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden flex">
                    <div style={{ width: `${(result.probabilities?.Positive || 0) * 100}%` }} className="bg-[#10B981]" />
                    <div style={{ width: `${(result.probabilities?.Neutral || 0) * 100}%` }} className="bg-[#CBD5E1]" />
                    <div style={{ width: `${(result.probabilities?.Negative || 0) * 100}%` }} className="bg-[#EF4444]" />
                  </div>
                </div>

                {/* Urgency Trigger Keywords (if any) */}
                {result.urgency_triggers && result.urgency_triggers.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-red-800">
                        High Priority Legal / Refund Triggers Detected:
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {result.urgency_triggers.map((trigger, i) => (
                          <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-red-200/80 text-red-900 font-bold">
                            "{trigger}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Topic Match & Churn Risk */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#F1F5F9]">
                  <div>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Matched LDA Topic
                    </span>
                    <span className="text-sm font-extrabold text-[#121826] font-['Outfit'] mt-0.5 block">
                      {result.topic_name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      Financial Churn Risk
                    </span>
                    <span className={`text-sm font-extrabold font-['Outfit'] mt-0.5 block ${
                      result.churn_risk_level.includes('Critical') ? 'text-red-600' : 'text-slate-800'
                    }`}>
                      {result.churn_risk_level}
                    </span>
                  </div>
                </div>

                {/* Action Recommendation */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] mb-1">
                    Automated Business Action:
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed font-medium">
                    {result.action_recommendation}
                  </p>
                </div>

              </div>

              {/* Preprocessing & NLP Normalization Trace (Phase 1 Rigor) */}
              <div className="dsm-card p-6 bg-white border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121826]">
                    <Code2 className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Phase 1 Preprocessing Trace</span>
                  </div>

                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1 text-[11px] text-[#64748B] hover:text-[#121826] font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>

                {/* Normalized String */}
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1">
                    Normalized Text (Contraction expanded + Negations preserved):
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E8E7E2] font-mono text-xs text-[#1E293B]">
                    {result.preprocessing?.normalized_text || 'N/A'}
                  </div>
                </div>

                {/* Preserved Business Negations Badge */}
                {result.preprocessing?.preserved_negations && result.preprocessing.preserved_negations.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                      Business Negation Preserved (Enterprise NLP Specification):
                    </span>
                    <div className="flex gap-2">
                      {result.preprocessing.preserved_negations.map((neg, i) => (
                        <span key={i} className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                          {neg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extracted N-Grams */}
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] block mb-1.5">
                    Extracted TF-IDF Bigrams / N-Grams:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.extracted_ngrams && result.extracted_ngrams.map((ngram, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                        {ngram}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="dsm-card p-12 bg-white text-center text-[#94A3B8] border border-dashed border-[#CBD5E1]">
              <Sparkles className="w-8 h-8 mx-auto text-[#CBD5E1] mb-2 animate-bounce" />
              <p className="text-sm font-semibold">Enter review text on the left and click "Analyze Review" to observe live NLP inference.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
