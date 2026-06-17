import React from 'react';
import { Button } from 'antd';
import { ArrowLeft, Printer } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { EnterpriseStatusBadge } from '../../../Shared/components/Badges/EnterpriseStatusBadge';

export const ContractDetailHeader = ({ contract, onBack, onApprove, isApproving, onPrint }) => {
    const { t } = useTranslation('adminVehicleContractDetail');

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm gap-4">
            <div className="flex items-center gap-4">
                <Button 
                    type="text" 
                    icon={<ArrowLeft size={20} />} 
                    onClick={onBack}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
                />
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight m-0">
                            {contract.contract_number}
                        </h1>
                        <EnterpriseStatusBadge status={contract.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1 mb-0">
                        {t('Ngày tạo')}: <time dateTime={contract.createdAt || contract.created_at}>{dayjs(contract.createdAt || contract.created_at).format('DD/MM/YYYY HH:mm')}</time>
                    </p>
                </div>
            </div>
            
            <div className="flex gap-3 items-center">
                <button 
                    onClick={onPrint}
                    className="px-6 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 transition-all active:scale-95 text-[13px]"
                >
                    <Printer size={16} /> {t('Xem bản in')}
                </button>
                
                {contract.status === 'draft' && (
                    <button 
                        onClick={onApprove}
                        disabled={isApproving}
                        className="px-8 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                    >
                        {isApproving ? t('Đang duyệt...') : t('Duyệt hợp đồng')}
                    </button>
                )}
            </div>
        </div>
    );
};
