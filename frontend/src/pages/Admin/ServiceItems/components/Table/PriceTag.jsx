import React from 'react';

const PriceTag = ({ type, t }) => {
    switch (type) {
        case 'FIXED':
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-[#1e3a8a]/10 dark:bg-[#1e3a8a]/30 text-blue-600 dark:text-[#60a5fa] border border-blue-200 dark:border-[#1e3a8a]/50 uppercase tracking-widest">
                    {t?.('adminServiceItems:form_price_fixed', 'Cố định') || 'Cố định'}
                </span>
            );
        case 'STARTING_AT':
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20 uppercase tracking-widest">
                    {t?.('adminServiceItems:form_price_starting', 'Từ giá') || 'Từ giá'}
                </span>
            );
        case 'CONTACT':
            return (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 uppercase tracking-widest">
                    {t?.('adminServiceItems:form_price_contact', 'Liên hệ') || 'Liên hệ'}
                </span>
            );
        default:
            return null;
    }
};

export default PriceTag;
