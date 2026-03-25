import React from 'react';
import RoadmapStep from './RoadmapStep';
import { useTranslation } from 'react-i18next';

const RepairRoadmap = ({ steps }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#a0a0a0] mb-10">
                {t('prog_roadmap_title', 'Repair Roadmap')}
            </h3>
            <div className="relative space-y-12">
                {/* Connecting Line Backdrop */}
                <div className="absolute left-[23px] top-4 bottom-8 w-[2px] bg-slate-200 dark:bg-[#23293c]">
                    <div 
                        className="w-full bg-emerald-500 dark:bg-[#4edea3] shadow-[0_0_10px_#4edea3]" 
                        style={{ height: '70%' }}
                    ></div>
                </div>

                {/* Iterate through timeline steps */}
                {steps.map((step) => (
                    <RoadmapStep key={step.id} step={step} />
                ))}
            </div>
        </div>
    );
};

export default RepairRoadmap;
