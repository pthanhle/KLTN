import { useState } from 'react';

export const useCarFormUI = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return {
        activeTab,
        setActiveTab
    };
};
