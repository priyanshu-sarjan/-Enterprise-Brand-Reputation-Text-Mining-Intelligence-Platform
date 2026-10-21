import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  ExternalLink,
  Award,
  Video
} from 'lucide-react';

export default function LinkedInShowcaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const linkedInPostText = `Can customer reviews predict product returns and churn before quarterly reports do?

To put my IIT Roorkee (NPTEL) Business Analytics & Text Mining certification into practice, I designed and deployed an end-to-end Enterprise Brand Reputation & Triage Platform.

Technical Highlights:
• Processed and vectorized text with custom TF-IDF n-grams (1,2) + Lemmatization pipeline preserving critical business negations ('not', 'never', 'bad').
• Deployed an LDA topic model (Gensim Multicore, Cv = 0.582) to isolate 5 root causes of customer attrition automatically (Battery, Build Quality, Support Friction, Delivery, and Firmware).
• Built a full-stack interface (React + FastAPI) that classifies incoming customer feedback in sub-100ms with real-time Net Sentiment Score (NSS) tracking and churn risk exposure calculation.

Live Demo & GitHub Repository link in the comments! 👇

#NPTEL #IITRoorkee #BusinessAnalytics #NLP #DataScience #FullStack #MachineLearning #TextMining`;

  const handleCopy = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#E2E8F0] relative overflow-hidden space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#121826] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A66C2]">Phase 6 Strategy</span>
              <span className="text-xs text-[#94A3B8]">·</span>
              <span className="text-xs text-[#64748B] font-semibold">IIT Roorkee / NPTEL Showcase</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#121826] font-['Outfit']">
              LinkedIn Recruiter & Leadership Outreach Kit
            </h3>
          </div>
        </div>

        {/* Strategy Guidance Box */}
        <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] leading-relaxed flex items-start gap-3">
          <Award className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div>
            <strong>Phase 6 Blueprint Alignment:</strong> Focus on business outcomes and ARR churn prevention rather than generic coding syntax to capture executive and data science hiring manager attention.
          </div>
        </div>

        {/* The Post Content Preview */}
        <div className="relative">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-mono text-[#1E293B] whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
            {linkedInPostText}
          </div>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-bold text-[#1E293B] shadow-sm hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Post</span>
              </>
            )}
          </button>
        </div>

        {/* Media Recommendation */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <Video className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>
            <strong>Recommended Video Attachment:</strong> Record a 20-30s screen recording showing you typing a review into the Live NLP Playground and watching the charts update live.
          </span>
        </div>

        {/* Action Footer */}
        <div className="pt-2 border-t border-[#E8E7E2] flex items-center justify-between">
          <span className="text-xs text-[#94A3B8]">Tags: #NPTEL #IITRoorkee #TextMining</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#CBD5E1] text-xs font-semibold text-[#64748B]"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="btn-pill-primary text-xs !py-2.5 !px-5 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Post!' : 'Copy Full Blueprint'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
