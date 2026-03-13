import { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

const Car360Viewer = ({ imageSequence, t }) => {
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
                const img = new Image();
                img.src = src;
            });
            setCurrentFrame(0);
        }
    }, [imageSequence]);

    if (!imageSequence || imageSequence.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[4/3] flex items-center justify-center cursor-ew-resize select-none touch-none overflow-hidden"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
        >
            <div className="absolute bottom-10 w-[70%] h-[20px] bg-black/40 blur-[20px] rounded-[100%] pointer-events-none z-0"></div>

            <img
                src={imageSequence[currentFrame]}
                alt="360 View"
                draggable="false"
                className="w-full h-full object-contain pointer-events-none z-10 transition-opacity duration-100"
            />

            <div className="absolute bottom-20 w-[60%] h-1 bg-slate-200/20 dark:bg-white/10 rounded-full overflow-hidden z-20 pointer-events-none">
                <div
                    className="h-full bg-yellow-500 transition-all duration-100"
                    style={{ width: `${((currentFrame) / (imageSequence.length - 1)) * 100}%` }}
                ></div>
            </div>
            {/* Helper UI Tooltip */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 bg-white/80 dark:bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-none pointer-events-none z-20 border border-slate-200 dark:border-white/10">
                <MoveHorizontal className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="text-[12px] font-bold text-slate-800 dark:text-gray-200 tracking-widest uppercase">
                    360°
                </span>
            </div>
        </div>
    );
};

export default Car360Viewer;
