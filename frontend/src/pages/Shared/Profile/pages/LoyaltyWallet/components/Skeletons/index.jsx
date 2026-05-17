import React from 'react';

export const VoucherSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#1c1c1f] animate-pulse">
                    <div className="flex flex-col sm:flex-row h-full">
                        <div className="bg-slate-100 dark:bg-white/5 w-full sm:w-[140px] h-32 sm:h-auto border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-white/10"></div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="h-5 bg-slate-200 dark:bg-white/10 rounded-md w-3/4 mb-3"></div>
                                <div className="h-3 bg-slate-200 dark:bg-white/10 rounded-md w-full mb-2"></div>
                                <div className="h-3 bg-slate-200 dark:bg-white/10 rounded-md w-2/3 mb-4"></div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="h-8 bg-slate-200 dark:bg-white/10 rounded-lg w-20"></div>
                                <div className="h-10 bg-slate-200 dark:bg-white/10 rounded-lg w-28"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const HistorySkeleton = () => {
    return (
        <div className="mt-8 px-4 max-w-3xl mx-auto space-y-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex-shrink-0"></div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 flex-1 border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-start mb-3">
                            <div className="h-5 bg-slate-200 dark:bg-white/10 rounded-md w-1/2"></div>
                            <div className="h-6 bg-slate-200 dark:bg-white/10 rounded-md w-16"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-md w-32"></div>
                            <div className="h-5 bg-slate-200 dark:bg-white/10 rounded-md w-16"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
