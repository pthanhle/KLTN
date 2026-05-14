import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { QueueItem } from './components/QueueItem';

const QueueBoard = ({
    searchQuery,
    setSearchQuery,
    queueVehicles,
    onSelectVehicle
}) => {
    const { t } = useTranslation('adminServiceReception');

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl flex flex-col border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/20 h-full w-full max-w-7xl mx-auto">
            <header className="p-6 md:p-8 bg-slate-50 dark:bg-[#1d1d20] border-b border-slate-200 dark:border-white/10 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="font-bold text-2xl text-slate-800 dark:text-white tracking-tight">
                        {t('settlement_queue_title', 'Hàng đợi bàn giao')}
                    </h2>
                </div>

                <div className="relative group w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-slate-900 dark:group-focus-within:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('settlement_search_ph', 'Tìm biển số xe...')}
                        className="w-full bg-white dark:bg-[#1d1d20] rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-white/10 focus:border-slate-900 dark:focus:border-yellow-500 focus:bg-slate-50 dark:focus:bg-[#27272a] transition-colors outline-none focus:ring-0 shadow-sm font-medium"
                    />
                </div>
            </header>

            {/* Board Grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/50 dark:bg-transparent">
                {queueVehicles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-4">
                        <Search size={48} className="opacity-20" />
                        <span className="text-lg font-medium">{t('settlement_queue_empty', 'Không có xe nào đang chờ bàn giao')}</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {queueVehicles.map(vehicle => (
                            <QueueItem
                                key={vehicle.id}
                                id={vehicle.id}
                                plateText={vehicle.plateText}
                                customerNameText={vehicle.customerNameText}
                                isReadyForHandover={vehicle.isReadyForHandover}
                                statusText={vehicle.statusText}
                                paymentBadgeText={vehicle.paymentBadgeText}
                                isPaid={vehicle.isPaid}
                                onClick={onSelectVehicle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default QueueBoard;