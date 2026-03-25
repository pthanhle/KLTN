import React from 'react';
import { useTranslation } from 'react-i18next';

const QcSpecHud = ({ specs }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-slate-50 dark:bg-[#2e3447]/30 backdrop-blur-xl p-8 rounded-xl border border-slate-200 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
                <p className=" text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-1">{t('spec_pass_rate', 'Pass Rate')}</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-[#ffd165]">{specs.pass_rate}</p>
            </div>
            <div className="text-center">
                <p className=" text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-1">{t('spec_time_elapsed', 'Time Elapsed')}</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-[#ffd165]">{specs.time_elapsed}</p>
            </div>
            <div className="text-center">
                <p className=" text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-1">{t('spec_tech_count', 'Tech Count')}</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-[#ffd165]">{specs.tech_count}</p>
            </div>
            <div className="text-center">
                <p className=" text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-1">{t('spec_criticals', 'Criticals')}</p>
                <p className={`text-2xl md:text-3xl font-bold ${specs.criticals === '00' ? 'text-emerald-500 dark:text-[#4edea3]' : 'text-red-500 dark:text-[#ffb4ab]'}`}>
                    {specs.criticals}
                </p>
            </div>
        </div>
    );
};

export default QcSpecHud;
