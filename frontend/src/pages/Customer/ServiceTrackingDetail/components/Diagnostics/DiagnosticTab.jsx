import React from 'react';
import SummaryStats from './SummaryStats';
import ChecklistGroup from './ChecklistGroup';
import TechnicalObservation from './TechnicalObservation';
import { useTranslation } from 'react-i18next';

const DiagnosticTab = ({ diagnosticData }) => {
    const { t } = useTranslation('tracking');

    if (!diagnosticData) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Hero Section */}
            <div className="mb-10 md:mb-12">
                <p className="text-yellow-600 dark:text-[#ffd165] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">
                    {t('label_diagnostic_report', 'Technical Report')}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase">
                    {t('title_diagnostic_result', 'Kết Quả Chẩn Đoán Kỹ Thuật')}
                </h2>
                <div className="h-1 w-16 md:w-24 bg-yellow-500 dark:bg-[#ffd165] mt-4 md:mt-6 rounded-full"></div>
            </div>

            {/* Content Areas */}
            <SummaryStats summary={diagnosticData.summary} />

            <div className="space-y-12 md:space-y-20">
                {diagnosticData.groups.map(group => (
                    <ChecklistGroup key={group.id} group={group} />
                ))}
            </div>

            <TechnicalObservation 
                conclusion={diagnosticData.conclusion}
                technician={diagnosticData.technician}
                lastDate={diagnosticData.last_maintenance_date}
            />
        </div>
    );
};

export default DiagnosticTab;
