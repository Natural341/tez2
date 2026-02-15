import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import LiveChart from './components/LiveChart';
import AIMentor from './components/AIMentor';
import ExpertControls from './components/ExpertControls';
import GlobalAssistant from './components/GlobalAssistant';
import DataSources from './components/pages/DataSources';
import Reports from './components/pages/Reports';
import Simulation from './components/pages/Simulation';
import SQLStudio from './components/pages/SQLStudio';
import AIChat from './components/pages/AIChat';
import { DataPoint, StatMetric, ExpertSettings, AnalysisType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLive, setIsLive] = useState(true);
  const [expertMode, setExpertMode] = useState(false);
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>(AnalysisType.VARIANCE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
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
    if (!isLive) return;

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
  }, [isLive]);

  // Derived Metrics
  const lastPoint = data[data.length - 1] || { valueA: 0, valueB: 0, confidence: 0 };
  
  const metrics: StatMetric[] = [
    { 
      label: 'Aktif Veri Akışı', 
      value: '2', 
      trend: 'neutral', 
      trendValue: 'Stabil', 
      icon: 'activity' 
    },
    { 
      label: 'Güven Skoru', 
      value: `${(lastPoint.confidence * 100).toFixed(1)}%`, 
      trend: lastPoint.confidence > 0.95 ? 'up' : 'neutral', 
      trendValue: lastPoint.confidence > 0.95 ? '+1.2%' : '0.0%', 
      icon: 'shield' 
    },
    { 
      label: 'Anomali Sayısı', 
      value: '0', 
      trend: 'down', 
      trendValue: '-2/saat', 
      icon: 'alert' 
    },
    { 
        label: 'Sapma (A/B)', 
        value: Math.abs(lastPoint.valueA - lastPoint.valueB).toFixed(2), 
        trend: Math.abs(lastPoint.valueA - lastPoint.valueB) > 15 ? 'up' : 'down', 
        trendValue: 'Yüksek Fark', 
        icon: 'users' 
      },
  ];

  // Render Page Content based on activeTab
  const renderContent = () => {
    switch(activeTab) {
      case 'sources':
        return <DataSources />;
      case 'reports':
        return <Reports />;
      case 'simulation':
        return <Simulation />;
      case 'sql':
        return <SQLStudio />;
      case 'chat':
        return <AIChat />;
      case 'analysis':
        return (
           <div className="space-y-6 animate-fade-in">
               <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900">Gelişmiş Analiz Ortamı</h2>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {analysisType} Modu Aktif
                    </span>
               </div>
               
               <ExpertControls 
                  settings={settings} 
                  setSettings={setSettings} 
                  isOpen={true} 
                  toggleOpen={() => {}}
                />
               <div className="h-[500px]">
                 <LiveChart 
                    data={data} 
                    expertMode={true} 
                    settings={settings} 
                    analysisType={analysisType}
                 />
               </div>
               <AIMentor 
                    data={data} 
                    expertMode={true} 
                    settings={settings} 
                    analysisType={analysisType}
                    userQuery={userQuery}
                    resetQuery={() => setUserQuery(null)}
                />
           </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="animate-fade-in">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, idx) => (
                    <StatCard key={idx} metric={metric} />
                ))}
            </div>

            {/* Expert Controls Toggle */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Uzman Kalibrasyonu</span>
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
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[200px]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-900">Canlı Veri Logları</h3>
                            <button className="text-indigo-600 text-xs font-medium hover:underline">Tümünü İndir (CSV)</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 font-semibold border-y border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">Zaman</th>
                                        <th className="px-4 py-3">Grup A</th>
                                        <th className="px-4 py-3">Grup B</th>
                                        <th className="px-4 py-3">Fark (Delta)</th>
                                        <th className="px-4 py-3">Bütünlük</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.slice().reverse().slice(0, 5).map((point, i) => (
                                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                                            <td className="px-4 py-2 font-mono text-xs text-slate-600">{point.time}</td>
                                            <td className="px-4 py-2">{point.valueA.toFixed(2)}</td>
                                            <td className="px-4 py-2">{point.valueB.toFixed(2)}</td>
                                            <td className="px-4 py-2">{(point.valueA - point.valueB).toFixed(2)}</td>
                                            <td className="px-4 py-2">
                                                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">ONAYLI</span>
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
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm">Sistem Sağlığı</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-500 font-medium">API Gecikmesi</span>
                                    <span className="text-slate-900 font-bold">45ms</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-500 font-medium">Şifreleme Durumu</span>
                                    <span className="text-slate-900 font-bold">AES-256</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300 relative">
        <Header 
            isLive={isLive} 
            toggleLive={() => setIsLive(!isLive)} 
            onSearch={(q) => setUserQuery(q)}
            analysisType={analysisType}
            setAnalysisType={setAnalysisType}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto">
            {renderContent()}
        </div>

        {/* Persistent Global Assistant - Only show if not on chat page to avoid double chat */}
        {activeTab !== 'chat' && <GlobalAssistant currentPage={activeTab} />}
      </main>
    </div>
  );
}

export default App;