import React from 'react';
import { Skeleton } from 'antd';

const NotificationSkeleton = () => {
    return (
        <div className="space-y-8 w-full">
            {/* Header skeleton */}
            <div className="flex justify-between items-end mb-6">
                <div>
                    <Skeleton.Input active size="large" className="w-[200px] !h-10 mb-2" />
                    <Skeleton.Button active size="small" className="w-[150px] !h-4" />
                </div>
                <Skeleton.Button active shape="round" className="w-[180px] !h-10" />
            </div>

            {/* Filter skeleton */}
            <div className="flex gap-4 mb-10">
                <Skeleton.Button active shape="round" className="w-24 !h-10" />
                <Skeleton.Button active shape="round" className="w-24 !h-10" />
                <Skeleton.Button active shape="round" className="w-32 !h-10" />
            </div>

            {/* Card skeletons */}
            {[1, 2, 3].map((item) => (
                <div key={item} className="p-6 border-l-4 border-slate-200 dark:border-white/5 rounded-r-2xl bg-white/50 dark:bg-[#151b2d]/50 flex gap-6">
                    <Skeleton.Avatar active shape="square" size={48} className="!rounded-2xl" />
                    <div className="flex-1 space-y-3">
                        <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 2, width: ['100%', '80%'] }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationSkeleton;
