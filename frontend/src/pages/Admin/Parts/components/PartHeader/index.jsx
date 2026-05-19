import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Home } from 'lucide-react';

const PartHeader = ({ t }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
                <nav className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm tracking-wide mb-3">
                    <span onClick={() => navigate('/admin/dashboard')} className="hover:text-yellow-500 transition-colors cursor-pointer flex items-center">
                        <Home size={14} />
                    </span>
                    <ChevronRight size={14} />
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold">{t('adminParts:breadcrumbParts')}</span>
                </nav>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {t('adminParts:title')}
                </h1>
            </div>
            <button 
                onClick={() => navigate('/admin/parts/create')}
                className="flex items-center gap-3 bg-yellow-500 dark:bg-yellow-500 text-white dark:text-[#141416] font-bold px-8 py-4 rounded-full shadow-xl hover:bg-yellow-600 transition-all scale-100 hover:scale-105 active:scale-95 outline-none"
            >
                <Plus size={20} strokeWidth={3} />
                {t('adminParts:btnAdd')}
            </button>
        </div>
    );
};

export default PartHeader;
