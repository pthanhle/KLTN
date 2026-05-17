import { Button } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomPagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    pageNumbers, 
    showLastPage 
}) => {
    return (
        <div className="flex justify-center items-center gap-1.5 pt-12 mt-auto">
            <Button
                type="text"
                icon={<ChevronLeft size={16} strokeWidth={2} />}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="!w-[34px] !h-[34px] !flex !items-center !justify-center !rounded-lg border border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-500 disabled:bg-slate-50/50 dark:disabled:bg-white/5"
            />

            {pageNumbers.map(page => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`!w-[34px] !h-[34px] !flex !items-center !justify-center !rounded-lg !font-bold !text-[13px] transition-all !border-none
                        ${currentPage === page
                            ? '!bg-yellow-500 !text-slate-900 shadow-[0_2px_8px_rgba(234,179,8,0.3)]'
                            : '!bg-transparent text-slate-500 dark:text-slate-400 hover:!bg-slate-100/80 dark:hover:!bg-white/10 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    {page}
                </Button>
            ))}

            {showLastPage && (
                <>
                    <span className="px-1.5 text-slate-400 dark:text-slate-500 font-bold tracking-widest text-[12px]">...</span>
                    <Button
                        onClick={() => onPageChange(totalPages)}
                        className="!w-[34px] !h-[34px] !flex !items-center !justify-center !rounded-lg !font-bold !text-[13px] transition-all !border-none !bg-transparent text-slate-500 dark:text-slate-400 hover:!bg-slate-100/80 dark:hover:!bg-white/10 hover:text-slate-900 dark:hover:text-white"
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                type="text"
                icon={<ChevronRight size={16} strokeWidth={2} />}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="!w-[34px] !h-[34px] !flex !items-center !justify-center !rounded-lg border border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-500 disabled:bg-slate-50/50 dark:disabled:bg-white/5"
            />
        </div>
    );
};

export default CustomPagination;
