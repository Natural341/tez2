import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { DataPoint, ExpertSettings, AnalysisType } from '@/types/new-dashboard';

interface LiveChartProps {
  data: DataPoint[];
  expertMode: boolean;
  settings: ExpertSettings;
  analysisType: AnalysisType;
}

const LiveChart: React.FC<LiveChartProps> = ({ data, expertMode, settings, analysisType }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[400px] flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{analysisType}</h2>
          <p className="text-sm text-slate-500">
            {analysisType === AnalysisType.FORECAST 
                ? 'AI-based 15-minute future projection' 
                : 'Real-time data stream and comparison'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Group A (Target)
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> Group B (Control)
            </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              axisLine={false}
              tickLine={false}
              minTickGap={30}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              labelStyle={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="valueA" 
              stroke="#6366f1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorA)" 
              animationDuration={500}
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="valueB" 
              stroke="#38bdf8" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorB)" 
              animationDuration={500}
              isAnimationActive={false}
            />
            
            {expertMode && (
              <>
                <ReferenceLine y={settings.outlierThreshold + 50} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'right', value: 'UCL (Limit)', fill: '#f43f5e', fontSize: 10 }} />
                <ReferenceLine y={50 - settings.outlierThreshold} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'right', value: 'LCL (Limit)', fill: '#f43f5e', fontSize: 10 }} />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveChart;