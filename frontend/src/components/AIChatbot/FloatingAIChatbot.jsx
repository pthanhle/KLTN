import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import AIChatbot from './index.jsx';

const FloatingAIChatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            {/* Floating Action Button */}
            {!isChatOpen && (
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:-translate-y-1 transition-all duration-300 group ring-4 ring-yellow-500/30"
                >
                    <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-[#0b0f19]"></span>
                    </span>
                </button>
            )}

            {/* AI Chatbot Main Modal Content */}
            <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default FloatingAIChatbot;
