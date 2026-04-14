import { useState, useMemo, useCallback } from 'react';
import { normalizeMediaGallery } from '../utils/media.util';

export const useMediaGallery = (galleryData) => {
    const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
    const [currentIndex, setCurrentIndex] = useState(0);

    // Normalize data purely once when props change
    const normalizedData = useMemo(() => normalizeMediaGallery(galleryData), [galleryData]);

    const galleryItems = activeTab === 'photos' ? normalizedData.photos : normalizedData.videos;
    const hasItems = galleryItems.length > 0;

    const handleNext = useCallback(() => {
        if (!hasItems) return;
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, [galleryItems.length, hasItems]);

    const handlePrev = useCallback(() => {
        if (!hasItems) return;
        setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    }, [galleryItems.length, hasItems]);

    const getSafeIndex = useCallback((index) => {
        if (!hasItems) return 0;
        return (index + galleryItems.length) % galleryItems.length;
    }, [galleryItems.length, hasItems]);

    const handleTabChange = useCallback((tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            setCurrentIndex(0);
        }
    }, [activeTab]);

    return {
        activeTab,
        currentIndex,
        galleryItems,
        handleNext,
        handlePrev,
        getSafeIndex,
        handleTabChange,
        setCurrentIndex,
        hasItems
    };
};
