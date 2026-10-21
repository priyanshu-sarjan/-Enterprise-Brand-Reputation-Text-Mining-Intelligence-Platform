import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Star, 
  Plus, 
  Download, 
  RefreshCw,
  ExternalLink,
  Tag,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { fetchReviews, submitNewReview } from '../services/api';

export default function DatasetExplorer({ initialUrgentFilter = false, initialTopicFilter = null }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [urgentFilter, setUrgentFilter] = useState(initialUrgentFilter);
  const [topicFilter, setTopicFilter] = useState(initialTopicFilter || 'All');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form state
  const [newReview, setNewReview] = useState({
    product_name: 'ReputeIQ SoundPro ANC Headphone',
    category: 'Electronics',
    rating: 1,
    review_title: 'Battery defect and refund refused',
    review_body: 'The battery refused to charge after 2 days. Support denied my return warranty and hung up on me. Total fraud!',
    user_name: 'Alex Rivera'
  });
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchReviews({
        limit: 100,
        sentiment: sentimentFilter !== 'All' ? sentimentFilter : undefined,
        urgent_only: urgentFilter,
        topic: topicFilter !== 'All' ? topicFilter : undefined,
        search: search.trim() ? search.trim() : undefined
      });
      setReviews(data);
      setPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [sentimentFilter, urgentFilter, topicFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadReviews();
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await submitNewReview(newReview);
      setReviews([created, ...reviews]);
      setIsModalOpen(false);
      setNewReview({
        product_name: 'ReputeIQ SoundPro ANC Headphone',
        category: 'Electronics',
        rating: 1,
        review_title: '',
        review_body: '',
        user_name: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    if (!reviews || reviews.length === 0) return;
    const headers = ["ID", "Date", "User", "Product", "Rating", "Title", "Body", "Sentiment", "Urgent", "Topic"];
    const rows = reviews.map(r => [
      r.id,
      r.date,
      `"${r.user_name || ''}"`,
      `"${r.product_name}"`,
      r.rating,
      `"${(r.review_title || '').replace(/"/g, '""')}"`,
      `"${(r.review_body || '').replace(/"/g, '""')}"`,
      r.sentiment,
      r.is_urgent ? "YES" : "NO",
      `"${r.topic_name}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dsm_reviews_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination slice
  const pageSize = 12;
  const totalPages = Math.ceil(reviews.length / pageSize) || 1;
  const currentRecords = reviews.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="pb-6 border-b border-[#E8E7E2] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <span>Phase 1: Structured & Unstructured Dataset Triage</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>1,200 Indexed Records</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#121826] font-['Outfit'] mt-1">
            Customer Review Intelligence Corpus
          </h2>
          <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
            Query and filter preprocessed customer feedback by sentiment classes, urgency escalation flags, and LDA topic clusters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E2E8F0] bg-white text-xs font-semibold text-[#1E293B] hover:bg-[#F8FAFC] shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-pill-primary flex items-center gap-1.5 text-xs !py-2 !px-4"
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Review</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="dsm-card p-4 bg-white border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keywords, products, users..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#CBD5E1] outline-none focus:border-[#2563EB] bg-[#F8FAFC]"
          />
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
        </form>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Sentiment Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#64748B] font-medium">Sentiment:</span>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 font-semibold text-[#334155] outline-none text-xs"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive Only</option>
              <option value="Neutral">Neutral Only</option>
              <option value="Negative">Negative Only</option>
            </select>
          </div>

          {/* Urgent Toggle Pill */}
          <button
            onClick={() => setUrgentFilter(!urgentFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              urgentFilter
                ? 'bg-red-500 text-white border-red-600 shadow-sm'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#CBD5E1] hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Urgent Escalations Only</span>
          </button>

          {/* Reset button */}
          {(sentimentFilter !== 'All' || urgentFilter || topicFilter !== 'All' || search) && (
            <button
              onClick={() => {
                setSentimentFilter('All');
                setUrgentFilter(false);
                setTopicFilter('All');
                setSearch('');
              }}
              className="text-xs text-[#2563EB] font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}

        </div>
      </div>

      {/* Reviews Table */}
      <div className="dsm-card bg-white border border-[#E2E8F0] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
            <span className="text-sm font-semibold">Loading reviews...</span>
          </div>
        ) : currentRecords.length === 0 ? (
          <div className="p-12 text-center text-[#94A3B8]">
            <p className="text-sm font-bold">No reviews found matching the selected filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC]">
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Review Content</th>
                  <th className="py-3 px-4">Customer & Product</th>
                  <th className="py-3 px-4">Sentiment</th>
                  <th className="py-3 px-4">Triage Flag</th>
                  <th className="py-3 px-4">Topic Cluster</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {currentRecords.map((rev) => (
                  <tr key={rev.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    
                    {/* Rating stars */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <span>{rev.rating}</span>
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </td>

                    {/* Title & Body */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-[#121826] line-clamp-1">{rev.review_title}</div>
                      <div className="text-[#64748B] line-clamp-2 mt-0.5 leading-relaxed">{rev.review_body}</div>
                    </td>

                    {/* Customer & Product */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-[#1E293B]">{rev.user_name || 'Verified Buyer'}</div>
                      <div className="text-[11px] text-[#94A3B8]">{rev.product_name}</div>
                    </td>

                    {/* Sentiment */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        rev.sentiment === 'Positive' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : (rev.sentiment === 'Negative' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700')
                      }`}>
                        {rev.sentiment}
                      </span>
                    </td>

                    {/* Urgency Flag */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {rev.is_urgent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-300 animate-pulse">
                          <ShieldAlert className="w-3 h-3 text-red-600" />
                          URGENT
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8]">Normal</span>
                      )}
                    </td>

                    {/* Topic */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                        {rev.topic_name}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-[#94A3B8]">
                      {rev.date}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#E8E7E2] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#64748B]">
          <span>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, reviews.length)} of {reviews.length} records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 hover:bg-[#F8FAFC]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-[#121826] px-2">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 hover:bg-[#F8FAFC]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Ingest New Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E7E2]">
              <div>
                <h3 className="text-lg font-bold text-[#121826] font-['Outfit']">Ingest New Review</h3>
                <p className="text-xs text-[#64748B]">Simulate incoming live review stream from Amazon or Google Play</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#121826]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#334155] block mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newReview.user_name}
                  onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
                  placeholder="e.g. Rachel Adams"
                  className="w-full p-2.5 rounded-lg border border-[#CBD5E1] outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#334155] block mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] outline-none font-bold"
                  >
                    <option value={1}>1 Star (Critical)</option>
                    <option value={2}>2 Stars (Poor)</option>
                    <option value={3}>3 Stars (Neutral)</option>
                    <option value={4}>4 Stars (Good)</option>
                    <option value={5}>5 Stars (Excellent)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#334155] block mb-1">Product Category</label>
                  <select
                    value={newReview.category}
                    onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#334155] block mb-1">Review Title</label>
                <input
                  type="text"
                  value={newReview.review_title}
                  onChange={(e) => setNewReview({ ...newReview, review_title: e.target.value })}
                  placeholder="e.g. Hinge broke on first day"
                  className="w-full p-2.5 rounded-lg border border-[#CBD5E1] outline-none focus:border-[#2563EB]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#334155] block mb-1">Review Body (Unstructured Text)</label>
                <textarea
                  rows={4}
                  value={newReview.review_body}
                  onChange={(e) => setNewReview({ ...newReview, review_body: e.target.value })}
                  placeholder="Enter detailed customer feedback..."
                  className="w-full p-2.5 rounded-lg border border-[#CBD5E1] outline-none focus:border-[#2563EB] leading-relaxed"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#E8E7E2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#CBD5E1] text-[#64748B] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !newReview.review_body}
                  className="btn-pill-primary !py-2 !px-5"
                >
                  {submitting ? 'Ingesting...' : 'Ingest & Classify'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
