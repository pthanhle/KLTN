export const ChartTooltipWrapper = ({ active, payload, children, minWidth = '170px' }) => {
    if (!active || !payload?.length) return null;
    return (
        <div 
            className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl shadow-xl border border-slate-100 dark:border-white/10"
            style={{ minWidth }}
        >
            {children}
        </div>
    );
};
