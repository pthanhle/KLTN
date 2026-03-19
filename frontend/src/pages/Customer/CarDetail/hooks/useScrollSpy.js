import { useEffect } from 'react';
import { scroller } from 'react-scroll';

const DEFAULT_SECTION_IDS = ['hero', 'price-color', 'design', 'technology', 'specs', 'gallery'];

export const useScrollSpy = (sectionIds = DEFAULT_SECTION_IDS) => {
    useEffect(() => {
        let isScrolling = false;
        let activeIndex = 0;
        let scrollTimeout = null;

        const jumpToSection = (index) => {
            if (index < 0 || index >= sectionIds.length) return;
            activeIndex = index;
            isScrolling = true;

            if (index === 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                scroller.scrollTo(sectionIds[index], {
                    duration: 900,
                    smooth: 'easeInOutQuart',
                    offset: -136
                });
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { isScrolling = false; }, 950);
        };

        const handleWheel = (e) => {
            const scrollableContainer = e.target.closest('.custom-scrollbar');
            if (scrollableContainer) {
                const { scrollTop, scrollHeight, clientHeight } = scrollableContainer;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = Math.max(0, scrollHeight - (scrollTop + clientHeight)) <= 1;

                if (e.deltaY > 0 && !isAtBottom) {
                    return;
                }
                if (e.deltaY < 0 && !isAtTop) {
                    return;
                }
            }

            e.preventDefault();
            if (isScrolling) return;

            if (e.deltaY > 0) {
                jumpToSection(activeIndex + 1);
            } else if (e.deltaY < 0) {
                jumpToSection(activeIndex - 1);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                if (!isScrolling) jumpToSection(activeIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (!isScrolling) jumpToSection(activeIndex - 1);
            }
        };

        const handleInitialScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            activeIndex = 0;
        };
        handleInitialScroll();

        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(scrollTimeout);
        };
    }, [sectionIds]);
};
