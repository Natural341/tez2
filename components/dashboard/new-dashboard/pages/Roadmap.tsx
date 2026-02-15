import React, { useState, useMemo } from 'react';
import { 
  Wand2, 
  Database, 
  SlidersHorizontal, 
  Play, 
  Check, 
  X, 
  RefreshCw,
  Cpu,
  Terminal,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { analyzeDataQuality, generateSQLFromText } from '@/lib/ai/dashboard-ai';
import { MockRow, DataQualityIssue } from '@/types/new-dashboard';

const InnovationLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'wrangler' | 'simulator' | 'sql'>('wrangler');

  return (
    <div className="space-y-6 animate-fade-in pb-12 h-full flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Innovation Lab</h2>
          <p className="text-slate-500 mt-1">Experimental AI tools and prototype features.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTool('wrangler')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTool === 'wrangler' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <div className="flex items-center gap-2"><Wand2 size={16}/> Data Wrangler</div>
            </button>
            <button 
                onClick={() => setActiveTool('simulator')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTool === 'simulator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                 <div className="flex items-center gap-2"><SlidersHorizontal size={16}/> Simulation</div>
            </button>
            <button 
                onClick={() => setActiveTool('sql')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTool === 'sql' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                 <div className="flex items-center gap-2"><Terminal size={16}/> NL-to-SQL</div>
            </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6">
        {activeTool === 'wrangler' && <DataWranglerTool />}
        {activeTool === 'simulator' && <SimulatorTool />}
        {activeTool === 'sql' && <SQLTool />}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const DataWranglerTool: React.FC = () => {
    // Mock Data with intentional errors
    const [data, setData] = useState<MockRow[]>([
        { id: 101, product: 'Laptop Pro X1', sales: 24000, region: 'North', status: 'Active' },
        { id: 102, product: 'Wireless Mouse', sales: null, region: 'North', status: 'Active' }, // Missing sales
        { id: 103, product: 'Monitor 4K', sales: 12000, region: 'South', status: 'Active' },
        { id: 104, product: 'Mechanical Keyboard', sales: -450, region: 'West', status: 'Active' }, // Negative sales (Error)
        { id: 105, product: 'USB-C Hub', sales: 3000, region: 'East', status: 'Active' },
        { id: 106, product: 'Webcam HD', sales: null, region: 'East', status: 'Inactive' }, // Missing sales
    ]);
    const [issues, setIssues] = useState<DataQualityIssue[]>([]);
    const [analyzing, setAnalyzing] = useState(false);

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
        setIssues(prev => prev.filter(i => i.id !== issueId)); // Remove fixed issue
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div>
                    <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                        <Cpu size={18} /> Autonomous Data Auditor
                    </h3>
                    <p className="text-sm text-indigo-700 mt-1">AI identifies and repairs missing data and anomalies.</p>
                </div>
                <button 
                    onClick={handleAnalyze} 
                    disabled={analyzing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-70 transition-colors shadow-sm"
                >
                    {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                    {analyzing ? 'Scanning...' : 'Start AI Analysis'}
                </button>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Data Table */}
                <div className="flex-1 overflow-auto border border-zinc-200 rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 text-zinc-700 font-semibold sticky top-0">
                            <tr>
                                <th className="px-4 py-3 border-b">ID</th>
                                <th className="px-4 py-3 border-b">Product</th>
                                <th className="px-4 py-3 border-b">Sales ($)</th>
                                <th className="px-4 py-3 border-b">Region</th>
                                <th className="px-4 py-3 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {data.map(row => {
                                const rowIssues = issues.filter(i => i.rowId === row.id);
                                const hasIssue = rowIssues.length > 0;
                                return (
                                    <tr key={row.id} className={hasIssue ? 'bg-rose-50/50' : 'bg-white'}>
                                        <td className="px-4 py-3 font-mono text-xs text-zinc-500">{row.id}</td>
                                        <td className="px-4 py-3 font-medium text-zinc-900">{row.product}</td>
                                        <td className="px-4 py-3 relative">
                                            {row.sales === null ? (
                                                <span className="text-zinc-400 italic">null</span>
                                            ) : (
                                                <span className={row.sales < 0 ? 'text-rose-600 font-bold' : ''}>{row.sales}</span>
                                            )}
                                            {hasIssue && <AlertTriangle size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-500" />}
                                        </td>
                                        <td className="px-4 py-3">{row.region}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-600'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Suggestions Panel */}
                <div className="w-80 border-l border-zinc-100 pl-6 flex flex-col">
                    <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <Check size={16} className="text-emerald-500" /> Recommended Fixes
                    </h4>
                    
                    <div className="space-y-3 overflow-y-auto pr-2">
                        {issues.length === 0 && !analyzing && (
                            <div className="text-center p-6 bg-zinc-50 rounded-lg border border-zinc-200 border-dashed">
                                <p className="text-zinc-500 text-sm">No issues found or analysis not started yet.</p>
                            </div>
                        )}
                        
                        {issues.map(issue => (
                            <div key={issue.id} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                                        ID: {issue.rowId}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400">{issue.column}</span>
                                </div>
                                <p className="text-xs text-slate-600 mb-2 font-medium">{issue.issue}</p>
                                <div className="bg-emerald-50 p-2 rounded border border-emerald-100 mb-3">
                                    <p className="text-xs text-emerald-800 flex items-center gap-1">
                                        <ArrowRight size={12} />
                                        {issue.suggestion}
                                    </p>
                                    <p className="text-xs font-bold text-emerald-700 mt-1 pl-4">
                                        Value: {issue.suggestedValue}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => applyFix(issue.id)}
                                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs py-1.5 rounded transition-colors"
                                    >
                                        Apply
                                    </button>
                                    <button className="px-2 border border-slate-200 rounded hover:bg-slate-50 text-slate-400 hover:text-rose-500">
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SimulatorTool: React.FC = () => {
    const [params, setParams] = useState({
        growthRate: 1.05,
        inflation: 0.02,
        marketVolatility: 0.1
    });

    const simulationData = useMemo(() => {
        const data = [];
        let baseValue = 1000;
        for (let i = 0; i < 24; i++) {
            // Complex simulation formula
            const randomFactor = 1 + (Math.random() - 0.5) * params.marketVolatility;
            const growthFactor = Math.pow(params.growthRate, 1/12); // Monthly breakdown of annual rate
            const inflationImpact = 1 - (params.inflation / 12);
            
            baseValue = baseValue * growthFactor * inflationImpact * randomFactor;
            
            data.push({
                month: `Month ${i + 1}`,
                value: Math.round(baseValue),
                baseline: Math.round(1000 * Math.pow(1.02, i/12)) // Static baseline 2% growth
            });
        }
        return data;
    }, [params]);

    return (
        <div className="flex h-full gap-8">
            <div className="w-1/3 space-y-8">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">What-If Simulator</h3>
                    <p className="text-sm text-slate-500 mt-1">Model potential future scenarios by changing parameters.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700">Annual Growth Target</label>
                            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                                %{((params.growthRate - 1) * 100).toFixed(0)}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="0.8" max="1.5" step="0.05"
                            value={params.growthRate}
                            onChange={(e) => setParams(p => ({...p, growthRate: parseFloat(e.target.value)}))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700">Inflation Rate</label>
                            <span className="text-xs font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded">
                                %{(params.inflation * 100).toFixed(1)}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="0.2" step="0.01"
                            value={params.inflation}
                            onChange={(e) => setParams(p => ({...p, inflation: parseFloat(e.target.value)}))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                        />
                    </div>

                    <div>
                         <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700">Market Volatility</label>
                            <span className="text-xs font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                                {(params.marketVolatility * 10).toFixed(1)}/10
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="0.5" step="0.05"
                            value={params.marketVolatility}
                            onChange={(e) => setParams(p => ({...p, marketVolatility: parseFloat(e.target.value)}))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Summary Forecast</h4>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs">Month 24 Value</span>
                        <span className={`text-lg font-bold ${simulationData[23].value > simulationData[0].value ? 'text-emerald-600' : 'text-rose-600'}`}>
                            ${simulationData[23].value}
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-justify">
                        *Monte Carlo simulation calculated using random variables based on volatility.
                    </p>
                </div>
            </div>

            <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100 p-4 relative">
                 <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase tracking-wide z-10">Projection Chart</h4>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulationData}>
                        <defs>
                            <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip />
                        <Area type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="5 5" fill="none" name="Baseline Scenario" />
                        <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#colorSim)" strokeWidth={3} name="Simulated" />
                    </AreaChart>
                 </ResponsiveContainer>
            </div>
        </div>
    );
};

const SQLTool: React.FC = () => {
    const [query, setQuery] = useState('');
    const [generatedSQL, setGeneratedSQL] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if(!query.trim()) return;
        setLoading(true);
        const sql = await generateSQLFromText(query);
        setGeneratedSQL(sql);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col gap-6">
             <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        <Database size={20} className="text-indigo-600" />
                        Natural Language to SQL
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Create database queries using natural language.</p>
                </div>
             </div>

             <div className="flex gap-6 flex-1 min-h-0">
                <div className="w-1/2 flex flex-col gap-4">
                    <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-4 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g.: Get the total spending of customers in the 'Gold' segment who spent over $500 in the electronics category last month."
                            className="w-full h-full bg-transparent resize-none focus:outline-none text-zinc-700 placeholder:text-zinc-400 text-sm leading-relaxed"
                        />
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={loading || !query.trim()}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                        Generate SQL
                    </button>
                </div>

                <div className="w-1/2 bg-[#1e1e1e] rounded-lg p-4 overflow-auto relative group">
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-xs bg-white/10 text-white px-2 py-1 rounded hover:bg-white/20">Copy</button>
                    </div>
                    <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">
                        {generatedSQL || "-- SQL output will appear here..."}
                    </pre>
                </div>
             </div>
        </div>
    );
};

export default InnovationLab;