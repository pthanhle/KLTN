import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Skeleton } from 'antd';
import { Video } from 'lucide-react';
import { THREE_SIXTY_CONFIG } from '../../constants/threeSixty.constants';

const LiveCanvas = ({ 
    hasItems, 
    currentSrc, 
    isDragging, 
    onPointerDown, 
    onPointerMove, 
    onPointerUp 
}) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div 
            className={`relative flex-grow bg-slate-50 dark:bg-[#070d1f] rounded-2xl overflow-hidden group/canvas touch-none select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} z-10`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <div className={`w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${!hasItems ? 'opacity-30 dark:mix-blend-luminosity grayscale' : 'opacity-100'}`}>
                <Image 
                    preview={false}
                    src={hasItems ? currentSrc : THREE_SIXTY_CONFIG.MOCK_DEFAULT_IMAGE}
                    alt="360 studio render view"
                    className="w-full h-full object-cover"
                    placeholder={
                        <Skeleton.Image active className="w-full h-full flex items-center justify-center scale-[2.0]" />
                    }
                    rootClassName="w-full h-full"
                />
            </div>
            {!hasItems && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                        <Video className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold tracking-widest uppercase text-center max-w-sm px-8">
                        {t('previewEmptyWarning', 'Vui lòng tải lên chuỗi 360 để kích hoạt phòng studio')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LiveCanvas;
