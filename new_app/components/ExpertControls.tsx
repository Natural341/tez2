import React from 'react';
import { Settings, Sliders } from 'lucide-react';
import { ExpertSettings } from '../types';

interface ExpertControlsProps {
  settings: ExpertSettings;
  setSettings: React.Dispatch<React.SetStateAction<ExpertSettings>>;
  isOpen: boolean;
  toggleOpen: () => void;
}

const ExpertControls: React.FC<ExpertControlsProps> = ({ settings, setSettings, isOpen, toggleOpen }) => {
  const handleChange = (key: keyof ExpertSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`bg-white border border-slate-100 rounded-xl shadow-sm transition-all duration-300 overflow-hidden ${isOpen ? 'mb-6' : 'mb-0 h-0 opacity-0'}`}>
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
                <Sliders size={18} className="text-slate-700" />
                <h3 className="font-bold text-slate-900">Manual Expert Calibration</h3>
            </div>
            <button onClick={toggleOpen} className="text-xs text-indigo-600 font-medium hover:underline">
                Close Panel
            </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Alpha Level */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">Alpha Level (α)</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{settings.alphaLevel}</span>
                </div>
                <input 
                    type="range" 
                    min="0.01" 
                    max="0.10" 
                    step="0.01" 
                    value={settings.alphaLevel}
                    onChange={(e) => handleChange('alphaLevel', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-xs text-slate-400">Threshold for statistical significance rejection.</p>
            </div>

            {/* Confidence Interval */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">Confidence Interval</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{settings.confidenceInterval}%</span>
                </div>
                <input 
                    type="range" 
                    min="80" 
                    max="99" 
                    step="1" 
                    value={settings.confidenceInterval}
                    onChange={(e) => handleChange('confidenceInterval', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                 <p className="text-xs text-slate-400">Probability that the population parameter falls within the range.</p>
            </div>

            {/* Smoothing Factor */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">Smoothing Factor</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{settings.smoothingFactor}</span>
                </div>
                <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.1" 
                    value={settings.smoothingFactor}
                    onChange={(e) => handleChange('smoothingFactor', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                 <p className="text-xs text-slate-400">Exponential moving average weight applied to live stream.</p>
            </div>

            {/* Outlier Threshold */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-700">Outlier Threshold (σ)</label>
                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">{settings.outlierThreshold}</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="0.5" 
                    value={settings.outlierThreshold}
                    onChange={(e) => handleChange('outlierThreshold', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                 <p className="text-xs text-slate-400">Standard deviations from mean to trigger anomaly alert.</p>
            </div>
        </div>
    </div>
  );
};

export default ExpertControls;