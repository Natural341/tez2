import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  LineChart, 
  FileText, 
  Settings, 
  Zap,
  Terminal,
  SlidersHorizontal,
  MessageSquareText,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean; // Control visibility on mobile
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, closeSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'sources', label: 'Veri Kaynakları', icon: Database },
    { id: 'sql', label: 'SQL Stüdyo', icon: Terminal },
    { id: 'simulation', label: 'Simülasyon', icon: SlidersHorizontal },
    { id: 'analysis', label: 'Canlı Analiz', icon: LineChart },
    { id: 'reports', label: 'Raporlar', icon: FileText },
    { id: 'chat', label: 'AI Asistan', icon: MessageSquareText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    closeSidebar(); // Auto close on mobile selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-100 flex flex-col shadow-xl md:shadow-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">StatFlow</span>
          </div>
          {/* Close button for mobile */}
          <button onClick={closeSidebar} className="md:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-50 text-slate-900 shadow-sm border border-slate-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-900 mb-1">Pro Plan Aktif</p>
            <p className="text-xs text-slate-500 mb-3">Yenileme: 24 Eki</p>
            <button className="w-full bg-white border border-slate-200 text-xs font-medium py-2 rounded-lg hover:border-slate-300 transition-colors shadow-sm text-slate-700">
              Hesabı Yönet
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;