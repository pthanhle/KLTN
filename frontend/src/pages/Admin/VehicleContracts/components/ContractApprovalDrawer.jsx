import React from 'react';
import { Drawer, Button, Space, Typography, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { ContractSnapshotViewer } from '../../Shared/components/Cards/ContractSnapshotViewer';
import { ContractTimeline } from '../../Shared/components/Timelines/ContractTimeline';
import { useApproveContractMutation } from '../../../../services/queries/vehicleContract.queries';

const { Title, Text } = Typography;

export const ContractApprovalDrawer = ({ open, contract, onClose }) => {
    const { t } = useTranslation('adminVehicleContracts');
    const { mutate: approveContract, isPending } = useApproveContractMutation();

    const handleApprove = () => {
        if (!contract?.id) return;
        approveContract(
            { id: contract.id, statusData: { status: 'issued' } },
            {
                onSuccess: () => {
                    onClose();
                }
            }
        );
    };

    return (
        <Drawer
            title={
                <div className="flex flex-col">
                    <Title level={4} className="!mb-0">{t('Duyệt hợp đồng')}</Title>
                    <Text type="secondary" className="font-mono">{contract?.contract_no}</Text>
                </div>
            }
            width={600}
            onClose={onClose}
            open={open}
            footer={
                <Space className="w-full justify-end">
                    <Button onClick={onClose} disabled={isPending}>{t('Đóng')}</Button>
                    {contract?.status === 'draft' && (
                        <Popconfirm
                            title={t('Bạn có chắc chắn muốn duyệt hợp đồng này? Chiếc xe sẽ bị khóa hoàn toàn.')}
                            onConfirm={handleApprove}
                            okText={t('Đồng ý')}
                            cancelText={t('Hủy')}
                        >
                            <Button type="primary" className="bg-green-600 hover:bg-green-700" loading={isPending}>
                                {t('Duyệt hợp đồng')}
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            }
        >
            <div className="flex flex-col gap-6">
                <ContractSnapshotViewer snapshot={contract?.snapshot} status={contract?.status} />
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                    <Title level={5} className="!mb-4">{t('Lịch sử Giao dịch')}</Title>
                    <ContractTimeline history={contract?.history} />
                </div>
            </div>
        </Drawer>
    );
};
