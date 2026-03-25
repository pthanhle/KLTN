import React from 'react';

const HudStatCard = ({ label, value, unit }) => {
    return (
        <div className="bg-white/90 dark:bg-slate-800/40 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-6 rounded-2xl min-w-[140px] shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-500 mb-1">{label}</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                {value}
                {unit && <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>}
            </p>
        </div>
    );
};

export default HudStatCard;
