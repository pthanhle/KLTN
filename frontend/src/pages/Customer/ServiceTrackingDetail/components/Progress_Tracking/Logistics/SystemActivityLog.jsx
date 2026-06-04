import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatTimeHHMM } from '../../../../../utils/trackingDataUtils';
import { LOG_TYPE_COLORS, LOG_TYPE_LABELS } from '../../../../../constants/progressConstants';

const SystemActivityLog = ({ logs }) => {
    const { t } = useTranslation('tracking');

    const getTypeClasses = (code) => {
        return LOG_TYPE_COLORS[code] || LOG_TYPE_COLORS.SYSTEM;
    };

    const getTypeLabel = (code) => {
        return LOG_TYPE_LABELS[code] || LOG_TYPE_LABELS.SYSTEM;
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-[#a0a0a0]">
                    {t('prog_sys_log', 'Hoạt động hệ thống')}
                </h3>
                <Terminal className="text-slate-400 dark:text-[#a0a0a0]" size={20} />
            </div>

            <div className="space-y-4 text-[11px] leading-relaxed">
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-4 group cursor-default">
                        <span className="text-slate-500 dark:text-[#a0a0a0] group-hover:text-yellow-600 dark:group-hover:text-[#d4af37] transition-colors">
                            {formatTimeHHMM(log.timestamp)}
                        </span>
                        <span className={`w-8 font-bold ${getTypeClasses(log.type_code)}`}>{getTypeLabel(log.type_code)}</span>
                        <span className="text-slate-800 dark:text-white/80 flex-1">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemActivityLog;
