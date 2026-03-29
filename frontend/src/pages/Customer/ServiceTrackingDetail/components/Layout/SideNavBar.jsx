import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Button } from 'antd';
import { TRACKING_MENU_ITEMS } from '../../constants/trackingDetailConstants';

const SideNavBar = ({ technician, activeTab, setActiveTab }) => {
    const { t } = useTranslation('tracking');

    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 left-0 p-6 bg-slate-50 dark:bg-[#000000] rounded-r-[3rem] shadow-[2px_0_15px_rgba(0,0,0,0.05)] dark:shadow-none z-40 border-r border-slate-200 dark:border-transparent">
            <div className="mb-10 px-4">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('portal_title', 'Service Portal')}</h1>
                <p className=" uppercase tracking-[0.1em] text-xs text-slate-500 dark:text-[#d3c5ac]">{t('portal_subtitle', 'Elite Performance Hub')}</p>
            </div>
            
            <nav className="flex-1 space-y-2">
                {TRACKING_MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.id === activeTab;
                    return (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
                                isActive 
                                    ? 'bg-yellow-100 dark:bg-[#eab308]/10 text-yellow-700 dark:text-[#ffd165] translate-x-1 shadow-sm' 
                                    : 'text-slate-500 dark:text-[#d3c5ac] hover:bg-slate-100 dark:hover:bg-[#191f31]'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'fill-current opacity-20' : ''}`} />
                            <span className={` uppercase tracking-[0.1em] text-xs ${isActive ? 'font-bold' : ''}`}>
                                {t(item.labelKey, item.defaultLabel)}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {technician && (
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-[#2e3447] flex items-center justify-center overflow-hidden shrink-0">
                            <Image 
                                src={technician.avatar} 
                                alt={technician.name} 
                                preview={false} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{technician.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider truncate">{technician.role}</p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default SideNavBar;
