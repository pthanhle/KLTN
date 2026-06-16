import React from 'react';
import { Modal, Timeline, Skeleton, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useVehicleUnitDetailQuery } from '../../../../../../../../../services/queries/vehicleUnit.queries';
import { getTimelineColor, getStatusColor } from '../../../utils/vehicleUnit.utils';
import dayjs from 'dayjs';

const { Text } = Typography;

const VehicleUnitTimelineModal = ({ open, onClose, unitId }) => {
    const { t } = useTranslation('adminCars');
    const { data: response, isLoading } = useVehicleUnitDetailQuery(unitId);
    
    const transactions = response?.transactions || [];

    const getStatusName = (status) => {
        const statNames = {
            in_stock: t('Đang rảnh (In Stock)'),
            reserved: t('Đang giữ chỗ'),
            contract_pending: t('Chờ duyệt HĐ'),
            sold: t('Đã Bán'),
            delivered: t('Đã Bàn Giao'),
            service_hold: t('Đang bảo dưỡng'),
            in_transit: t('Đang vận chuyển'),
            archived: t('Lưu trữ')
        };
        return statNames[status] || status;
    };

    return (
        <Modal
            title={t('Lịch sử Giao dịch')}
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
            destroyOnHidden
        >
            <div className="mt-6">
                {isLoading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : transactions.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">{t('Chưa có lịch sử giao dịch nào.')}</div>
                ) : (
                    <Timeline
                        mode="left"
                        items={transactions.map(tx => ({
                            color: getTimelineColor(tx.type),
                            children: (
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <Text strong className="text-slate-800 dark:text-slate-200">
                                            {tx.reason || tx.type}
                                        </Text>
                                        <Text type="secondary" className="text-xs">
                                            {dayjs(tx.createdAt).format('DD/MM/YYYY HH:mm')}
                                        </Text>
                                    </div>
                                    <div className="text-sm text-slate-500 mb-1">
                                        {t('Thực hiện bởi:')} <span className="font-medium text-slate-700 dark:text-slate-300">{tx.performed_by?.full_name || t('Hệ thống')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Tag color={getStatusColor(tx.from_status)}>{getStatusName(tx.from_status)}</Tag>
                                        <span className="text-slate-400">➔</span>
                                        <Tag color={getStatusColor(tx.to_status)}>{getStatusName(tx.to_status)}</Tag>
                                    </div>
                                </div>
                            )
                        }))}
                    />
                )}
            </div>
        </Modal>
    );
};

export default VehicleUnitTimelineModal;
