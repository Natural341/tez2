import React, { useState } from 'react';
import { Database, Play, Loader2, Copy, Check } from 'lucide-react';
import { generateSQLFromText } from '../../services/geminiService';

const SQLStudio: React.FC = () => {
    const [query, setQuery] = useState('');
    const [generatedSQL, setGeneratedSQL] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if(!query.trim()) return;
        setLoading(true);
        const sql = await generateSQLFromText(query);
        setGeneratedSQL(sql);
        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedSQL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="animate-fade-in pb-10 h-full flex flex-col">
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">SQL Stüdyosu (NL2SQL)</h2>
                <p className="text-slate-500 mt-1">Doğal dil kullanarak veritabanı sorguları oluşturun ve optimize edin.</p>
             </div>

             <div className="flex gap-6 flex-1 min-h-0">
                <div className="w-1/2 flex flex-col gap-4">
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                        <label className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                             Sorgu İsteği (Doğal Dil)
                        </label>
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Örn: Geçen ay electronics kategorisinde 500$ üzeri harcama yapan ve 'Gold' segmentindeki müşterilerin toplam harcamasını getir."
                            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-slate-700 placeholder:text-slate-400 text-base leading-relaxed"
                        />
                        <div className="mt-4 pt-4 border-t border-slate-100">
                             <button 
                                onClick={handleGenerate}
                                disabled={loading || !query.trim()}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 shadow-sm"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
                                SQL Oluştur
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex flex-col">
                    <div className="flex-1 bg-[#1e1e1e] rounded-xl p-6 shadow-lg overflow-hidden flex flex-col relative group border border-slate-800">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                                <Database size={14} /> PostgreSQL Output
                            </span>
                            {generatedSQL && (
                                <button 
                                    onClick={handleCopy}
                                    className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded flex items-center gap-2 transition-all"
                                >
                                    {copied ? <Check size={14} className="text-emerald-400"/> : <Copy size={14} />}
                                    {copied ? 'Kopyalandı' : 'Kopyala'}
                                </button>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-auto font-mono text-sm leading-relaxed">
                            {generatedSQL ? (
                                <code className="text-emerald-400 whitespace-pre-wrap">{generatedSQL}</code>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                                    <Database size={32} className="mb-3 opacity-20" />
                                    <span className="text-xs">SQL çıktısı burada görünecek...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default SQLStudio;