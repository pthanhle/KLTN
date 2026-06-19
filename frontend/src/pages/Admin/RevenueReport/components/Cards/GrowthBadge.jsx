import { TrendingUp, TrendingDown } from 'lucide-react';

export const GrowthBadge = ({ value }) => {
    if (value === null || value === undefined) return null;
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                isPositive
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
        >
            <Icon size={10} />
            {isPositive ? '+' : ''}
            {value.toFixed(1)}%
        </span>
    );
};
