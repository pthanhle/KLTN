import { Skeleton } from '@/components/ui/skeleton';

const TicketCardSkeleton = () => {
    return (
        <div className="relative bg-white dark:bg-[#141416] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 mb-8">
            <div className="flex flex-col md:flex-row h-full">
                {/* Left: Car Image Area */}
                <div className="w-full md:w-1/3 p-4">
                    <Skeleton className="w-full h-48 md:h-64 rounded-xl" />
                </div>

                {/* Middle: Details Area */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between md:border-l border-t md:border-t-0 border-dashed border-slate-200 dark:border-white/10">
                    <div className="flex justify-between items-start mb-6 gap-4">
                        <div>
                            <Skeleton className="h-3 w-16 mb-2" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div>
                            <Skeleton className="h-3 w-16 mb-4" />
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-3 w-16 mb-4" />
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Actions Area */}
                <div className="w-full md:w-64 p-8 flex flex-col justify-center gap-4 bg-slate-50 dark:bg-white/[0.02]">
                    <Skeleton className="h-[60px] w-full rounded-full" />
                    <Skeleton className="h-[60px] w-full rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default TicketCardSkeleton;
