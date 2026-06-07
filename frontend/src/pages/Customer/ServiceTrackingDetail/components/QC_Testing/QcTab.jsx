import React from 'react';
import { useTranslation } from 'react-i18next';
import QcNotificationBanner from './QcNotificationBanner';
import QcKineticChecklist from './QcKineticChecklist';
import QcSpecHud from './QcSpecHud';
import QcVehicleVisual from './QcVehicleVisual';
import QcVerification from './QcVerification';

const QcTab = ({ qcData }) => {
    const { t } = useTranslation('tracking');

    if (!qcData) return null;

    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
            <QcNotificationBanner estimatedTime={qcData.estimated_delivery} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
                {/* Left Column: Checklist & Specs */}
                <div className="xl:col-span-2 space-y-8 lg:space-y-12">
                    <div>
                        <span className=" text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-[#d3c5ac]">
                            {t('label_current_stage', 'Phân đoạn hiện tại')}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mt-2 leading-tight md:leading-none uppercase">
                            {t('title_qc_kcs', 'Kiểm tra chất lượng cuối cùng (KCS)')}
                        </h1>
                    </div>

                    <div className="bg-white/50 dark:bg-transparent rounded-2xl w-full">
                        <QcKineticChecklist tasks={qcData.kcs_tasks} />
                    </div>

                    {qcData.spec_hud && <QcSpecHud specs={qcData.spec_hud} />}
                </div>

                {/* Right Column: Verification & Approval */}
                <div className="space-y-8">
                    {qcData.vehicle_visual && <QcVehicleVisual vehicle={qcData.vehicle_visual} />}
                    <QcVerification manager={qcData.manager} />
                </div>
            </div>
        </div>
    );
};

export default QcTab;
