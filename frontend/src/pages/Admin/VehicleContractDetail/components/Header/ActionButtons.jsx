import React from 'react';
import { useTranslation } from 'react-i18next';
import { Printer, CheckCircle, FileSignature } from 'lucide-react';
import { Dropdown, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { STATUS_ENUM } from '../../constants/contract.constants';

export const ActionButtons = ({
    contract,
    onApprove,
    isApproving,
    onPrint,
    onSign,
    onDeliver,
    onCancel
}) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const status = contract?.status;

    const hasAttachments = contract?.attachments?.length > 0;
    const canSign = status === STATUS_ENUM.ISSUED;

    const menuItems = [
        {
            key: 'cancel',
            label: <span className="text-red-500 font-medium">{t('Hủy Hợp Đồng')}</span>,
            onClick: onCancel,
            disabled: [STATUS_ENUM.SIGNED, STATUS_ENUM.CANCELLED].includes(status)
        }
    ];

    return (
        <div className="flex gap-3 items-center">
            <button
                onClick={onPrint}
                className="px-6 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95 text-[13px]"
            >
                <Printer size={16} /> {t('Xem bản in')}
            </button>

            {status === STATUS_ENUM.DRAFT && (
                <button
                    onClick={onApprove}
                    disabled={isApproving}
                    className="px-8 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                >
                    {isApproving ? <CheckCircle size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                    {t('Duyệt hợp đồng')}
                </button>
            )}

            {status === STATUS_ENUM.ISSUED && (
                <Tooltip title={!hasAttachments ? t('Vui lòng đính kèm bản scan hợp đồng có chữ ký trước khi xác nhận.') : ''}>
                    <span className="inline-block">
                        <button
                            onClick={onSign}
                            disabled={!hasAttachments}
                            className="px-8 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100 text-[13px]"
                        >
                            <FileSignature size={16} />
                            {t('Xác nhận Khách Đã Ký')}
                        </button>
                    </span>
                </Tooltip>
            )}

            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                    <MoreOutlined />
                </button>
            </Dropdown>
        </div>
    );
};
