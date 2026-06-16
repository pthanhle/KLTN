import React from 'react';
import { Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VehicleUnitEmptyState = () => {
    const { t } = useTranslation('adminCars');

    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Inbox className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{t('Chưa thể thêm xe vật lý')}</h3>
            <p className="text-slate-500 text-center max-w-sm">
                {t('Bạn cần tạo thông tin chung cho Mẫu xe này (Lưu nháp hoặc Đăng tải) trước khi có thể nhập Kho Xe.')}
            </p>
        </div>
    );
};

export default VehicleUnitEmptyState;
