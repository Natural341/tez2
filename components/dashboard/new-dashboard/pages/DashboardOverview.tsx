"use client"

import React, { useState, useEffect } from 'react';
import StatCard from '../StatCard';
import LiveChart from '../LiveChart';
import ExpertControls from '../ExpertControls';
import AIMentor from '../AIMentor';
import GlobalAssistant from '../GlobalAssistant';
import { DataPoint, StatMetric, ExpertSettings, AnalysisType } from '@/types/new-dashboard';
import { Activity, Shield, AlertCircle, Users } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const [expertMode, setExpertMode] = useState(false);
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>(AnalysisType.VARIANCE);
  
  // Data State
  const [data, setData] = useState<DataPoint[]>([]);
  const [settings, setSettings] = useState<ExpertSettings>({
    alphaLevel: 0.05,
    confidenceInterval: 95,
    smoothingFactor: 0.5,
    outlierThreshold: 3
  });

  // Mock initial data generation
  useEffect(() => {
    const initialData: DataPoint[] = [];
    const now = new Date();
    for (let i = 20; i > 0; i--) {
      const time = new Date(now.getTime() - i * 1000);
      initialData.push({
        time: time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        valueA: 40 + Math.random() * 20,
        valueB: 35 + Math.random() * 25,
        confidence: 0.9 + Math.random() * 0.09
      });
    }
    setData(initialData);
  }, []);

  // Live Data Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const now = new Date();
        const newPoint: DataPoint = {
          time: now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          valueA: 40 + Math.random() * 20 + (Math.sin(now.getTime() / 1000) * 10),
          valueB: 35 + Math.random() * 25 + (Math.cos(now.getTime() / 1000) * 8),
          confidence: 0.9 + Math.random() * 0.09
        };
        const newData = [...prevData, newPoint];
        if (newData.length > 30) newData.shift(); 
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Derived Metrics
  const lastPoint = data[data.length - 1] || { valueA: 0, valueB: 0, confidence: 0 };
  
  const metrics: StatMetric[] = [
    { 
      label: 'Active Data Streams', 
      value: '2', 
      trend: 'neutral', 
      trendValue: 'Stable', 
      icon: 'activity' 
    },
    { 
      label: 'Confidence Score', 
      value: `${(lastPoint.confidence * 100).toFixed(1)}%`, 
      trend: lastPoint.confidence > 0.95 ? 'up' : 'neutral', 
      trendValue: lastPoint.confidence > 0.95 ? '+1.2%' : '0.0%', 
      icon: 'shield' 
    },
    { 
      label: 'Anomaly Count', 
      value: '0', 
      trend: 'down', 
      trendValue: '-2/hour', 
      icon: 'alert' 
    },
    { 
        label: 'Variance (A/B)', 
        value: Math.abs(lastPoint.valueA - lastPoint.valueB).toFixed(2), 
        trend: Math.abs(lastPoint.valueA - lastPoint.valueB) > 15 ? 'up' : 'down', 
        trendValue: 'High Diff', 
        icon: 'users' 
      },
  ];

  return (
    <div className="animate-fade-in space-y-6">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => (
                <StatCard key={idx} metric={metric} />
            ))}
        </div>

        {/* Expert Controls Toggle */}
        <div className="flex justify-end items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expert Calibration</span>
                <button 
                    onClick={() => setExpertMode(!expertMode)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${expertMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${expertMode ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>

        {/* Expert Settings Panel */}
        <ExpertControls 
            settings={settings} 
            setSettings={setSettings} 
            isOpen={expertMode} 
            toggleOpen={() => setExpertMode(!expertMode)}
        />

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 space-y-6">
                <LiveChart 
                    data={data} 
                    expertMode={expertMode} 
                    settings={settings}
                    analysisType={analysisType}
                />
                
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm min-h-[200px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-zinc-900">Live Data Logs</h3>
                        <button className="text-blue-600 text-xs font-medium hover:underline">Download All (CSV)</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-zinc-500">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 font-semibold border-y border-zinc-200">
                                <tr>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Group A</th>
                                    <th className="px-4 py-3">Group B</th>
                                    <th className="px-4 py-3">Delta</th>
                                    <th className="px-4 py-3">Integrity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice().reverse().slice(0, 5).map((point, i) => (
                                    <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50/50">
                                        <td className="px-4 py-2 font-mono text-xs text-zinc-600">{point.time}</td>
                                        <td className="px-4 py-2">{point.valueA.toFixed(2)}</td>
                                        <td className="px-4 py-2">{point.valueB.toFixed(2)}</td>
                                        <td className="px-4 py-2">{(point.valueA - point.valueB).toFixed(2)}</td>
                                        <td className="px-4 py-2">
                                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">VERIFIED</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Sidebar Right / AI Panel */}
            <div className="space-y-6">
                <AIMentor 
                    data={data} 
                    expertMode={expertMode} 
                    settings={settings} 
                    analysisType={analysisType}
                    userQuery={userQuery}
                    resetQuery={() => setUserQuery(null)}
                />
                
                {/* Secondary Widgets */}
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 className="font-bold text-zinc-900 mb-4 text-sm">System Health</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-zinc-500 font-medium">API Latency</span>
                                <span className="text-zinc-900 font-bold">45ms</span>
                            </div>
                            <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-zinc-500 font-medium">Encryption Status</span>
                                <span className="text-zinc-900 font-bold">AES-256</span>
                            </div>
                            <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GlobalAssistant currentPage="Dashboard" />
    </div>
  );
};

export default DashboardOverview;
