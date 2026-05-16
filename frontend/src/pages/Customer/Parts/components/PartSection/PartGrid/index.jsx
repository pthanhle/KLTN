import PartCard, { PartCardSkeleton } from '../PartCard';
import { useTranslation } from 'react-i18next';
import { usePaginationLogic } from './hooks/usePaginationLogic';
import EmptyState from './components/EmptyState';
import CustomPagination from './components/CustomPagination';

const PartGrid = ({ isLoading, isFiltering, parts, currentPage, totalPages, onPageChange }) => {
    const { t } = useTranslation('parts');
    const showLoading = isLoading || isFiltering;
    const { pageNumbers, showLastPage } = usePaginationLogic(currentPage, totalPages);

    return (
        <div className="flex-1 w-full flex flex-col">
            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                {showLoading ? (
                    Array.from({ length: 9 }).map((_, i) => <PartCardSkeleton key={i} />)
                ) : parts.length > 0 ? (
                    parts.map(part => <PartCard key={part.id} part={part} />)
                ) : (
                    <EmptyState t={t} />
                )}
            </div>

            {!showLoading && parts.length > 0 && totalPages > 1 && (
                <CustomPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    pageNumbers={pageNumbers}
                    showLastPage={showLastPage}
                />
            )}
        </div>
    );
};

export default PartGrid;
