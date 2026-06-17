import React from 'react';

export const InfoField = ({ label, value, fallback = 'Chưa cập nhật', valueClass = '', colSpan = 1 }) => {
    return (
        <div className={`col-span-${colSpan}`}>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
            {value ? (
                <p className={`font-medium text-slate-800 dark:text-slate-200 ${valueClass}`}>
                    {value}
                </p>
            ) : (
                <p className="text-slate-400 italic font-normal text-sm">{fallback}</p>
            )}
        </div>
    );
};
