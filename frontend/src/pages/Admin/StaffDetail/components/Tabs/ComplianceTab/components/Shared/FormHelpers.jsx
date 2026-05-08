import React from 'react';

export const InfoRow = ({ label, children }) => (
    <div className="flex flex-col mb-4 last:mb-0">
        <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">{label}</span>
        <div className="text-sm text-slate-800 dark:text-slate-200">{children}</div>
    </div>
);

export const FieldWrapper = ({ label, error, children }) => (
    <div className="flex flex-col mb-4 last:mb-0">
        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">{label}</label>
        {children}
        {error && <span className="text-red-500 text-xs mt-0.5">{error.message}</span>}
    </div>
);
