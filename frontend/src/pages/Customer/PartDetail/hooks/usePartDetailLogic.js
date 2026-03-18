import { useState, useEffect } from 'react';
import { getMockPartDetail } from '../data/mockPartDetail';
import { useTranslation } from 'react-i18next';

export const usePartDetailLogic = (id) => {
    const { t } = useTranslation('parts');
    const [part, setPart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // State Options variants
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Simulate API fetch
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setPart(getMockPartDetail(id));
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    const handleOptionSelect = (optionName, choice) => {
        setSelectedOptions(prev => ({ ...prev, [optionName]: choice }));
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') setQuantity(q => q + 1);
        if (type === 'decrement' && quantity > 1) setQuantity(q => q - 1);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    };

    const handleAddToCart = () => {
        console.log('Thêm vào giỏ:', { id: part.id, quantity, options: selectedOptions });
        // Typically triggers mini-cart Context
    };

    const handleBuyNow = () => {
        console.log('Mua ngay, redirect tới checkout');
    };

    const submitReview = (rating, comment) => {
        console.log('User submitted review:', rating, comment);
    };

    return {
        t,
        part,
        isLoading,
        selectedOptions,
        quantity,
        activeTab,
        setActiveTab,
        handleOptionSelect,
        handleQuantityChange,
        formatCurrency,
        handleAddToCart,
        handleBuyNow,
        submitReview
    };
};
