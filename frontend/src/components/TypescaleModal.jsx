import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Bookmark, 
  RotateCcw, 
  ChevronsUpDown, 
  Plus, 
  Check, 
  Sliders,
  Layers,
  ArrowUp
} from 'lucide-react';

export default function TypescaleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [baseSize, setBaseSize] = useState('16px');
  const [scale, setScale] = useState('1.50 - Perfect fifth');
  const [typeface, setTypeface] = useState('Outfit');
  const [weight, setWeight] = useState('600');
  const [toggleState, setToggleState] = useState(true);
  const [saved, setSaved] = useState(false);

  const scales = {
    '1.25 - Major third': 1.25,
    '1.33 - Perfect fourth': 1.333,
    '1.41 - Augmented fourth': 1.414,
    '1.50 - Perfect fifth': 1.5,
    '1.618 - Golden ratio': 1.618
  };

  const currentScale = scales[scale] || 1.5;
  const baseNum = parseInt(baseSize) || 16;

  const majorSize = Math.round(baseNum * Math.pow(currentScale, 3));
  const h1Size = Math.round(baseNum * Math.pow(currentScale, 2));
  const h2Size = Math.round(baseNum * currentScale);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setBaseSize('16px');
    setScale('1.50 - Perfect fifth');
    setTypeface('Outfit');
    setWeight('600');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FAF9F5] rounded-[32px] max-w-5xl w-full p-8 shadow-2xl border border-[#E8E7E2] relative overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#121826] hover:bg-[#F1F5F9] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Controls Bar (Directly matching UI Screenshot 3) */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[#E8E7E2]">
          
          {/* Base Size Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">Base size</label>
            <select
              value={baseSize}
              onChange={(e) => setBaseSize(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded-2xl px-4 py-2 font-bold text-xs text-[#121826] shadow-sm outline-none cursor-pointer"
            >
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
          </div>

          {/* Scale Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">Scale</label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded-2xl px-4 py-2 font-bold text-xs text-[#121826] shadow-sm outline-none cursor-pointer"
            >
              <option value="1.25 - Major third">1.25 - Major third</option>
              <option value="1.33 - Perfect fourth">1.33 - Perfect fourth</option>
              <option value="1.41 - Augmented fourth">1.41 - Augmented fourth</option>
              <option value="1.50 - Perfect fifth">1.50 - Perfect fifth</option>
              <option value="1.618 - Golden ratio">1.618 - Golden ratio</option>
            </select>
          </div>

          {/* Typeface Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">Typeface</label>
            <select
              value={typeface}
              onChange={(e) => setTypeface(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded-2xl px-4 py-2 font-bold text-xs text-[#121826] shadow-sm outline-none cursor-pointer"
            >
              <option value="Outfit">Outfit</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          {/* Weight Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">Weight</label>
            <select
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-white border border-[#CBD5E1] rounded-2xl px-4 py-2 font-bold text-xs text-[#121826] shadow-sm outline-none cursor-pointer"
            >
              <option value="400">400 - Regular</option>
              <option value="600">600 - SemiBold</option>
              <option value="700">700 - Bold</option>
              <option value="800">800 - ExtraBold</option>
            </select>
          </div>

        </div>

        {/* Content Split: Typography Preview on Left + Bauhaus Geometric Composition on Right (Screenshot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 flex-1 overflow-y-auto pr-2">
          
          {/* Left Preview Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title Display with Orange Cursor I */}
            <div className="flex items-center gap-1">
              <h2 className="text-5xl font-extrabold text-[#121826] tracking-tight font-['Outfit']">
                Typescale
              </h2>
              <span className="text-5xl font-light text-[#F97316] animate-pulse">I</span>
            </div>
            <div className="h-1 w-full bg-[#121826] rounded-full" />

            {/* Major Headline Row */}
            <div className="flex items-start gap-6 pt-2">
              <div className="w-32 flex-shrink-0 text-xs">
                <div className="font-bold text-[#121826]">{typeface} - SemiBold</div>
                <div className="text-[#64748B] font-mono text-[11px]">Size {majorSize}, Line {majorSize + 10}</div>
              </div>
              <div style={{ fontSize: `${Math.min(majorSize, 48)}px`, fontWeight: weight, fontFamily: typeface }} className="text-[#121826] leading-tight">
                Major Headline
              </div>
            </div>

            {/* Headline 1 (Active Card with Elevation - Screenshot 3) */}
            <div className="flex items-center gap-6 p-4 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] transform -translate-y-1 transition-all">
              <div className="w-32 flex-shrink-0 text-xs">
                <div className="font-bold text-[#121826]">{typeface} - Regular</div>
                <div className="text-[#64748B] font-mono text-[11px]">Size {h1Size}, Line {h1Size + 12}</div>
              </div>
              <div style={{ fontSize: `${Math.min(h1Size, 36)}px`, fontWeight: weight, fontFamily: typeface }} className="text-[#121826] flex-1">
                Headline 1
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center text-[#64748B]">
                <ChevronsUpDown className="w-4 h-4" />
              </div>
            </div>

            {/* Headline 2 Row */}
            <div className="flex items-start gap-6">
              <div className="w-32 flex-shrink-0 text-xs">
                <div className="font-bold text-[#121826]">{typeface} - Regular</div>
                <div className="text-[#64748B] font-mono text-[11px]">Size {h2Size}, Line {h2Size + 8}</div>
              </div>
              <div style={{ fontSize: `${Math.min(h2Size, 24)}px`, fontWeight: weight, fontFamily: typeface }} className="text-[#121826]">
                Headline 2
              </div>
            </div>

            {/* Body Text with Inline Colored Tokens (Screenshot 3) */}
            <div className="flex items-start gap-6">
              <div className="w-32 flex-shrink-0 text-xs">
                <div className="font-bold text-[#121826]">{typeface} - Regular</div>
                <div className="text-[#64748B] font-mono text-[11px]">Size {baseNum}, Line {baseNum + 8}</div>
              </div>
              <div style={{ fontSize: `${baseNum}px`, fontFamily: typeface }} className="text-[#475569] max-w-md leading-relaxed">
                ReputeIQ is an <span className="text-[#10B981] font-semibold">{'{ enterprise SaaS }'}</span> intelligence platform that empowers customer brand reputation at scale *
              </div>
            </div>

          </div>

          {/* Right Column: Bauhaus Decorative Composition (Directly from Screenshot 3) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center relative p-6 bg-white/70 rounded-3xl border border-[#E8E7E2]">
            
            {/* Lavender Quadrant */}
            <div className="w-24 h-24 bg-[#A855F7] rounded-tl-[96px] mb-2 self-start opacity-90 shadow-sm" />

            {/* Green Semicircle */}
            <div className="w-24 h-12 bg-[#10B981] rounded-t-full mb-3 shadow-sm" />

            {/* Orange Pill with Vertical Measurement Slider */}
            <div className="w-16 h-48 bg-[#F97316] rounded-full relative flex flex-col items-center justify-between p-3 shadow-lg">
              <ArrowUp className="w-5 h-5 text-[#121826] stroke-[3]" />
              <div className="w-8 h-2 bg-white rounded-full shadow" />
              <div className="w-7 h-7 rounded-full bg-[#121826] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>

            {/* Blue Circle and Yellow Triangle */}
            <div className="flex items-center gap-3 mt-3">
              <div className="w-12 h-12 rounded-full bg-[#3B82F6] shadow-sm" />
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-[#F59E0B]" />
            </div>

          </div>

        </div>

        {/* Bottom Actions Bar (Directly matching UI Screenshot 3) */}
        <div className="pt-4 border-t border-[#E8E7E2] flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121826] text-white text-xs font-bold hover:bg-black transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Add new</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Download Figma */}
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121826] text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Download Token Config ↓</span>
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#CBD5E1] text-xs font-bold text-[#1E293B] hover:bg-[#F8FAFC]"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{saved ? 'Saved!' : 'Save'}</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#CBD5E1] text-xs font-bold text-[#1E293B] hover:bg-[#F8FAFC]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Reset</span>
            </button>

            {/* Green Toggle Switch */}
            <div
              onClick={() => setToggleState(!toggleState)}
              className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${
                toggleState ? 'bg-[#10B981]' : 'bg-[#CBD5E1]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                toggleState ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
