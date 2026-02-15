import React from 'react';
import { ReportItem } from '@/types/new-dashboard';
import { FileText, Download, Filter, Search, Calendar } from 'lucide-react';

const Reports: React.FC = () => {
  const reports: ReportItem[] = [
    { id: '1', title: 'Q3 Variance Analysis', date: 'Oct 24, 2023', type: 'PDF', size: '2.4 MB', status: 'ready' },
    { id: '2', title: 'User Anomaly Log', date: 'Oct 23, 2023', type: 'CSV', size: '850 KB', status: 'ready' },
    { id: '3', title: 'Full System Audit', date: 'Oct 22, 2023', type: 'XLSX', size: '4.1 MB', status: 'ready' },
    { id: '4', title: 'Weekly Performance', date: 'Oct 20, 2023', type: 'PDF', size: '1.2 MB', status: 'processing' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Generated Reports</h2>
          <p className="text-slate-500 mt-1">Access historical analysis and export raw data.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Calendar size={16} />
                Select Range
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <FileText size={16} />
                Generate New
            </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Search reports..." 
                className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none text-slate-700 placeholder:text-slate-400"
            />
        </div>
        <div className="w-px h-6 bg-slate-200"></div>
        <button className="flex items-center gap-2 px-4 text-sm font-medium text-slate-600 hover:text-slate-900">
            <Filter size={16} />
            Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
            <div key={report.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                        <FileText size={24} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    {report.status === 'ready' ? (
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <Download size={18} />
                        </button>
                    ) : (
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Processing</span>
                    )}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 truncate">{report.title}</h3>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                    <span>{report.date}</span>
                    <span className="uppercase font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{report.type}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;