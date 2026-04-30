import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDragPhysics } from '../../hooks/useDragPhysics';
import LiveCanvas from './LiveCanvas';
import InteractiveOverlay from './InteractiveOverlay';
import StatusHUD from './StatusHUD';
import ControlsHUD from './ControlsHUD';
import FooterConfig from './FooterConfig';

const ThreeSixtyPreview = ({ manager }) => {
    const { t } = useTranslation('adminCarForm');
    const { sequenceCount, sequenceItems, lighting, environment, handleAdvancedConfig } = manager;
    const hasItems = sequenceCount > 0;

    // Isolate UI drag physics locally to avoid re-rendering entire forms
    const { 
        currentFrameIndex, 
        isDragging, 
        handlePointerDown, 
        handlePointerMove, 
        handlePointerUp 
    } = useDragPhysics(sequenceCount);

    const currentSrc = sequenceItems[currentFrameIndex];

    return (
        <section className="h-full">
            <div className="bg-white dark:bg-[#141416] p-4 rounded-3xl shadow-2xl relative flex flex-col h-full border border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center mb-4 px-4 pt-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-[#d3c5ac]">
                        {t('previewHeader', 'Live Preview Canvas v4.2')}
                    </span>
                </div>

                {/* Main Interactive Canvas wrapper */}
                <div className="relative flex-grow rounded-2xl overflow-hidden flex flex-col">
                    <LiveCanvas 
                        hasItems={hasItems}
                        currentSrc={currentSrc}
                        isDragging={isDragging}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                    />

                    {hasItems && <InteractiveOverlay />}
                    <StatusHUD 
                        hasItems={hasItems} 
                        currentFrameIndex={currentFrameIndex} 
                        sequenceCount={sequenceCount} 
                    />
                    <ControlsHUD />
                </div>

                <FooterConfig 
                    lighting={lighting}
                    environment={environment}
                    onAdvancedConfig={handleAdvancedConfig} 
                />
            </div>
        </section>
    );
};

export default ThreeSixtyPreview;
