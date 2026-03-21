import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User as UserIcon, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { AiAPI } from '../../services/api/ai';

const DEFAULT_BOT_MSG = { sender: 'bot', text: 'Chào bạn! Mình là trợ lý ảo của CarsShop 🚗. Bạn cần tư vấn về xe, dịch vụ, hay tra cứu lịch hẹn / đơn hàng ạ?' };

const AIChatbot = ({ isOpen, onClose }) => {
    // Load lịch sử từ localStorage
    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('carsShop_chatSessions');
        if (saved) return JSON.parse(saved);
        return [{ id: Date.now(), title: 'Hội thoại mới', messages: [DEFAULT_BOT_MSG] }];
    });
    
    const [currentSessionId, setCurrentSessionId] = useState(sessions[0]?.id);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Save vào localStorage
    useEffect(() => {
        localStorage.setItem('carsShop_chatSessions', JSON.stringify(sessions));
    }, [sessions]);

    // Cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [sessions, currentSessionId, isOpen, isLoading]);

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
    const messages = currentSession?.messages || [];

    const handleCreateNewSession = () => {
        const newSession = {
            id: Date.now(),
            title: `Hội thoại ${sessions.length + 1}`,
            messages: [DEFAULT_BOT_MSG]
        };
        setSessions([newSession, ...sessions]);
        setCurrentSessionId(newSession.id);
    };

    const handleDeleteSession = (e, id) => {
        e.stopPropagation();
        const updated = sessions.filter(s => s.id !== id);
        if (updated.length === 0) {
            const fresh = [{ id: Date.now(), title: 'Hội thoại mới', messages: [DEFAULT_BOT_MSG] }];
            setSessions(fresh);
            setCurrentSessionId(fresh[0].id);
        } else {
            setSessions(updated);
            if (currentSessionId === id) setCurrentSessionId(updated[0].id);
        }
    };

    const updateCurrentSessionMessages = (newMessages) => {
        setSessions(prev => prev.map(s => 
            s.id === currentSessionId ? { ...s, messages: newMessages } : s
        ));
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userMsg = inputText.trim();
        const newMessages = [...messages, { sender: 'user', text: userMsg }];
        
        // Đổi tên session nếu đây là câu hỏi đầu tiên của người dùng
        setSessions(prev => prev.map(s => {
            if (s.id === currentSessionId && s.messages.length === 1) {
                return { ...s, title: userMsg.slice(0, 20) + (userMsg.length > 20 ? '...' : ''), messages: newMessages };
            }
            if (s.id === currentSessionId) return { ...s, messages: newMessages };
            return s;
        }));
        
        setInputText('');
        setIsLoading(true);

        try {
            const res = await AiAPI.askPricing(userMsg);
            if (res && res.answer) {
                updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: res.answer }]);
            } else {
                updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: 'Xin lỗi, tôi chưa hiểu rõ ý bạn.' }]);
            }
        } catch (error) {
            console.error(error);
            updateCurrentSessionMessages([...newMessages, { sender: 'bot', text: 'Xin lỗi, hệ thống AI đang gặp sự cố.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-row w-[90vw] md:w-[700px] h-[550px] max-h-[85vh] bg-white dark:bg-[#161a23] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden font-sans animation-fade-in-up">
            
            {/* Sidebar (History) */}
            <div className="hidden md:flex flex-col w-[220px] bg-slate-50 dark:bg-[#0b0f19] border-r border-gray-200 dark:border-gray-800">
                <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                    <button 
                        onClick={handleCreateNewSession}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg font-bold text-sm transition-colors"
                    >
                        <Plus size={16} /> Nhắn tin mới
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase p-2">Lịch sử</p>
                    {sessions.map(s => (
                        <div 
                            key={s.id}
                            onClick={() => setCurrentSessionId(s.id)}
                            className={`flex items-center justify-between group p-2 rounded-lg cursor-pointer transition-colors ${
                                currentSessionId === s.id 
                                ? 'bg-white dark:bg-[#1e2330] shadow-sm border border-gray-100 dark:border-gray-800' 
                                : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-2 overflow-hidden">
                                <MessageSquare size={14} className={currentSessionId === s.id ? 'text-yellow-500' : 'text-slate-400'} />
                                <span className="text-sm text-slate-700 dark:text-slate-300 truncate font-medium">{s.title}</span>
                            </div>
                            <button 
                                onClick={(e) => handleDeleteSession(e, s.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#161a23]">
                {/* Header */}
                <div className="flex items-center justify-between bg-yellow-500 dark:bg-premium-gold px-4 py-3 text-slate-900 border-b border-yellow-600/20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                            <Bot size={18} className="text-slate-900" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[15px] leading-tight">CarsShop AI</h3>
                            <p className="text-[11px] font-medium opacity-80">Trợ lý tư vấn 24/7</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-900/10 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#0b0f19]">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                
                                <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-1">
                                    {msg.sender === 'user' ? (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300">
                                            <UserIcon size={12} />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center text-slate-900">
                                            <Bot size={12} />
                                        </div>
                                    )}
                                </div>

                                <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-[1.6] whitespace-pre-wrap break-words ${
                                    msg.sender === 'user'
                                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-tr-sm'
                                    : 'bg-white dark:bg-[#1e2330] border border-gray-100 dark:border-gray-800 text-slate-700 dark:text-slate-300 rounded-tl-sm shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>

                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex w-full justify-start">
                            <div className="flex gap-2 max-w-[85%] flex-row">
                                <div className="w-6 h-6 shrink-0 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 mt-1">
                                    <Bot size={12} />
                                </div>
                                <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#1e2330] border border-gray-100 dark:border-gray-800 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer */}
                <div className="p-3 bg-white dark:bg-[#161a23] border-t border-gray-100 dark:border-gray-800">
                    <form 
                        onSubmit={handleSendMessage}
                        className="flex items-center bg-slate-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800 rounded-full px-2 py-1.5"
                    >
                        <input 
                            type="text" 
                            placeholder="Hỏi AI tiếp..." 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none px-3 text-[14px] text-slate-700 dark:text-slate-300 placeholder-slate-400"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={!inputText.trim() || isLoading}
                            className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-yellow-500 transition-colors shrink-0"
                        >
                            <Send size={14} className="ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .animation-fade-in-up {
                    animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}} />
        </div>
    );
};

export default AIChatbot;
