import React from 'react';
import { StatMetric } from '@/types/new-dashboard';
import { Activity, ShieldCheck, AlertTriangle, Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  metric: StatMetric;
}

const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.icon) {
      case 'activity': return <Activity size={20} className="text-indigo-600" />;
      case 'shield': return <ShieldCheck size={20} className="text-emerald-600" />;
      case 'alert': return <AlertTriangle size={20} className="text-amber-500" />;
      case 'users': return <Users size={20} className="text-blue-500" />;
      default: return <Activity size={20} />;
    }
  };

  const getTrendIcon = () => {
    if (metric.trend === 'up') return <TrendingUp size={14} className="mr-1" />;
    if (metric.trend === 'down') return <TrendingDown size={14} className="mr-1" />;
    return <Minus size={14} className="mr-1" />;
  };

  const getTrendColor = () => {
    if (metric.trend === 'up') return 'text-emerald-600 bg-emerald-50';
    if (metric.trend === 'down') return 'text-rose-600 bg-rose-50';
    return 'text-slate-600 bg-slate-50';
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
          {getIcon()}
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          {metric.trendValue}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.label}</h3>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{metric.value}</p>
      </div>
    </div>
  );
};

export default StatCard;