import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardCheck, CheckCircle2, AlertCircle, Circle, Loader2 } from 'lucide-react';

const QCQualityGates = ({ qcData }) => {
    const { t } = useTranslation('adminRODetail');

    if (!qcData || !qcData.kcs_tasks) return null;

    const { kcs_tasks } = qcData;

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-5 border border-slate-200 dark:border-white/5 shadow-sm flex-1">
            <h2 className="text-xs font-bold text-slate-500 dark:text-[#d3c5ac] mb-5 flex items-center gap-2 uppercase tracking-widest">
                <ClipboardCheck className="w-4 h-4" />
                {t('panel_qc_title', 'Hạng mục KCS')}
            </h2>
            
            <ul className="flex flex-col gap-4">
                {kcs_tasks.map((task) => {
                    const isPass = task.status === 'passed' || task.status === 'completed';
                    const isFail = task.status === 'failed' || task.status === 'rework';
                    const isProcessing = task.status === 'processing';
                    const isPending = task.status === 'pending';

                    return (
                        <li key={task.id} className={`flex items-start gap-3 ${isPending ? 'opacity-50' : ''} ${isFail ? 'bg-rose-50 dark:bg-rose-500/10 p-3 -mx-3 rounded-lg border border-rose-200 dark:border-rose-500/20 relative' : ''}`}>
                            <div className="mt-0.5">
                                {isPass && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                {isFail && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-500" />}
                                {isProcessing && <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />}
                                {isPending && <Circle className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div>
                                <p className={`text-sm tracking-wide ${
                                    isPass ? 'font-semibold text-slate-800 dark:text-[#dce1fb]' :
                                    isFail ? 'font-bold text-rose-600 dark:text-rose-500' :
                                    'font-semibold text-slate-800 dark:text-[#dce1fb]'
                                }`}>
                                    {task.title}
                                </p>
                                {isFail && task.notes && (
                                    <p className="text-[10px] text-rose-500 uppercase tracking-wider mt-0.5 font-semibold">
                                        {task.notes}
                                    </p>
                                )}
                                {!isFail && task.checked_by && (
                                    <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider mt-0.5 font-mono">
                                        {t('qc_tech_id', 'Tech ID')}: {task.checked_by.split('-')[0]}
                                    </p>
                                )}
                                {isProcessing && (
                                    <p className="text-[10px] text-amber-600 dark:text-amber-500 uppercase tracking-wider mt-0.5 font-semibold">
                                        {t('qc_processing', 'Đang thực hiện...')}
                                    </p>
                                )}
                                {isPending && (
                                    <p className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-wider mt-0.5">
                                        {t('qc_pending_rework', 'Chờ xử lý')}
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QCQualityGates;
