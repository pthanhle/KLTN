import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import CustomerHUD from './CustomerHUD';
import VehicleHUD from './VehicleHUD';
import TechnicalHUD from './TechnicalHUD';
import FinancialHUD from './FinancialHUD';

const HeaderPanel = ({ bookingCode, sequenceNumber, overviewData, quotationData }) => {
    const { t } = useTranslation('adminRODetail');
    const navigate = useNavigate();

    if (!overviewData) return null;

    return (
        <div className="flex flex-col gap-6">
            {/* Top Navigation Bar */}
            <div className="bg-white dark:bg-[#141416]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-[#23293c] text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors group"
                        title={t('header_back_btn', 'Quay lại')}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 tracking-tighter uppercase">{bookingCode}</h1>
                        {sequenceNumber != null && (
                            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md tracking-wide">
                                #{sequenceNumber}
                            </span>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {(() => {
                        const status = overviewData?.status || 'RECEIVED';

                        let currentPhase = 0;
                        if (['WAITING_PARTS', 'IN_PROGRESS', 'QC_TESTING'].includes(status)) {
                            currentPhase = 1;
                        } else if (status === 'COMPLETED') {
                            currentPhase = 2;
                        }

                        const renderStage = (phaseIndex, label) => {
                            if (phaseIndex < currentPhase) {
                                // Done
                                return (
                                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-[#d3c5ac]">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
                                    </div>
                                );
                            } else if (phaseIndex === currentPhase) {
                                return (
                                    <div className="flex items-center gap-1.5 text-amber-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="flex items-center gap-1.5 text-slate-300 dark:text-slate-600">
                                        <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
                                    </div>
                                );
                            }
                        };

                        return (
                            <>
                                {renderStage(0, t('stage_intake', 'Tiếp nhận'))}
                                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-700" />
                                {renderStage(1, t('stage_repair', 'Thi công'))}
                                <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-700" />
                                {renderStage(2, t('stage_delivery', 'Bàn giao'))}
                            </>
                        );
                    })()}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <CustomerHUD customer_info={overviewData.customer_info || quotationData?.customer_info} />
                <VehicleHUD vehicle_info={overviewData.vehicle_info} />
                <TechnicalHUD health_hud={overviewData.health_hud} />
                <FinancialHUD quotationData={quotationData} />
            </div>
        </div>
    );
};

export default HeaderPanel;
