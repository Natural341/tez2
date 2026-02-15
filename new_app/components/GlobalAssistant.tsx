import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAssistant } from '../services/geminiService';

interface GlobalAssistantProps {
  currentPage: string;
}

const GlobalAssistant: React.FC<GlobalAssistantProps> = ({ currentPage }) => {
  // Varsayılan olarak açık (isOpen: true)
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'Merhaba. Ben StatFlow Güvenli Analiz Asistanı. Veri setlerinizdeki anomali veya trendleri incelemeye hazırım. Nasıl yardımcı olabilirim?',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = `Kullanıcı şu an ${currentPage} sayfasını görüntülüyor.`;
    const responseText = await chatWithAssistant([...messages, userMsg], context);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-200 w-96 mb-4 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 h-[500px]' : 'opacity-0 scale-90 h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center border border-indigo-400">
                    <Bot size={18} fill="white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">StatFlow AI</h3>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-slate-300 font-medium tracking-wide uppercase">Online • Güvenli Hat</p>
                    </div>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <Minimize2 size={18} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                                ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                        }`}
                    >
                        {msg.content}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-indigo-600" />
                        <span className="text-xs text-slate-500">Analiz ediliyor...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            <form onSubmit={handleSubmit} className="relative">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Bir soru sorun veya talimat verin..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all placeholder:text-slate-400"
                />
                <button 
                    type="submit" 
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={14} />
                </button>
            </form>
        </div>
      </div>

      {/* FAB Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
            isOpen ? 'bg-slate-800 text-slate-400 rotate-90' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
};

export default GlobalAssistant;