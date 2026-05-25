import { useState } from 'react';
import { FILTER_DEFAULT_VALUE } from '../constants/filterOptions';

export const useOrderFilters = () => {
    const [filterStatus, setFilterStatus] = useState(FILTER_DEFAULT_VALUE);
    const [filterPayment, setFilterPayment] = useState(FILTER_DEFAULT_VALUE);
    const [searchText, setSearchText] = useState('');

    return {
        filterStatus,
        setFilterStatus,
        filterPayment,
        setFilterPayment,
        searchText,
        setSearchText
    };
};
