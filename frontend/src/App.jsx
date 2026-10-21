import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import TopicExplorer from './components/TopicExplorer';
import LivePlayground from './components/LivePlayground';
import ModelEvaluation from './components/ModelEvaluation';
import DatasetExplorer from './components/DatasetExplorer';
import TypescaleModal from './components/TypescaleModal';
import LinkedInShowcaseModal from './components/LinkedInShowcaseModal';
import Footer from './components/Footer';

import { 
  fetchKPIs, 
  fetchTopics, 
  fetchTrends, 
  fetchModels, 
  fetchConfusionMatrix 
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [kpis, setKpis] = useState(null);
  const [topics, setTopics] = useState([]);
  const [trends, setTrends] = useState([]);
  const [models, setModels] = useState([]);
  const [confusionMatrix, setConfusionMatrix] = useState(null);

  // Modals state
  const [typescaleOpen, setTypescaleOpen] = useState(false);
  const [linkedInOpen, setLinkedInOpen] = useState(false);

  // Inter-tab cross navigation state
  const [playgroundText, setPlaygroundText] = useState('');
  const [datasetUrgentFilter, setDatasetUrgentFilter] = useState(false);
  const [datasetTopicFilter, setDatasetTopicFilter] = useState('All');

  // Load initial backend telemetry
  useEffect(() => {
    async function initData() {
      try {
        const [kpiData, topicData, trendData, modelData, cmData] = await Promise.all([
          fetchKPIs(),
          fetchTopics(),
          fetchTrends(),
          fetchModels(),
          fetchConfusionMatrix()
        ]);
        setKpis(kpiData);
        setTopics(topicData);
        setTrends(trendData);
        setModels(modelData);
        setConfusionMatrix(cmData);
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }
    initData();
  }, []);

  const handleSelectPreset = (text) => {
    setPlaygroundText(text);
    setActiveTab('playground');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleQuickAnalyze = () => {
    setActiveTab('playground');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleFilterUrgent = () => {
    setDatasetUrgentFilter(true);
    setActiveTab('dataset');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSelectTopicForTriage = (topicName) => {
    setDatasetTopicFilter(topicName);
    setActiveTab('dataset');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#F97316]/20 selection:text-[#F97316]">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTypescale={() => setTypescaleOpen(true)}
        onOpenLinkedIn={() => setLinkedInOpen(true)}
        onQuickAnalyze={handleQuickAnalyze}
      />

      {/* Hero Section (Aesthetic matching UI Screenshots 1, 4, 5, 6) */}
      <HeroSection
        onSelectPreset={handleSelectPreset}
        onSearch={handleSelectPreset}
        kpis={kpis}
      />

      {/* Main Content Area Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs Bar for mobile / secondary navigation */}
        <div className="flex md:hidden overflow-x-auto pb-4 mb-6 gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'topics', label: 'Topics (LDA)' },
            { id: 'playground', label: 'Playground' },
            { id: 'models', label: 'Model Rigor' },
            { id: 'dataset', label: 'Dataset Triage' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${
                activeTab === tab.id
                  ? 'bg-[#121826] text-white border-[#121826]'
                  : 'bg-white text-[#64748B] border-[#CBD5E1]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <ExecutiveDashboard
            kpis={kpis}
            trends={trends}
            onNavigateToPlayground={handleQuickAnalyze}
            onFilterUrgent={handleFilterUrgent}
          />
        )}

        {activeTab === 'topics' && (
          <TopicExplorer
            topics={topics}
            onSelectTopicForTriage={handleSelectTopicForTriage}
          />
        )}

        {activeTab === 'playground' && (
          <LivePlayground
            initialText={playgroundText}
          />
        )}

        {activeTab === 'models' && (
          <ModelEvaluation
            models={models}
            confusionMatrix={confusionMatrix}
          />
        )}

        {activeTab === 'dataset' && (
          <DatasetExplorer
            initialUrgentFilter={datasetUrgentFilter}
            initialTopicFilter={datasetTopicFilter}
          />
        )}

      </main>

      {/* Typescale & Design System Modal (Directly reproduces UI Screenshot 3) */}
      <TypescaleModal
        isOpen={typescaleOpen}
        onClose={() => setTypescaleOpen(false)}
      />

      {/* LinkedIn Post Blueprint & Certification Showcase Modal (Phase 6) */}
      <LinkedInShowcaseModal
        isOpen={linkedInOpen}
        onClose={() => setLinkedInOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenLinkedIn={() => setLinkedInOpen(true)}
        onOpenTypescale={() => setTypescaleOpen(true)}
      />

    </div>
  );
}
