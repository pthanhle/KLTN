import React from 'react';
import { useTranslation } from 'react-i18next';
import DragDropZone from './DragDropZone';
import StatisticsHUD from './StatisticsHUD';
import ActionButtons from './ActionButtons';
import SequenceTips from './SequenceTips';

const ThreeSixtyUploader = ({ 
    sequenceCount, 
    onUploadBatch, 
    onClearSequence, 
    onProcessAI 
}) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <section className="flex flex-col gap-8 h-full">
            <div className="bg-white dark:bg-[#191f31] p-8 rounded-3xl relative overflow-hidden group shadow-2xl border border-slate-100 dark:border-white/5 h-full flex flex-col">
                <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-[#d3c5ac] mb-6">
                        {t('uploaderBlockTitle', 'Trình Tải Lên Chuỗi Hình Ảnh')}
                    </h3>
                    
                    <DragDropZone onUpload={onUploadBatch} />
                    
                    <StatisticsHUD sequenceCount={sequenceCount} />

                    <ActionButtons 
                        sequenceCount={sequenceCount} 
                        onClear={onClearSequence} 
                        onProcessAI={onProcessAI} 
                    />
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors pointer-events-none"></div>
            </div>

            <SequenceTips />
        </section>
    );
};

export default ThreeSixtyUploader;
