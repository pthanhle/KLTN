import { useState } from 'react';

export const useOrderPagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return {
        currentPage,
        pageSize,
        handleTableChange,
        resetPage
    };
};
