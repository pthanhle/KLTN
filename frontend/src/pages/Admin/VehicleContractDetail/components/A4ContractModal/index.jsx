import React from 'react';
import { Modal, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useContractBuilder } from './hooks/useContractBuilder';
import { DocumentWrapper } from './components/Layouts/DocumentWrapper';

export const A4ContractModal = ({ contract, isOpen, onClose }) => {
    const { t } = useTranslation('adminVehicleContractBuilder');
    const { state, actions, refs } = useContractBuilder(contract._id, contract);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={850}
            title={t('Xem trước và In Hợp Đồng')}
            footer={(
                <div className="flex gap-3 justify-end items-center px-2 py-1">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#1c1c1e] transition-colors text-[13px]"
                    >
                        {t('Đóng')}
                    </button>

                    {contract.status === 'draft' && (
                        <button
                            onClick={actions.handleSave}
                            disabled={state.isSaving}
                            className="px-6 py-2.5 flex items-center justify-center rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 text-[13px]"
                        >
                            {state.isSaving ? t('Đang lưu...') : t('Lưu thay đổi')}
                        </button>
                    )}

                    <button
                        onClick={actions.handlePrint}
                        className="px-8 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all active:scale-95 text-[13px]"
                    >
                        <PrinterOutlined /> {t('In Hợp Đồng')}
                    </button>
                </div>
            )}
            style={{ top: 20 }}
            styles={{ body: { padding: '32px 0', overflowY: 'auto', maxHeight: '80vh', backgroundColor: '#f0f0f0' } }}
        >
            <div className="bg-white mx-auto shadow-lg w-[210mm] overflow-hidden contract-print-area">
                <DocumentWrapper
                    ref={refs.printRef}
                    contract={state.contract}
                    isEditMode={state.isEditMode}
                    onChange={actions.handleFieldChange}
                />
            </div>
        </Modal>
    );
};
