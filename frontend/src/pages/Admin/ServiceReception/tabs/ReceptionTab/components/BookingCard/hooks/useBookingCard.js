import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

export const useBookingCard = (booking, onReschedule, onNoShow) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: booking._id,
        data: {
            type: 'booking',
            booking,
        },
    });

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = (e) => {
        if (e) e.stopPropagation();
        setIsMenuOpen(false);
    };

    const handleReschedule = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        if (onReschedule) onReschedule(booking);
    };

    const handleNoShow = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        if (onNoShow) onNoShow(booking._id);
    };

    return {
        isMenuOpen,
        handleMenuClick,
        closeMenu,
        handleReschedule,
        handleNoShow,
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    };
};
