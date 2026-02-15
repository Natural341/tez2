import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, User, Sparkles } from 'lucide-react';
import { chatWithAssistant } from '@/lib/ai/dashboard-ai';
import { ChatMessage } from '@/types/new-dashboard';

const AIChat: React.FC = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'assistant',
            content: 'Hello! I am InsightFlow advanced analysis assistant. You can ask anything about your datasets, SQL queries, or statistical models. How can I help you?',
            timestamp: new Date()
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

        // In full page mode, context is generic or could be extended to include global state
        const context = "User is currently in Full Screen Chat mode."; 
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
        <div className="h-[calc(100vh-8rem)] flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Bot size={24} className="text-white" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">AI Assistant</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Sparkles size={12} className="text-indigo-500"/> Gemini 1.5 Flash Powered
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-indigo-100'}`}>
                                {msg.role === 'user' ? <User size={16} className="text-slate-600"/> : <Bot size={16} className="text-indigo-600"/>}
                            </div>
                            
                            {/* Bubble */}
                            <div className={`space-y-1 ${msg.role === 'user' ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                                <div className={`px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-slate-900 text-white rounded-tr-none' 
                                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                                <span className="text-[10px] text-slate-400 px-1">
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="flex justify-start">
                         <div className="flex gap-4 max-w-3xl">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                                <Bot size={16} className="text-indigo-600"/>
                            </div>
                            <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                                <Loader2 size={18} className="animate-spin text-indigo-600" />
                                <span className="text-sm text-slate-500 font-medium">Generating response...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-100">
                <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask complex analysis questions..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-slate-700 placeholder:text-slate-400 shadow-inner"
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim() || loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <p className="text-center text-[10px] text-slate-400 mt-3">
                    AI can make mistakes in statistical analysis. Always verify important decisions with manual data.
                </p>
            </div>
        </div>
    );
};

export default AIChat;