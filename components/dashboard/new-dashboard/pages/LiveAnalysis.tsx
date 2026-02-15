"use client"

import React, { useState, useEffect } from 'react';
import LiveChart from '../LiveChart';
import ExpertControls from '../ExpertControls';
import AIMentor from '../AIMentor';
import { DataPoint, ExpertSettings, AnalysisType } from '@/types/new-dashboard';

const LiveAnalysis: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>(AnalysisType.VARIANCE);
  const [expertMode, setExpertMode] = useState(true);
  const [userQuery, setUserQuery] = useState<string | null>(null);
  
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

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Advanced Analysis Environment</h2>
                <p className="text-slate-500 mt-1">Real-time statistical monitoring and AI interpretation.</p>
            </div>
            <div className="flex items-center gap-3">
                <select 
                    value={analysisType}
                    onChange={(e) => setAnalysisType(e.target.value as AnalysisType)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100"
                >
                    {Object.values(AnalysisType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {analysisType} Mode Active
                </span>
            </div>
        </div>
        
        <ExpertControls 
            settings={settings} 
            setSettings={setSettings} 
            isOpen={expertMode} 
            toggleOpen={() => setExpertMode(!expertMode)}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <LiveChart 
                    data={data} 
                    expertMode={expertMode} 
                    settings={settings} 
                    analysisType={analysisType}
                />
            </div>
            <div>
                <AIMentor 
                    data={data} 
                    expertMode={expertMode} 
                    settings={settings} 
                    analysisType={analysisType}
                    userQuery={userQuery}
                    resetQuery={() => setUserQuery(null)}
                />
            </div>
        </div>
    </div>
  );
};

export default LiveAnalysis;
