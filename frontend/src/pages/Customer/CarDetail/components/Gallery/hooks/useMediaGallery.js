import { useState, useMemo, useCallback } from 'react';
import { normalizeMediaGallery } from '../utils/media.util';

export const useMediaGallery = (galleryData) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const normalizedData = useMemo(() => normalizeMediaGallery(galleryData), [galleryData]);

    const galleryItems = normalizedData.photos;
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

    return {
        currentIndex,
        galleryItems,
        handleNext,
        handlePrev,
        getSafeIndex,
        setCurrentIndex,
        hasItems
    };
};
