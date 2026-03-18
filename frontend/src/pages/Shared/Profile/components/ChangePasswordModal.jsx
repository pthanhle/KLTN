import { Modal, Input, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPasswordSchema } from '../schemas/profileSchema';
import { useMemo, useEffect } from 'react';

const ChangePasswordModal = ({ isOpen, onClose, t }) => {
    const schema = useMemo(() => getPasswordSchema(t), [t]);
    
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const handleFinish = (data) => {
        // Mock save logic
        message.success(t('password_success', 'Đổi mật khẩu thành công!'));
        reset();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {t('password_title', 'Đổi Mật Khẩu')}
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
            className="[&_.ant-modal-content]:!bg-white dark:[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!rounded-[32px] [&_.ant-modal-close]:!text-slate-400 [&_.ant-modal-header]:!bg-transparent [&_.ant-modal-header]:!border-b-0"
            width={480}
            centered
        >
            <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit(handleFinish)}>
                <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('password_current', 'Mật khẩu hiện tại')}</label>
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({ field }) => (
                            <Input.Password 
                                {...field}
                                className={`!h-12 !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-slate-900 dark:!text-white hover:!border-yellow-500/50 focus:!border-yellow-500 transition-all ${errors.currentPassword ? '!border-red-500 focus:!border-red-500' : ''}`} 
                            />
                        )}
                    />
                    {errors.currentPassword && <span className="text-[13px] font-medium text-red-500">{errors.currentPassword.message}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('password_new', 'Mật khẩu mới')}</label>
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                            <Input.Password 
                                {...field}
                                className={`!h-12 !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-slate-900 dark:!text-white hover:!border-yellow-500/50 focus:!border-yellow-500 transition-all ${errors.newPassword ? '!border-red-500 focus:!border-red-500' : ''}`} 
                            />
                        )}
                    />
                    {errors.newPassword && <span className="text-[13px] font-medium text-red-500">{errors.newPassword.message}</span>}
                </div>

                <div className="flex flex-col gap-2 mb-2">
                    <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('password_confirm', 'Xác nhận mật khẩu mới')}</label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input.Password 
                                {...field}
                                className={`!h-12 !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-slate-900 dark:!text-white hover:!border-yellow-500/50 focus:!border-yellow-500 transition-all ${errors.confirmPassword ? '!border-red-500 focus:!border-red-500' : ''}`} 
                            />
                        )}
                    />
                    {errors.confirmPassword && <span className="text-[13px] font-medium text-red-500">{errors.confirmPassword.message}</span>}
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-white/5 pt-6">
                    <Button 
                        onClick={onClose}
                        className="!h-11 !px-5 !rounded-xl !border-slate-200 dark:!border-white/10 !bg-transparent !text-slate-600 dark:!text-slate-300 hover:!bg-slate-50 dark:hover:!bg-white/5 !font-bold transition-all disabled:!cursor-default"
                    >
                        {t('buttons_cancel', 'Hủy')}
                    </Button>
                    <Button 
                        htmlType="submit"
                        type="primary"
                        className={`!h-11 !px-6 !rounded-xl !font-black transition-all ${isValid ? '!bg-yellow-500 hover:!bg-yellow-400 !border-yellow-500 !text-slate-900 !shadow-[0_4px_14px_rgba(234,179,8,0.25)]' : '!bg-slate-100 dark:!bg-white/5 !border-transparent !text-slate-400 dark:!text-slate-500 !shadow-none !cursor-default'}`}
                    >
                        {t('buttons_save', 'Lưu thay đổi')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal;
