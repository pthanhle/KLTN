import React from 'react';

const SkeletonCard = ({ className }) => (
    <div className={`bg-slate-200/50 dark:bg-[#141416]/50 rounded-2xl p-8 border border-white/40 dark:border-white/5 animate-pulse overflow-hidden relative ${className}`}>
        {/* Shimmer Effect overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>
        
        {/* Header Title Skeleton */}
        <div className="flex gap-4 items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-[#1c1c1e]"></div>
            <div className="h-6 w-1/3 bg-slate-300 dark:bg-[#1c1c1e] rounded-lg"></div>
        </div>

        {/* Form Inputs Skeleton */}
        <div className="space-y-6">
            <div className="h-14 w-full bg-slate-300 dark:bg-[#1c1c1e] rounded-[1.25rem]"></div>
            <div className="h-14 w-3/4 bg-slate-300 dark:bg-[#1c1c1e] rounded-[1.25rem]"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-14 w-full bg-slate-300 dark:bg-[#1c1c1e] rounded-[1.25rem]"></div>
                <div className="h-14 w-full bg-slate-300 dark:bg-[#1c1c1e] rounded-[1.25rem]"></div>
            </div>
        </div>
    </div>
);

const FormSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Header Area */}
            <div className="flex justify-between items-start mb-8 animate-pulse">
                <div className="space-y-3">
                    <div className="h-5 w-48 bg-slate-300 dark:bg-[#1c1c1e] rounded-md"></div>
                    <div className="h-8 w-64 bg-slate-300 dark:bg-[#1c1c1e] rounded-lg"></div>
                </div>
                <div className="flex gap-3">
                    <div className="h-10 w-24 bg-slate-300 dark:bg-[#1c1c1e] rounded-xl"></div>
                    <div className="h-10 w-32 bg-slate-300 dark:bg-[#1c1c1e] rounded-xl"></div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                    <SkeletonCard className="h-[400px]" /> {/* Basic Info */}
                    <SkeletonCard className="h-[250px]" /> {/* Pricing */}
                    <SkeletonCard className="h-[300px]" /> {/* Fitment */}
                    <SkeletonCard className="h-[300px]" /> {/* Specs */}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
                    <SkeletonCard className="h-[200px]" /> {/* Inventory */}
                    <SkeletonCard className="h-[350px]" /> {/* SEO */}
                    <SkeletonCard className="h-[250px]" /> {/* Options */}
                </div>

                {/* 100% Width Landing Builder */}
                <div className="col-span-12">
                    <SkeletonCard className="h-[400px]" /> {/* Landing Page Builder */}
                </div>
            </div>
        </div>
    );
};

export default FormSkeleton;
