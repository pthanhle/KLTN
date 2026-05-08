import React from 'react';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserPlus, X } from 'lucide-react';
import { StaffFormFields } from './components/FormFields';
import { useCreateStaff } from '../../hooks/useCreateStaff';

export const CreateStaffModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation(['adminStaffCreate', 'common']);

    const { methods, isSubmitting, handleCreateSubmit, resetForm } = useCreateStaff(onClose, t);
    const { control, formState: { errors } } = methods;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                        <UserPlus size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-none">
                            {t('adminStaffCreate:drawer_title', 'Thêm mới Nhân viên')}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1">
                            {t('adminStaffCreate:drawer_subtitle', 'Nhập các thông tin cơ bản để khởi tạo hồ sơ nhân sự trên hệ thống.')}
                        </p>
                    </div>
                </div>
            }
            centered
            width={700}
            onCancel={handleClose}
            open={isOpen}
            closeIcon={<X size={20} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors" />}
            className="dark:bg-[#1c1c1e] [&_.ant-modal-content]:dark:bg-[#1c1c1e] [&_.ant-modal-header]:dark:bg-[#1c1c1e] [&_.ant-modal-header]:dark:border-white/5 [&_.ant-modal-footer]:dark:border-white/5 [&_.ant-modal-content]:dark:border [&_.ant-modal-content]:dark:border-white/10"
            footer={
                <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100 dark:border-white/5">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-[#1c1c1e] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-full font-black text-[11px] tracking-widest uppercase active:scale-95 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {t('adminStaffCreate:btn_cancel', 'Hủy bỏ')}
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateSubmit}
                        disabled={isSubmitting}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? t('adminStaffCreate:btn_submitting', 'Đang xử lý...')
                            : t('adminStaffCreate:btn_submit', 'Tạo tài khoản')
                        }
                    </button>
                </div>
            }
        >
            <form onSubmit={handleCreateSubmit} className="flex flex-col mt-6">
                <StaffFormFields t={t} control={control} errors={errors} />
            </form>
        </Modal>
    );
};
