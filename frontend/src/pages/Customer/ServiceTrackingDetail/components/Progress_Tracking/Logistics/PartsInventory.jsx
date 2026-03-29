import React from 'react';
import { Package, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PartsEmptyState from './PartsEmptyState';
import { formatDateTimeShort } from '../../../utils/trackingDataUtils';
import { PART_STATUS_LABELS } from '../../../constants/progressConstants';

const PartsInventory = ({ parts }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#a0a0a0]">
                    {t('prog_parts_title', 'Kho phụ tùng')}
                </h3>
                <Package className="text-yellow-600 dark:text-[#d4af37]" size={20} />
            </div>

            {(!parts || parts.length === 0) ? (
                <PartsEmptyState />
            ) : (
                <>
                    <div className="space-y-6">
                {parts.map((part) => {
                    const isDone = part.status_code === 'DONE';
                    const isActive = part.status_code === 'INSTALLING';

                    // Determine progress bar styling
                    let progressBg = "bg-slate-200 dark:bg-[#23293c]";
                    let fillClasses = "";
                    
                    if (isDone) fillClasses = "bg-emerald-500 dark:bg-[#4edea3] w-full";
                    else if (isActive) fillClasses = `bg-yellow-500 dark:bg-[#d4af37] w-[${part.fulfillment_percentage}%]`;
                    else fillClasses = "bg-yellow-500/30 dark:bg-yellow-500/30 w-1/4 animate-pulse"; // Pending

                    // Determine text color for status
                    let statusColor = "text-slate-500 dark:text-[#a0a0a0]";
                    if (isDone) statusColor = "text-emerald-600 dark:text-[#4edea3]";
                    if (isActive) statusColor = "text-yellow-600 dark:text-[#d4af37]";

                    return (
                        <div key={part.id}>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-800 dark:text-white">{part.name}</span>
                                <span className={`text-xs font-bold ${statusColor}`}>
                                    {PART_STATUS_LABELS[part.status_code] || part.status_code}
                                </span>
                            </div>
                            <div className={`h-2 w-full rounded-full overflow-hidden ${progressBg}`}>
                                <div className={`h-full ${fillClasses}`} style={isActive ? { width: `${part.fulfillment_percentage}%` } : {}}></div>
                            </div>

                            {/* Edge Case: ETA cho Parts Pending */}
                            {part.estimated_arrival_at && (
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                    <Clock className="text-amber-500 shrink-0" size={14} />
                                    <span className="text-amber-600 dark:text-amber-400 font-bold text-[10px] tracking-widest uppercase">
                                        ETA: {formatDateTimeShort(part.estimated_arrival_at)}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-10 py-3 rounded-full border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-[#1e1e20] text-slate-600 dark:text-white transition-colors">
                {t('prog_btn_bom', 'Xem chi tiết phụ tùng')}
            </button>
                </>
            )}
        </div>
    );
};

export default PartsInventory;
