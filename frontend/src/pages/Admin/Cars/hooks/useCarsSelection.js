import { useState, useCallback } from 'react';

export const useCarsSelection = (dataList = []) => {
    const [selectedKeys, setSelectedKeys] = useState([]);

    const toggleSelection = useCallback((id) => {
        setSelectedKeys(prev => 
            prev.includes(id) ? prev.filter(key => key !== id) : [...prev, id]
        );
    }, []);

    const toggleAllSelections = useCallback((isAllSelected) => {
        if (isAllSelected) {
            setSelectedKeys([]);
        } else {
            setSelectedKeys(dataList.map(item => item.id));
        }
    }, [dataList]);

    const resetSelection = useCallback(() => {
        setSelectedKeys([]);
    }, []);

    return {
        selectedKeys,
        setSelectedKeys,
        toggleSelection,
        toggleAllSelections,
        resetSelection
    };
};
