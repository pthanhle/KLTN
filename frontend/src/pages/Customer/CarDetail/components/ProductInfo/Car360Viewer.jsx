import { MoveHorizontal } from 'lucide-react';
import { Image } from 'antd';
import { useCar360Viewer } from '../../hooks/useCar360Viewer';

const Car360Viewer = ({ imageSequence, t }) => {
    const { currentFrame, containerRef, handlePointerDown } = useCar360Viewer(imageSequence);

    if (!imageSequence || imageSequence.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[4/3] flex items-center justify-center cursor-ew-resize select-none touch-none overflow-hidden"
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
        >
            <div className="absolute bottom-10 w-[70%] h-[20px] bg-black/40 blur-[20px] rounded-[100%] pointer-events-none z-0"></div>

            <Image
                src={imageSequence[currentFrame]}
                alt="360 View"
                draggable="false"
                preview={false}
                rootClassName="w-full h-full z-10"
                className="!w-full !h-full object-contain pointer-events-none transition-opacity duration-100"
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
