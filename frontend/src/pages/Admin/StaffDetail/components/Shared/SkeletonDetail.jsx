import React from 'react';

const SkeletonDetail = () => {
    return (
        <div className="p-6 md:p-8 min-h-screen bg-slate-50 dark:bg-[#141416] animate-pulse">
            <div className="w-48 h-6 bg-slate-200 dark:bg-[#1c1c1e] rounded mb-8"></div>
            
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-8 mb-8 flex gap-8 shadow-sm">
                <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-[#2e3447] shrink-0"></div>
                <div className="flex-1 flex flex-col gap-4 py-2">
                    <div className="w-1/3 h-10 bg-slate-200 dark:bg-[#2e3447] rounded"></div>
                    <div className="w-1/2 h-6 bg-slate-200 dark:bg-[#2e3447] rounded"></div>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="w-32 h-10 bg-slate-200 dark:bg-[#1c1c1e] rounded-lg"></div>
                <div className="w-32 h-10 bg-slate-200 dark:bg-[#1c1c1e] rounded-lg"></div>
                <div className="w-32 h-10 bg-slate-200 dark:bg-[#1c1c1e] rounded-lg"></div>
            </div>

            <div className="h-64 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-sm"></div>
        </div>
    );
};

export default SkeletonDetail;
