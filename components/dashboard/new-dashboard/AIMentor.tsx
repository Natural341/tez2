import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2, RefreshCw, X } from 'lucide-react';
import { generateInsight } from '@/lib/ai/dashboard-ai';
import { DataPoint, ExpertSettings, AnalysisType } from '@/types/new-dashboard';

interface AIMentorProps {
  data: DataPoint[];
  expertMode: boolean;
  settings: ExpertSettings;
  analysisType: AnalysisType;
  userQuery: string | null;
  resetQuery: () => void;
}

const AIMentor: React.FC<AIMentorProps> = ({ data, expertMode, settings, analysisType, userQuery, resetQuery }) => {
  const [insight, setInsight] = useState<string>("Initializing analysis engine...");
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchInsight = async () => {
    if (data.length === 0) return;
    
    setLoading(true);
    const text = await generateInsight(data, userQuery, settings, analysisType);
    setInsight(text);
    setLoading(false);
    setLastUpdated(new Date());
  };

  // Trigger on manual query or type change
  useEffect(() => {
    fetchInsight();
  }, [userQuery, analysisType]);

  // Initial trigger only (removed the interval loop to save quota)
  useEffect(() => {
    if(data.length > 5 && insight === "Analiz motoru başlatılıyor...") {
        fetchInsight();
    }
  }, [data.length]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
        
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg">
                    <Sparkles size={16} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 text-sm">AI Mentor Analysis</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                       Gemini 1.5 Flash • <span className="text-indigo-600">{analysisType}</span>
                    </p>
                </div>
            </div>
            <button 
                onClick={fetchInsight} 
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all border border-transparent hover:border-slate-100"
                title="Refresh Analysis"
            >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            </button>
        </div>

        <div className="relative z-10 min-h-[60px]">
            {userQuery && (
                <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-md text-xs text-indigo-900 max-w-full">
                    <span className="font-semibold text-indigo-700 whitespace-nowrap">Question:</span> 
                    <span className="truncate">"{userQuery}"</span>
                    <button onClick={resetQuery} className="hover:text-indigo-500 ml-1 p-0.5 rounded-full hover:bg-indigo-100">
                      <X size={12} />
                    </button>
                </div>
            )}
            <p className="text-sm text-slate-700 leading-relaxed font-medium text-justify">
                {insight}
            </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 relative z-10 font-medium">
            <span>Last update: {lastUpdated.toLocaleTimeString()}</span>
            {expertMode && <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Expert Context Active</span>}
        </div>
    </div>
  );
};

export default AIMentor;