import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePerformanceData } from './hooks/usePerformanceData';
import { PerformanceSkeleton } from './components/Shared/PerformanceSkeleton';
import { RevenueCard } from './components/StatCards/RevenueCard';
import { CsatCard } from './components/StatCards/CsatCard';
import { EfficiencyCard } from './components/StatCards/EfficiencyCard';
import { ReworkCard } from './components/StatCards/ReworkCard';
import { AccuracyCard } from './components/StatCards/AccuracyCard';
import { SlaCard } from './components/StatCards/SlaCard';
import { TransactionTimeCard } from './components/StatCards/TransactionTimeCard';
import { ErrorRateCard } from './components/StatCards/ErrorRateCard';
import { WorkloadKanban } from './components/WorkloadKanban';
import { ROLE_GROUPS } from './constants/performanceConstants';
import { DateFilter } from './components/Filters/DateFilter';

const PerformanceTab = ({ staff }) => {
    const { t } = useTranslation();
    const [dateRange, setDateRange] = useState('this_month');
    const { performanceData, isLoading } = usePerformanceData(staff?._id, dateRange);

    if (isLoading) {
        return <PerformanceSkeleton />;
    }

    if (!performanceData) {
        return (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-16 border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none transition-colors h-64">
                <p className="text-slate-500 dark:text-slate-400">
                    {t('adminStaffDetail:perf_fallback_unavailable', { role: staff?.role?.replace('_', ' ') })}
                </p>
            </div>
        );
    }

    const { kpis, kanban } = performanceData;

    const isSalesOrAdvisor = ROLE_GROUPS.SALES_AND_ADVISOR.includes(staff?.role);
    const isTech = ROLE_GROUPS.TECHNICIANS.includes(staff?.role);
    const isInventory = staff?.role === 'INVENTORY_MGR';
    const isCashier = staff?.role === 'CASHIER' || staff?.role === 'ACCOUNTANT';

    return (
        <div className="space-y-12 animate-fade-in">
            <DateFilter value={dateRange} onChange={setDateRange} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {isSalesOrAdvisor && kpis.revenue && (
                    <RevenueCard current={kpis.revenue.current} target={kpis.revenue.target} />
                )}

                {kpis.csat && (
                    <CsatCard score={kpis.csat.score} percentile={kpis.csat.percentile} />
                )}

                {isTech && kpis.efficiency && (
                    <EfficiencyCard billed={kpis.efficiency.billed} clocked={kpis.efficiency.clocked} rate={kpis.efficiency.rate} />
                )}

                {isTech && kpis.rework && (
                    <ReworkCard rate={kpis.rework.rate} trend={kpis.rework.trend} />
                )}

                {isInventory && kpis.inventoryAccuracy && (
                    <AccuracyCard accuracy={kpis.inventoryAccuracy.score} target={kpis.inventoryAccuracy.target} />
                )}

                {isInventory && kpis.avgSla && (
                    <SlaCard avgTime={kpis.avgSla.time} unit={kpis.avgSla.unit} />
                )}

                {isCashier && kpis.transactionTime && (
                    <TransactionTimeCard time={kpis.transactionTime.time} unit={kpis.transactionTime.unit} />
                )}

                {isCashier && kpis.errorRate && (
                    <ErrorRateCard rate={kpis.errorRate.rate} />
                )}

                {!isTech && !isSalesOrAdvisor && !isInventory && !isCashier && (
                    <div className="col-span-full p-6 text-slate-400 dark:text-gray-500 text-center border border-slate-200 dark:border-white/5 border-dashed rounded-xl">
                        {t('adminStaffDetail:perf_fallback_no_kpi')}
                    </div>
                )}
            </div>

            <WorkloadKanban kanbanData={kanban} role={staff?.role} staffName={staff?.fullName} />
        </div>
    );
};

export default PerformanceTab;
