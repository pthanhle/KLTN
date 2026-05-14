import React from 'react';

const RODetailSkeleton = () => {
    return (
        <div className="flex-1 p-4 lg:p-6 w-full max-w-[1920px] mx-auto flex flex-col gap-6 animate-pulse">
            <div className="h-24 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-[30%_45%_minmax(0,1fr)] gap-6 items-start">

                <div className="flex flex-col gap-6">
                    <div className="h-96 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                    <div className="h-40 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="h-32 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                    <div className="h-[500px] bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="h-64 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                    <div className="h-64 bg-slate-200 dark:bg-[#141416] rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default RODetailSkeleton;