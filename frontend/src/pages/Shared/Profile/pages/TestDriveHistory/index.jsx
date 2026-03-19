import { Button } from 'antd';
import { CarFront } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTestDriveHistory } from './hooks/useTestDriveHistory';
import TicketCard from './components/TicketCard/index.jsx';
import TicketCardSkeleton from './components/TicketCard/TicketCardSkeleton';
import EmptyState from './components/EmptyState';
import TestDriveReminder from './components/TestDriveReminder';

const TestDriveHistory = () => {
    const { t } = useTranslation(['profile']);
    const { 
        drives, 
        isLoading, 
        filterType, 
        setFilterType, 
        handleReschedule, 
        handleCancel 
    } = useTestDriveHistory(t);

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 uppercase">
                        {t('testdrive_title', 'Lịch sử trải nghiệm')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
                        {t('testdrive_desc', 'Quản lý lịch hẹn trải nghiệm xe của bạn')}
                    </p>
                </div>
                
                {/* Filter Bar */}
                <div className="inline-flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-full shadow-inner border border-slate-200/50 dark:border-white/5">
                    <button 
                        onClick={() => setFilterType('upcoming')}
                        className={`px-8 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${
                            filterType === 'upcoming' 
                                ? 'bg-yellow-500 text-slate-900 shadow-md' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        {t('filter_upcoming', 'Sắp Tới')}
                    </button>
                    <button 
                        onClick={() => setFilterType('history')}
                        className={`px-8 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${
                            filterType === 'history' 
                                ? 'bg-yellow-500 text-slate-900 shadow-md' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        {t('filter_history', 'Lịch Sử')}
                    </button>
                </div>
            </header>

            <div className="w-full space-y-8">
                {isLoading ? (
                    <>
                        <TicketCardSkeleton />
                        <TicketCardSkeleton />
                    </>
                ) : drives.length > 0 ? (
                    <>
                        {drives.map(drive => (
                            <TicketCard 
                                key={drive.booking_code} 
                                drive={drive} 
                                handleReschedule={handleReschedule}
                                handleCancel={handleCancel}
                                t={t}
                            />
                        ))}
                        <TestDriveReminder t={t} />
                    </>
                ) : (
                    <EmptyState t={t} />
                )}
            </div>
        </div>
    );
};

export default TestDriveHistory;
