import { Button } from 'antd';

const ActionButtons = ({ handleCancel, isLoading, isValid, t, isDemoAvailable = true }) => {
    return (
        <div className="pt-8 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-end gap-4">
            <Button 
                onClick={handleCancel}
                disabled={isLoading}
                className="w-full sm:w-auto !h-12 !px-8 !rounded-xl !border-slate-200 dark:!border-white/10 !bg-transparent !text-slate-600 dark:!text-slate-400 hover:!bg-slate-50 dark:hover:!bg-white/5 !font-bold transition-all disabled:!cursor-default"
            >
                {t('booking_btnCancel', 'Trở lại')}
            </Button>
            <Button 
                htmlType="submit"
                loading={isLoading}
                disabled={!isValid}
                type="primary"
                className={`w-full sm:w-auto !h-12 !px-10 !rounded-xl !font-black text-[15px] transition-all
                           ${isValid && !isLoading
                                ? '!bg-yellow-500 hover:!bg-yellow-400 !border-yellow-500 !text-slate-900 !shadow-[0_8px_20px_rgba(234,179,8,0.3)] !cursor-pointer'
                                : '!bg-slate-100 dark:!bg-white/5 !border-transparent !text-slate-400 dark:!text-slate-500 !shadow-none !cursor-default'
                           }`}
            >
                {!isDemoAvailable ? t('booking_btnWaitlist', 'Nhận thông báo khi có xe') : t('booking_btnSubmit', 'Xác nhận đăng ký')}
            </Button>
        </div>
    );
};

export default ActionButtons;
