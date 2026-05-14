import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { getWorkloadStyle } from '../../../utils/workloadUtils';

const TechOptionItem = ({ tech, isPreferred }) => {
    const { t } = useTranslation('adminServiceReception');
    const { cssClass } = getWorkloadStyle(tech.calculatedWorkload);

    return (
        <div className="flex justify-between items-center w-full py-1">
            <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    {tech.fullName}
                    {isPreferred && (
                        <span className="flex items-center gap-1 text-[10px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20">
                            <Star className="w-3 h-3 fill-yellow-500" />
                            {t('preferred_tech', 'Thợ Quen')}
                        </span>
                    )}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">{tech.employeeId}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                    {t('workload_label')}:
                </span>
                <div className={`px-2 py-0.5 rounded text-xs font-bold border ${cssClass}`}>
                    {tech.calculatedWorkload}%
                </div>
            </div>
        </div>
    );
};

export default TechOptionItem;
