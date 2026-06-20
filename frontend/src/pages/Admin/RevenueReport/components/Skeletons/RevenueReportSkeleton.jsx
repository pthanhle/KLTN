import { CardSkeleton } from './CardSkeleton';
import { ChartSkeleton } from './ChartSkeleton';
import { TableSkeleton } from './TableSkeleton';

export const RevenueReportSkeleton = () => (
    <div className="w-full space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
                <ChartSkeleton />
            </div>
            <div className="xl:col-span-1">
                <ChartSkeleton />
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
        </div>

        <TableSkeleton />
    </div>
);
