import React from 'react';
import { Skeleton } from 'antd';

const BookingSkeleton = () => {
    return (
        <section className="space-y-4">
            {/* Header Skeleton */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 mb-2">
                <Skeleton.Button active size="small" className="col-span-4" />
                <Skeleton.Button active size="small" className="col-span-1" />
                <Skeleton.Button active size="small" className="col-span-3" />
                <Skeleton.Button active size="small" className="col-span-2" />
                <Skeleton.Button active size="small" className="col-span-1" />
                <Skeleton.Button active size="small" className="col-span-1" />
            </div>

            {/* List Skeleton */}
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white dark:bg-[#141416] rounded-xl p-4 md:py-4 md:px-6 shadow-sm border border-slate-200 dark:border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 md:col-span-3 lg:col-span-4 flex items-center space-x-4">
                            <Skeleton.Avatar active size="large" shape="circle" />
                            <div className="flex-1">
                                <Skeleton.Input active size="small" block className="mb-2" />
                                <Skeleton.Input active size="small" block />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <Skeleton.Button active size="small" />
                        </div>
                        <div className="col-span-1 md:col-span-3 lg:col-span-3">
                            <Skeleton.Input active size="small" block />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-2">
                            <Skeleton.Input active size="small" block className="mb-2" />
                            <Skeleton.Input active size="small" block />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 flex justify-center">
                            <Skeleton.Button active size="small" />
                        </div>
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
                            <Skeleton.Avatar active size="medium" shape="circle" />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default BookingSkeleton;
