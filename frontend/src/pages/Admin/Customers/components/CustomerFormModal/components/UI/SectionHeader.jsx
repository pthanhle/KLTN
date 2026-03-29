import { memo } from 'react';

// Reusable Section Header to keep UI files perfectly DRY
export const SectionHeader = memo(({ icon: Icon, title }) => {
    return (
        <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 dark:bg-yellow-500/5 flex items-center justify-center">
                <Icon size={18} className="text-yellow-600 dark:text-yellow-500" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-widest">
                {title}
            </h3>
        </div>
    );
});
SectionHeader.displayName = 'SectionHeader';
