import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import { useVehicleContractDetail } from './hooks/useVehicleContractDetail';
import { useContractActions } from './hooks/useContractActions';
import { ContractDetailHeader } from './components/Header';
import { CustomerSection } from './components/CustomerSection';
import { VehicleSection } from './components/VehicleSection';
import { FinancialSection } from './components/FinancialSection';
import { AttachmentsSection } from './components/AttachmentsSection';
import { A4ContractModal } from './components/A4ContractModal';
import { CancelContractModal } from './components/CancelContractModal';
const VehicleContractDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation('adminVehicleContractDetail');
    
    const { state, actions } = useVehicleContractDetail(id);
    const { contract, isLoading, isApproving } = state;
    const { handleSign, handleDeliver } = useContractActions(id);
    const [isA4ModalVisible, setIsA4ModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                <Skeleton active paragraph={{ rows: 2 }} className="bg-white dark:bg-[#141416] p-6 rounded-2xl" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Skeleton active paragraph={{ rows: 6 }} className="bg-white dark:bg-[#141416] p-6 rounded-2xl" />
                        <Skeleton active paragraph={{ rows: 8 }} className="bg-white dark:bg-[#141416] p-6 rounded-2xl" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton active paragraph={{ rows: 5 }} className="bg-white dark:bg-[#141416] p-6 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!contract) {
        return <div className="text-center py-20 text-slate-500">{t('Không tìm thấy hợp đồng.')}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 space-y-6">
            <ContractDetailHeader 
                contract={contract} 
                onBack={() => navigate('/admin/vehicle-contracts')} 
                onApprove={actions.handleApprove} 
                isApproving={isApproving} 
                onPrint={() => setIsA4ModalVisible(true)}
                onSign={handleSign}
                onDeliver={handleDeliver}
                onCancel={() => setIsCancelModalVisible(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <CustomerSection snapshot={contract.customer_snapshot} />
                    <VehicleSection snapshot={contract.vehicle_snapshot} />
                    <AttachmentsSection contract={contract} />
                </div>
                <div className="space-y-6">
                    <FinancialSection snapshot={contract.pricing_snapshot} />
                </div>
            </div>

            {contract && (
                <A4ContractModal 
                    contract={contract}
                    isOpen={isA4ModalVisible}
                    onClose={() => setIsA4ModalVisible(false)}
                />
            )}

            {contract && (
                <CancelContractModal
                    visible={isCancelModalVisible}
                    onClose={() => setIsCancelModalVisible(false)}
                    contractId={contract._id}
                    currentNote={contract.note}
                />
            )}
        </div>
    );
};

export default VehicleContractDetail;
