import { useState, useRef, useCallback } from 'react';
import { calculateRotationIndex } from '../utils/physics.util';
import { THREE_SIXTY_CONFIG } from '../constants/threeSixty.constants';

export const useDragPhysics = (sequenceCount) => {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);

    const handlePointerDown = useCallback((e) => {
        if (sequenceCount === 0) return;
        setIsDragging(true);
        startX.current = e.clientX;
        e.target.setPointerCapture(e.pointerId);
    }, [sequenceCount]);

    const handlePointerMove = useCallback((e) => {
        if (!isDragging || sequenceCount === 0) return;

        const deltaX = e.clientX - startX.current;
        const nextIdx = calculateRotationIndex(
            deltaX,
            THREE_SIXTY_CONFIG.DRAG_SENSITIVITY,
            currentFrameIndex,
            sequenceCount
        );

        if (nextIdx !== null) {
            setCurrentFrameIndex(nextIdx);
            startX.current = e.clientX;
        }
    }, [isDragging, sequenceCount, currentFrameIndex]);

    const handlePointerUp = useCallback((e) => {
        setIsDragging(false);
        e.target.releasePointerCapture(e.pointerId);
    }, []);

    const resetIndex = useCallback(() => setCurrentFrameIndex(0), []);

    return {
        currentFrameIndex,
        isDragging,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        resetIndex
    };
};
