import React from 'react';
import { Skeleton } from 'antd';
import ProgressHero from './Hero/ProgressHero';
import RepairRoadmap from './Roadmap/RepairRoadmap';
import PartsInventory from './Logistics/PartsInventory';
import SystemActivityLog from './Logistics/SystemActivityLog';
import { useProgressTabLogic } from '../../hooks/useProgressTabLogic';

const ProgressTab = () => {
    const { progressData, isLoading } = useProgressTabLogic();

    if (isLoading || !progressData) {
        return (
            <div className="animate-in fade-in duration-500 max-w-7xl mx-auto w-full pb-32">
                {/* Hero Skeleton */}
                <div className="bg-white dark:bg-[#141416] rounded-xl p-8 lg:p-12 mb-12 border border-slate-200 dark:border-white/5 shadow-sm flex flex-col lg:flex-row gap-12 items-center">
                    <Skeleton.Avatar active size={220} shape="circle" className="shrink-0" />
                    <div className="flex-1 w-full">
                        <Skeleton active title={false} paragraph={{ rows: 3, width: ['30%', '80%', '40%'] }} />
                        <div className="flex gap-4 mt-8">
                            <Skeleton.Button active size="large" className="w-32 h-14" />
                            <Skeleton.Button active size="large" className="w-48 h-14" />
                        </div>
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <Skeleton active title paragraph={{ rows: 8 }} />
                            <Skeleton active paragraph={{ rows: 6 }} className="mt-8" />
                        </div>
                    </div>
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <Skeleton active title paragraph={{ rows: 4 }} />
                        </div>
                        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <Skeleton active title paragraph={{ rows: 6 }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
            {/* Hero Section */}
            <ProgressHero data={progressData} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Timeline */}
                <div className="lg:col-span-8">
                    <RepairRoadmap steps={progressData.timeline_steps} />
                </div>

                {/* Right Column: Mini Panels */}
                <div className="lg:col-span-4 space-y-8">
                    <PartsInventory parts={progressData.parts_inventory} />
                    <SystemActivityLog logs={progressData.system_activity} />
                </div>
            </div>
        </div>
    );
};

export default ProgressTab;
