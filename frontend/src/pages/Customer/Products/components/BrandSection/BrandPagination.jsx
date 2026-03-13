import { ChevronLeft, ChevronRight } from 'lucide-react';

const BrandPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // A simple function to generate pagination array.
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-16 pb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
            >
                <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, index) => {
                    const isDots = page === '...';
                    const isActive = page === currentPage;

                    if (isDots) {
                        return (
                            <span key={`${page}-${index}`} className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold tracking-widest">
                                {page}
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all
                                ${isActive 
                                    ? 'bg-yellow-500 text-white dark:text-slate-900 shadow-md shadow-yellow-500/20' 
                                    : 'bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 shadow-sm'
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm"
            >
                <ChevronRight size={18} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default BrandPagination;
