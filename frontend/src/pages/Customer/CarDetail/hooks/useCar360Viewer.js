import { useState, useRef, useEffect } from 'react';

export const useCar360Viewer = (imageSequence) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const startXRef = useRef(0);

    const sensitivity = 15;

    const handlePointerDown = (e) => {
        setIsDragging(true);
        startXRef.current = e.clientX || e.touches[0].clientX;
        document.body.style.userSelect = "none";
    };

    const handlePointerMove = (e) => {
        if (!isDragging || !imageSequence || imageSequence.length === 0) return;

        const currentX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const deltaX = currentX - startXRef.current;

        if (Math.abs(deltaX) > sensitivity) {
            const framesToMove = Math.floor(deltaX / sensitivity);

            let nextFrame = (currentFrame + framesToMove) % imageSequence.length;
            if (nextFrame < 0) nextFrame += imageSequence.length;

            setCurrentFrame(nextFrame);
            startXRef.current = currentX;
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchend', handlePointerUp);
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('touchmove', handlePointerMove);
        } else {
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchend', handlePointerUp);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
        }
        return () => {
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchend', handlePointerUp);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
        };
    }, [isDragging, currentFrame, imageSequence]);

    useEffect(() => {
        if (imageSequence) {
            imageSequence.forEach(src => {
                const img = new window.Image();
                img.src = src;
            });
            setCurrentFrame(0);
        }
    }, [imageSequence]);

    return {
        currentFrame,
        containerRef,
        handlePointerDown,
    };
};
