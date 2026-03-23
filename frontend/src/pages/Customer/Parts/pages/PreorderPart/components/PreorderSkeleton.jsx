import { Skeleton } from 'antd';

const PreorderSkeleton = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <Skeleton.Button active size="small" style={{ width: 100, marginBottom: 32 }} />
                
                <div className="mb-10">
                    <Skeleton.Input active size="large" style={{ width: 400, height: 48, marginBottom: 16 }} />
                    <Skeleton active paragraph={{ rows: 2, width: ['100%', '80%'] }} title={false} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Col Skeleton */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[32px] p-6">
                            <Skeleton.Image active style={{ width: '100%', height: 300, borderRadius: 16, marginBottom: 24 }} />
                            <Skeleton active paragraph={{ rows: 2 }} className="mt-4" />
                        </div>
                    </div>

                    {/* Right Col Skeleton */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5">
                            <Skeleton.Avatar active size={40} shape="square" style={{ borderRadius: 12, marginBottom: 32 }} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Skeleton.Input active style={{ width: '100%', height: 56, borderRadius: 16 }} className="md:col-span-2" />
                                <Skeleton.Input active style={{ width: '100%', height: 56, borderRadius: 16 }} />
                                <Skeleton.Input active style={{ width: '100%', height: 56, borderRadius: 16 }} />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5">
                            <Skeleton.Avatar active size={40} shape="square" style={{ borderRadius: 12, marginBottom: 32 }} />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <Skeleton.Input active style={{ width: '100%', height: 56, borderRadius: 16 }} className="sm:col-span-2" />
                                <Skeleton.Input active style={{ width: '100%', height: 56, borderRadius: 16 }} />
                            </div>
                        </div>
                        
                        <div className="flex justify-end pt-4">
                            <Skeleton.Button active size="large" style={{ width: 250, height: 56, borderRadius: 16 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreorderSkeleton;
