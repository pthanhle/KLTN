import { useState } from 'react';
import { FILTER_DEFAULT_VALUE } from '../constants/carsConstants';

export const useCarsFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [brand, setBrand] = useState(FILTER_DEFAULT_VALUE);
    const [bodyStyle, setBodyStyle] = useState(FILTER_DEFAULT_VALUE);
    const [status, setStatus] = useState(FILTER_DEFAULT_VALUE);

    const resetFilters = () => {
        setSearchTerm('');
        setBrand(FILTER_DEFAULT_VALUE);
        setBodyStyle(FILTER_DEFAULT_VALUE);
        setStatus(FILTER_DEFAULT_VALUE);
    };

    return {
        searchTerm, setSearchTerm,
        filterBrand: brand, setFilterBrand: setBrand,
        filterBodyStyle: bodyStyle, setFilterBodyStyle: setBodyStyle,
        filterStatus: status, setFilterStatus: setStatus,
        resetFilters
    };
};
