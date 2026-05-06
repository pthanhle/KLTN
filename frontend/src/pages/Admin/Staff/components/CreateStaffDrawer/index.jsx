import React from 'react';
import { Drawer, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserPlus, X } from 'lucide-react';
import { StaffFormFields } from './components/FormFields';
import { useCreateStaff } from '../../hooks/useCreateStaff';

export const CreateStaffDrawer = ({ isOpen, onClose }) => {
    const { t } = useTranslation(['adminStaffCreate', 'common']);

    const { methods, isSubmitting, handleCreateSubmit, resetForm } = useCreateStaff(onClose, t);
    const { control, formState: { errors } } = methods;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Drawer
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
            placement="right"
            size="large"
            onClose={handleClose}
            open={isOpen}
            closeIcon={<X size={20} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors" />}
            className="dark:bg-[#1c1c1e] [&_.ant-drawer-header]:dark:border-white/5 [&_.ant-drawer-header]:dark:bg-[#1c1c1e] [&_.ant-drawer-body]:dark:bg-[#1c1c1e] [&_.ant-drawer-footer]:dark:border-white/5 [&_.ant-drawer-footer]:dark:bg-[#1c1c1e]"
            footer={
                <div className="flex justify-end gap-3 py-2">
                    <Button
                        onClick={handleClose}
                        className="h-10 px-6 rounded-lg font-medium border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:!text-slate-800 dark:hover:!text-white hover:!border-slate-300 dark:hover:!border-white/20"
                        disabled={isSubmitting}
                    >
                        {t('adminStaffCreate:btn_cancel', 'Hủy bỏ')}
                    </Button>
                    <Button
                        onClick={handleCreateSubmit}
                        type="primary"
                        className="h-10 px-6 rounded-lg font-bold bg-yellow-500 hover:!bg-yellow-400 text-slate-900 border-none flex items-center gap-2"
                        loading={isSubmitting}
                    >
                        {isSubmitting
                            ? t('adminStaffCreate:btn_submitting', 'Đang xử lý...')
                            : t('adminStaffCreate:btn_submit', 'Tạo tài khoản')
                        }
                    </Button>
                </div>
            }
        >
            <form onSubmit={handleCreateSubmit} className="flex flex-col">
                <StaffFormFields t={t} control={control} errors={errors} />
            </form>
        </Drawer>
    );
};
