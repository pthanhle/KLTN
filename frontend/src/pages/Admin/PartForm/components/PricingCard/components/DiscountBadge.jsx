import React from 'react';

const DiscountBadge = ({ percent, label }) => {
    if (!percent || percent <= 0) return null;

    return (
        <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-emerald-500/30 animate-pulse">
            {label}
        </span>
    );
};

export default DiscountBadge;
