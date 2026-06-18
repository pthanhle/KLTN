import React from 'react';
import { Button } from 'antd';
import { ArrowLeft, Printer } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { EnterpriseStatusBadge } from '../../../Shared/components/Badges/EnterpriseStatusBadge';
import { ActionButtons } from './ActionButtons';

export const ContractDetailHeader = ({ 
    contract, 
    onBack, 
    onApprove, 
    isApproving, 
    onPrint,
    onSign,
    onDeliver,
    onCancel
}) => {
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
            
            <ActionButtons 
                contract={contract}
                onApprove={onApprove}
                isApproving={isApproving}
                onPrint={onPrint}
                onSign={onSign}
                onDeliver={onDeliver}
                onCancel={onCancel}
            />
        </div>
    );
};
