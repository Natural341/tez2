import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Simulation: React.FC = () => {
    const [params, setParams] = useState({
        growthRate: 1.05,
        inflation: 0.02,
        marketVolatility: 0.1
    });

    const simulationData = useMemo(() => {
        const data = [];
        let baseValue = 1000;
        for (let i = 0; i < 24; i++) {
            const randomFactor = 1 + (Math.random() - 0.5) * params.marketVolatility;
            const growthFactor = Math.pow(params.growthRate, 1/12); 
            const inflationImpact = 1 - (params.inflation / 12);
            
            baseValue = baseValue * growthFactor * inflationImpact * randomFactor;
            
            data.push({
                month: `Month ${i + 1}`,
                value: Math.round(baseValue),
                baseline: Math.round(1000 * Math.pow(1.02, i/12)) 
            });
        }
        return data;
    }, [params]);

    return (
        <div className="animate-fade-in pb-10 h-full flex flex-col">
             <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Scenario Simulation</h2>
                <p className="text-slate-500 mt-1">Model future possibilities using the Monte Carlo method.</p>
             </div>

             <div className="flex flex-1 gap-8 min-h-0">
                {/* Controls Sidebar */}
                <div className="w-80 bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-y-auto">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6">
                        <SlidersHorizontal size={20} className="text-indigo-600"/> Parameters
                    </h3>

                    <div className="space-y-8">
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

                    <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Summary Forecast (24 Months)</h4>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-xs">Expected Value</span>
                            <span className={`text-lg font-bold ${simulationData[23].value > simulationData[0].value ? 'text-emerald-600' : 'text-rose-600'}`}>
                                ${simulationData[23].value}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900">Projection Chart</h4>
                        <div className="flex gap-4 text-xs font-medium">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Baseline</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Simulation</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-0">
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
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="baseline" stroke="#94a3b8" strokeDasharray="5 5" fill="none" name="Baseline Scenario" />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#colorSim)" strokeWidth={3} name="Simulated" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default Simulation;