import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when a modal or overlay is open
 * Prevents layout shift (UI jumping) by compensating for the scrollbar width
 * @param {boolean} isLocked - Whether the scroll should be locked
 */
export const useLockBodyScroll = (isLocked = true) => {
    useEffect(() => {
        if (!isLocked) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            return;
        }

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
};
