import React from 'react';
import { Skeleton } from 'antd';

const DeliverySkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (8 cols): Brief & Invoice */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {/* Handover Brief Skeleton */}
                    <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-white/5">
                        <Skeleton active title paragraph={{ rows: 2, width: ['40%', '80%'] }} className="mb-6" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <Skeleton.Button active block style={{ height: 60 }} />
                            <Skeleton.Button active block style={{ height: 60 }} />
                            <Skeleton.Button active block style={{ height: 60 }} />
                            <Skeleton.Button active block style={{ height: 60 }} />
                        </div>
                    </div>
                    
                    {/* Invoice Ledger Skeleton */}
                    <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-white/5 min-h-[400px]">
                        <Skeleton active title paragraph={{ rows: 6 }} className="mb-10" />
                        <div className="flex justify-end border-t border-slate-100 dark:border-white/5 pt-6">
                            <Skeleton active title={false} paragraph={{ rows: 4, width: ['60%', '80%', '100%', '70%'] }} className="w-[300px]" />
                        </div>
                    </div>
                </div>

                {/* Right Column (4 cols): Payment & Handshake */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    {/* Payment Terminal Skeleton */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 min-h-[300px]">
                        <Skeleton active paragraph={{ rows: 5 }} />
                    </div>
                    {/* Protocol Skeleton */}
                    <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 border border-slate-200 dark:border-white/5">
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliverySkeleton;
