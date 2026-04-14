/**
 * Calculates the next frame index based on drag math
 * @param {number} deltaX - The pixel distance pointer travelled
 * @param {number} sensitivity - Distance required to trigger snap
 * @param {number} currentIdx - The current frame
 * @param {number} totalFrames - Total frames limit
 * @returns {number|null} The next index, or null if distance is not large enough
 */
export const calculateRotationIndex = (deltaX, sensitivity, currentIdx, totalFrames) => {
    if (Math.abs(deltaX) <= sensitivity) return null;
    
    // Drag right (+) generally turns car to the right (viewing left side), so we go -1 index
    const offset = deltaX > 0 ? -1 : 1; 

    let nextIdx = currentIdx + offset;
    
    // Infinite loop mapping
    if (nextIdx < 0) nextIdx = totalFrames - 1;
    if (nextIdx >= totalFrames) nextIdx = 0;

    return nextIdx;
};
