import React from 'react';
import { Skeleton } from 'antd';

export const BookingsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse mt-8">
            <Skeleton.Button active block className="!h-40 !rounded-2xl" />
            <Skeleton.Button active block className="!h-40 !rounded-2xl" />
        </div>
    );
};
