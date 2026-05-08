import { Minus, X, Menu } from 'lucide-react';
import React from 'react';
import BrandLogo from '@/assets/images/brand/logo.png';
import IconButton from '../common/IconButton';

const Header = ({ onClose, t }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1c1c1e] border-b border-gray-100 dark:border-white/5 rounded-t-2xl shadow-sm z-20 relative">
            <div className="flex items-center gap-2">
                <IconButton icon={Menu} className="md:hidden" />
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <img src={BrandLogo} alt="AI Assistant" className="w-full h-full object-contain transition-all duration-300 [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm font-black tracking-widest text-slate-900 dark:text-yellow-500 uppercase font-headline">
                        {t('chatbot_title')}
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-slate-500 dark:text-slate-400">
                        {t('chatbot_subtitle')}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <IconButton icon={Minus} onClick={onClose} ariaLabel="Minimize" />
                <IconButton icon={X} onClick={onClose} size={22} ariaLabel="Close" />
            </div>
        </div>
    );
};
export default Header;
