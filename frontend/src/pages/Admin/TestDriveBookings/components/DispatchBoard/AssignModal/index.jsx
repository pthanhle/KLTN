import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import PrioritySelector from './components/PrioritySelector';
import { useAssignModalForm } from './hooks/useAssignModalForm';

const AssignConfirmModal = ({ isOpen, onClose, onConfirm, pendingData, isAssigning }) => {
    const { t } = useTranslation(['adminTestDriveBookings']);
    const { form, handleConfirmSubmit } = useAssignModalForm(isOpen, pendingData, onConfirm);

    return (
        <Modal
            title={t('adminTestDriveBookings:assign_modal_title', 'Xác nhận giao việc')}
            open={isOpen}
            onOk={handleConfirmSubmit}
            onCancel={onClose}
            footer={
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-6">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2.5 rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors font-bold text-sm"
                    >
                        {t('adminTestDriveBookings:btn_cancel', 'Hủy')}
                    </button>
                    <button 
                        onClick={handleConfirmSubmit} 
                        disabled={isAssigning}
                        className={`px-8 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 transition-all font-bold text-sm shadow-lg shadow-slate-900/20 dark:shadow-yellow-500/20 flex items-center justify-center
                            ${isAssigning ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isAssigning ? (
                            <div className="w-5 h-5 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin"></div>
                        ) : (
                            t('adminTestDriveBookings:btn_confirm', 'Xác Nhận')
                        )}
                    </button>
                </div>
            }
            classNames={{
                content: 'dark:bg-[#1f1f23] !rounded-2xl',
                header: 'dark:bg-[#1f1f23]',
                title: 'dark:text-white text-lg',
            }}
            destroyOnHidden
            closeIcon={<span className="dark:text-slate-400 hover:text-rose-500 transition-colors">✖</span>}
        >
            <Form
                form={form}
                layout="vertical"
                className="mt-4"
            >
                <div className="mb-4 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {t('adminTestDriveBookings:booking_customer', 'Khách hàng')}: 
                        <strong className="ml-1 text-slate-800 dark:text-white">{pendingData?.booking?.fullName}</strong>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {t('adminTestDriveBookings:assign_to_staff', 'Phân công cho')}: 
                        <strong className="ml-1 text-slate-800 dark:text-white">{pendingData?.staff?.fullName}</strong>
                    </p>
                </div>

                <Form.Item
                    name="priority"
                    label={<span className="dark:text-slate-300 font-medium mb-1 inline-block">{t('adminTestDriveBookings:priority_label', 'Mức độ ưu tiên')}</span>}
                    rules={[{ required: true }]}
                >
                    <PrioritySelector t={t} />
                </Form.Item>

                <Form.Item
                    name="note"
                    label={<span className="dark:text-slate-300 font-medium mb-1 inline-block">{t('adminTestDriveBookings:note_label', 'Ghi chú giao việc')}</span>}
                >
                    <Input.TextArea
                        rows={3}
                        placeholder={t('adminTestDriveBookings:note_placeholder', 'Nhập ghi chú cho nhân viên (không bắt buộc)...')}
                        className="dark:bg-[#141416] dark:text-white dark:border-white/10 dark:placeholder:text-slate-600 rounded-xl resize-none p-3 focus:border-indigo-500 hover:border-indigo-400"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AssignConfirmModal;
