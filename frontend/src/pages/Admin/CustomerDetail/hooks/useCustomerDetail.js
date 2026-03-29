import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_CUSTOMERS } from '../../Customers/data/customers.mock';
import { MOCK_TIER_CONFIG } from '../../Customers/data/tierConfig.mock';

export const useCustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [tiersList, setTiersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('GARAGE');

    useEffect(() => {
        setIsLoading(true);
        // Simulate API fetch delay
        const timer = setTimeout(() => {
            const foundCustomer = MOCK_CUSTOMERS.find(c => c.id === id) || MOCK_CUSTOMERS[0];
            setCustomer(foundCustomer);
            setTiersList(MOCK_TIER_CONFIG);
            setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, [id]);

    return {
        customer,
        isLoading,
        activeTab,
        setActiveTab,
        isEditorOpen,
        setIsEditorOpen,
        tiersList
    };
};
