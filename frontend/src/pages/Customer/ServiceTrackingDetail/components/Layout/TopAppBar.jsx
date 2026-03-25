import React from 'react';
import { Bell, UserCircle, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TopAppBar = () => {
    const { t } = useTranslation('tracking');

    return (
        <header className="bg-white/80 dark:bg-[#0A0A0B]/60 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200 dark:border-transparent dark:shadow-[0_4px_10px_rgba(0,0,0,0.1),0_15px_30px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                <div className="text-xl font-bold tracking-tighter text-yellow-600 dark:text-[#ffd165]">{t('app_name', 'PRECISION TRACK')}</div>
                <div className="hidden md:flex gap-8">
                    <a className="text-slate-500 dark:text-[#d3c5ac]  tracking-tight font-semibold uppercase hover:text-yellow-600 dark:hover:text-[#ffd165] transition-colors" href="#">{t('nav_dashboard', 'Dashboard')}</a>
                    <a className="text-yellow-600 dark:text-[#ffd165] border-b-2 border-yellow-600 dark:border-yellow-500 pb-1  tracking-tight font-semibold uppercase" href="#">{t('nav_inventory', 'Inventory')}</a>
                    <a className="text-slate-500 dark:text-[#d3c5ac]  tracking-tight font-semibold uppercase hover:text-yellow-600 dark:hover:text-[#ffd165] transition-colors" href="#">{t('nav_support', 'Support')}</a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-slate-500 dark:text-[#d3c5ac] hover:text-yellow-600 dark:hover:text-[#ffd165] transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>
                    <button className="text-slate-500 dark:text-[#d3c5ac] hover:text-yellow-600 dark:hover:text-[#ffd165] transition-colors">
                        <UserCircle className="w-6 h-6" />
                    </button>
                    <button className="lg:hidden text-yellow-600 dark:text-[#ffd165]">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopAppBar;
