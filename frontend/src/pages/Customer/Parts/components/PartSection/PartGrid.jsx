import { Button, Pagination } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PartCard, { PartCardSkeleton } from './PartCard';
import { useTranslation } from 'react-i18next';

const PartGrid = ({ isLoading, isFiltering, parts, currentPage, totalPages, onPageChange }) => {
    const { t } = useTranslation('parts');
    const showLoading = isLoading || isFiltering;

    const pageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 3) return [1, 2, 3, 4, 5];
        if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    };
    
    const showLastPage = totalPages > 5 && !pageNumbers().includes(totalPages);

    return (
        <div className="flex-1 w-full flex flex-col">
            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                {showLoading ? (
                    Array.from({ length: 9 }).map((_, i) => <PartCardSkeleton key={i} />)
                ) : parts.length > 0 ? (
                    parts.map(part => <PartCard key={part._id} part={part} />)
                ) : (
                    <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                        <p className="text-[16px] font-bold text-slate-800 dark:text-white mb-2">{t('no_parts_found', 'Không tìm thấy phụ tùng nào')}</p>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">{t('no_parts_desc', 'Vui lòng thử nghiệm lại bộ lọc hoặc từ khóa tìm kiếm')}</p>
                    </div>
                )}
            </div>

            {!showLoading && parts.length > 0 && totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 pt-12 mt-auto">
                    <Button
                        type="text"
                        icon={<ChevronLeft size={16} strokeWidth={2} />}
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="!w-[34px] !h-[34px] !flex !items-center !justify-center !rounded-lg border border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-500 disabled:bg-slate-50/50 dark:disabled:bg-white/5"
                    />

                    {pageNumbers().map(page => (
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
            )}
        </div>
    );
};
export default PartGrid;
