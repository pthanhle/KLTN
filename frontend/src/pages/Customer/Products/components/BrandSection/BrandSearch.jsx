import { Search, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BrandSearch = ({ search, onSearchChange, placeholder, isLoading, isFiltering }) => {
    // Only show skeleton on the absolute initial load
    if (isLoading) {
        return <Skeleton className="w-full max-w-2xl mx-auto h-14 rounded-full" />;
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto group">
            {isFiltering ? (
                <Loader2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500 animate-spin" strokeWidth={2.5} />
            ) : (
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors" strokeWidth={2} />
            )}
            
            <input 
                type="text" 
                placeholder={placeholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#141416] border border-slate-200/60 dark:border-white/10 rounded-full text-sm font-medium text-slate-800 dark:text-white outline-none focus:border-slate-400/50 dark:focus:border-white/30 shadow-sm focus:shadow-md transition-all placeholder:text-slate-400"
            />
        </div>
    );
};

export default BrandSearch;
