import React from 'react';
import BrandLogo from '@/assets/images/brand/logo.png';

const AITyping = () => {
    return (
        <div className="flex items-end gap-2 max-w-full">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 mb-1">
                <img src={BrandLogo} alt="AI Typing" className="w-full h-full object-contain transition-all duration-300 [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/40 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center border border-slate-200 dark:border-white/5">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
        </div>
    );
};
export default AITyping;
