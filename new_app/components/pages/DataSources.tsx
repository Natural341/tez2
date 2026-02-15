import React, { useState } from 'react';
import { DataSource, MockRow, DataQualityIssue } from '../../types';
import { analyzeDataQuality } from '../../services/geminiService';
import { Server, Database, FileSpreadsheet, Globe, CheckCircle2, AlertCircle, MoreHorizontal, ShieldCheck, Lock, Key, Plus, Eye, EyeOff, Wand2, ArrowRight, X, Check, Loader2, AlertTriangle, Cpu } from 'lucide-react';

const DataSources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'quality'>('list');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showKey, setShowKey] = useState(false);
  
  // --- Data Quality State ---
  const [data, setData] = useState<MockRow[]>([
      { id: 101, product: 'Laptop Pro X1', sales: 24000, region: 'North', status: 'Active' },
      { id: 102, product: 'Wireless Mouse', sales: null, region: 'North', status: 'Active' },
      { id: 103, product: 'Monitor 4K', sales: 12000, region: 'South', status: 'Active' },
      { id: 104, product: 'Mechanical Keyboard', sales: -450, region: 'West', status: 'Active' },
      { id: 105, product: 'USB-C Hub', sales: 3000, region: 'East', status: 'Active' },
      { id: 106, product: 'Webcam HD', sales: null, region: 'East', status: 'Inactive' },
  ]);
  const [issues, setIssues] = useState<DataQualityIssue[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const sources: DataSource[] = [
    { id: '1', name: 'AWS Production Stream', type: 'WebSocket', status: 'active', lastSync: 'Şimdi', latency: 45 },
    { id: '2', name: 'Legacy Sales SQL', type: 'SQL Database', status: 'active', lastSync: '2 dk önce', latency: 120 },
    { id: '3', name: 'Marketing Campaign API', type: 'REST API', status: 'error', lastSync: '4 saat önce', latency: 0 },
    { id: '4', name: 'Q3 Forecast Upload', type: 'CSV Upload', status: 'inactive', lastSync: '20 Eki 2023', latency: 0 },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'WebSocket': return <Globe size={18} className="text-indigo-600" />;
      case 'SQL Database': return <Database size={18} className="text-slate-600" />;
      case 'REST API': return <Server size={18} className="text-slate-600" />;
      default: return <FileSpreadsheet size={18} className="text-emerald-600" />;
    }
  };

  const handleAnalyze = async () => {
      setAnalyzing(true);
      const results = await analyzeDataQuality(data);
      setIssues(results);
      setAnalyzing(false);
  };

  const applyFix = (issueId: string) => {
      const issue = issues.find(i => i.id === issueId);
      if (!issue) return;

      const newData = data.map(row => {
          if (row.id === issue.rowId) {
              return { ...row, [issue.column]: issue.suggestedValue };
          }
          return row;
      });

      setData(newData);
      setIssues(prev => prev.filter(i => i.id !== issueId)); 
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Veri Yönetimi</h2>
          <p className="text-slate-500 mt-1">Bağlantılar ve veri kalitesi işlemleri.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Bağlantılar
            </button>
            <button 
                onClick={() => setActiveTab('quality')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'quality' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Kalite & Temizlik (AI)
            </button>
        </div>
      </div>

      {activeTab === 'list' ? (
        // --- Source List View ---
        <div className="space-y-6">
            <div className="flex justify-end">
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                {showAddForm ? 'İptal Et' : <><Plus size={16} /> Yeni Kaynak Ekle</>}
                </button>
            </div>

            {/* Secure Add Form */}
            {showAddForm && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <ShieldCheck className="text-emerald-500 opacity-20 w-24 h-24 -mr-4 -mt-4" />
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Lock size={18} className="text-indigo-600" />
                            Güvenli Bağlantı Sihirbazı
                        </h3>
                        <p className="text-sm text-slate-500">Tüm kimlik bilgileri AES-256 ile uçtan uca şifrelenir.</p>
                    </div>
                    {/* Simplified Form Content for Brevity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input type="text" placeholder="Kaynak Adı" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm" />
                             <input type="text" placeholder="Endpoint URL" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm" />
                        </div>
                         <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                             <div className="relative">
                                <input type={showKey ? "text" : "password"} placeholder="API Key" className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-sm" />
                                <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                             </div>
                             <button className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg text-sm">Bağlantıyı Test Et</button>
                         </div>
                    </div>
                </div>
            )}

            {/* List Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
                    <tr>
                    <th className="px-6 py-4">Kaynak Adı</th>
                    <th className="px-6 py-4">Tip</th>
                    <th className="px-6 py-4">Durum</th>
                    <th className="px-6 py-4">Gecikme</th>
                    <th className="px-6 py-4 text-right">İşlemler</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {sources.map((source) => (
                    <tr key={source.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{source.name}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                             {getIcon(source.type)} {source.type}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${source.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : source.status === 'error' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                <span className="capitalize">{source.status}</span>
                            </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">{source.status === 'active' ? `${source.latency}ms` : '-'}</td>
                        <td className="px-6 py-4 text-right"><MoreHorizontal size={18} className="ml-auto text-slate-400" /></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      ) : (
        // --- Data Quality View (Wrangler) ---
        <div className="flex flex-col flex-1 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6">
             <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                <div>
                    <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                        <Cpu size={18} /> Otonom Veri Denetçisi
                    </h3>
                    <p className="text-sm text-indigo-700 mt-1">Yüklenen verileri AI ile tarayın, eksikleri ve hataları otomatik düzeltin.</p>
                </div>
                <button 
                    onClick={handleAnalyze} 
                    disabled={analyzing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-70 transition-colors shadow-sm"
                >
                    {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                    {analyzing ? 'Taranıyor...' : 'AI Analizi Başlat'}
                </button>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                 {/* Table */}
                <div className="flex-1 overflow-auto border border-slate-200 rounded-lg relative">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700 font-semibold sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">Product</th>
                                <th className="px-4 py-3 border-b">Sales ($)</th>
                                <th className="px-4 py-3 border-b">Region</th>
                                <th className="px-4 py-3 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.map(row => {
                                const rowIssues = issues.filter(i => i.rowId === row.id);
                                const hasIssue = rowIssues.length > 0;
                                return (
                                    <tr key={row.id} className={hasIssue ? 'bg-rose-50/50' : 'bg-white'}>
                                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.id}</td>
                                        <td className="px-4 py-3 font-medium text-slate-900">{row.product}</td>
                                        <td className="px-4 py-3 relative">
                                            {row.sales === null ? (
                                                <span className="text-slate-400 italic">null</span>
                                            ) : (
                                                <span className={row.sales < 0 ? 'text-rose-600 font-bold' : ''}>{row.sales}</span>
                                            )}
                                            {hasIssue && <AlertTriangle size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500" />}
                                        </td>
                                        <td className="px-4 py-3">{row.region}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                 {/* Issues Panel */}
                 <div className="w-80 border-l border-slate-100 pl-6 flex flex-col">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Check size={16} className="text-emerald-500" /> Tespitler & Onarımlar
                    </h4>
                    
                    <div className="space-y-3 overflow-y-auto pr-2 flex-1">
                        {issues.length === 0 && !analyzing && (
                            <div className="text-center p-6 bg-slate-50 rounded-lg border border-slate-200 border-dashed mt-10">
                                <p className="text-slate-500 text-sm">Veri seti temiz görünüyor veya henüz analiz edilmedi.</p>
                            </div>
                        )}
                        
                        {issues.map(issue => (
                            <div key={issue.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">ID: {issue.rowId}</span>
                                    <span className="text-xs font-mono text-slate-400">{issue.column}</span>
                                </div>
                                <p className="text-xs text-slate-600 mb-2 font-medium">{issue.issue}</p>
                                <div className="bg-emerald-50 p-2 rounded border border-emerald-100 mb-3">
                                    <p className="text-xs text-emerald-800 flex items-center gap-1">
                                        <ArrowRight size={12} /> {issue.suggestion}
                                    </p>
                                    <p className="text-xs font-bold text-emerald-700 mt-1 pl-4">Değer: {issue.suggestedValue}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => applyFix(issue.id)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs py-1.5 rounded transition-colors">Onayla</button>
                                    <button className="px-2 border border-slate-200 rounded hover:bg-slate-50 text-slate-400 hover:text-rose-500"><X size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DataSources;