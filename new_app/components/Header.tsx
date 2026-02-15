import React, { useState } from 'react';
import { Search, Bell, Wifi, WifiOff, ChevronDown, Menu } from 'lucide-react';
import { AnalysisType } from '../types';

interface HeaderProps {
  isLive: boolean;
  toggleLive: () => void;
  onSearch: (query: string) => void;
  analysisType: AnalysisType;
  setAnalysisType: (type: AnalysisType) => void;
  toggleSidebar: () => void; // New prop
}

const Header: React.FC<HeaderProps> = ({ isLive, toggleLive, onSearch, analysisType, setAnalysisType, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 shadow-sm transition-all duration-300">
      
      {/* Left Area: Hamburger + Analysis Selector */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Analysis Type Selector */}
        <div className="relative group hidden sm:block">
            <select 
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value as AnalysisType)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 cursor-pointer hover:bg-slate-100 transition-colors"
            >
                {Object.values(AnalysisType).map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xs md:max-w-lg mx-4">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" size={18} />
          <input
            type="text"
            placeholder="AI'a sor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:bg-white transition-all"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleLive}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isLive 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {isLive ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isLive ? 'Canlı' : 'Bağlan'}
        </button>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow shrink-0"></div>
      </div>
    </header>
  );
};

export default Header;