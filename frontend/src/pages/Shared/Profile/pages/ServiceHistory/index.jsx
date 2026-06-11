import MaintenanceCard from './components/MaintenanceCard/index.jsx';
import MaintenanceAlert from './components/MaintenanceAlert/index.jsx';
import { useServiceHistoryLogic } from './hooks/useServiceHistoryLogic';
import { FileDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceHistory = () => {
    const { t, servicesData, nextRecommendedDates, isLoading } = useServiceHistoryLogic();

    return (
        <section className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-[28px] font-black tracking-tight text-slate-900 dark:text-white">
                    {t('service_history_title', 'Lịch sử bảo dưỡng')}
                </h2>
                
                <button className="text-[13px] font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 flex items-center gap-2 group transition-colors px-4 py-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl w-fit">
                    <FileDown size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                    {t('service_btn_download_pdf', 'TẢI NHẬT KÝ (PDF)')}
                </button>
            </div>

            {nextRecommendedDates && nextRecommendedDates.map((alertInfo, idx) => (
                <MaintenanceAlert key={idx} alertInfo={alertInfo} t={t} />
            ))}

            <div className="grid grid-cols-1 gap-8">
                {isLoading ? (
                    [1, 2].map(idx => (
                        <div key={idx} className="bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[24px] p-6">
                            <div className="flex justify-between items-center mb-6">
                                <Skeleton className="w-1/3 h-8" />
                                <Skeleton className="w-24 h-8 rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <Skeleton className="w-full h-5" />
                                    <Skeleton className="w-3/4 h-5" />
                                    <Skeleton className="w-1/2 h-5" />
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="w-full h-5" />
                                    <Skeleton className="w-3/4 h-5" />
                                    <Skeleton className="w-1/2 h-5" />
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                                <Skeleton className="w-32 h-10 rounded-xl" />
                            </div>
                        </div>
                    ))
                ) : (
                    servicesData.map((service, index) => (
                        <MaintenanceCard 
                            key={service.booking_code} 
                            service={service} 
                            index={index} 
                            t={t}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ServiceHistory;
