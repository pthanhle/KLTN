import React from 'react';
import { useTranslation } from 'react-i18next';
import { MOBILE_MENU_ITEMS } from '../../constants/trackingDetailConstants';

const BottomNavBar = ({ activeTab, setActiveTab }) => {
    const { t } = useTranslation('tracking');

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-6 lg:hidden bg-white/90 dark:bg-[#0A0A0B]/80 backdrop-blur-2xl border-t border-slate-200 dark:border-transparent shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[3rem]">
            {MOBILE_MENU_ITEMS.slice(0, 5).map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                const isCenter = idx === 2;

                if (isCenter) {
                    return (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center rounded-full p-3 mb-2 transform -translate-y-2 scale-110 shadow-lg transition-colors ${isActive ? 'bg-yellow-500 dark:bg-[#eab308] text-white dark:text-[#0A0A0B] shadow-yellow-500/30' : 'bg-slate-200 dark:bg-[#191f31] text-slate-500 dark:text-[#d3c5ac]'}`}>
                            <Icon className="w-5 h-5 mb-1" />
                            <span className=" text-[9px] font-bold uppercase tracking-wider">{t(item.labelKey, item.defaultLabel)}</span>
                        </button>
                    );
                }

                return (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center p-2 transition-colors ${isActive ? 'text-yellow-600 dark:text-[#ffd165]' : 'text-slate-500 dark:text-[#d3c5ac] hover:text-yellow-600 dark:hover:text-[#ffd165]'}`}>
                        <Icon className="w-5 h-5 mb-1" />
                        <span className=" text-[9px] font-bold uppercase tracking-wider">{t(item.labelKey, item.defaultLabel)}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;
