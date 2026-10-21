import React from 'react';
import { ShieldCheck, Code2 } from 'lucide-react';

export default function Footer({ onOpenLinkedIn, onOpenTypescale }) {
  return (
    <footer className="mt-20 border-t border-[#E8E7E2] bg-white/70 backdrop-blur-sm pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E8E7E2]">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-[#121826] font-['Outfit']">
                ReputeIQ
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
              <span className="text-xs font-bold text-[#64748B] pl-2 border-l border-[#CBD5E1]">
                Intelligence Platform
              </span>
            </div>

            <p className="text-xs text-[#64748B] max-w-sm leading-relaxed">
              Enterprise Brand Reputation, Net Sentiment Score (NSS) tracking, and Unsupervised LDA Root Cause Text Mining platform. Built for high-throughput enterprise SaaS & e-commerce analytics.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Enterprise Platform v2.4 Certified
              </span>
            </div>
          </div>

          {/* Architecture Pillars */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="font-bold text-[#121826] uppercase tracking-wider text-[11px] block mb-2">
              Pipeline Architecture
            </span>
            <ul className="space-y-1.5 text-[#64748B]">
              <li>• Ingestion & Negation-Preserving Tokenizer</li>
              <li>• TF-IDF Vectorization (n-gram 1-2, 5k features)</li>
              <li>• Multi-Class L2 Logistic Regression & LinearSVC</li>
              <li>• Gensim Multicore LDA Topic Modeling (k=5)</li>
              <li>• FastAPI REST Engine with Pydantic validation</li>
            </ul>
          </div>

          {/* Quick Links & Toolkit */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-bold text-[#121826] uppercase tracking-wider text-[11px] block mb-2">
              Interactive Toolkit
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenTypescale}
                className="text-left text-[#2563EB] hover:underline font-semibold"
              >
                → Typescale & Design System Controller
              </button>
              <button
                onClick={onOpenLinkedIn}
                className="text-left text-[#0A66C2] hover:underline font-semibold"
              >
                → LinkedIn Certification Showcase Kit
              </button>
              <a
                href="/docs"
                target="_blank"
                rel="noreferrer"
                className="text-left text-[#64748B] hover:text-[#121826]"
              >
                → FastAPI OpenAPI Interactive Docs (/docs)
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© 2026 ReputeIQ Platform · Enterprise Brand Reputation & Text Mining Intelligence.</p>
          <p className="flex items-center gap-1">
            Built with modern React, FastAPI & Scikit-Learn
          </p>
        </div>

      </div>
    </footer>
  );
}
