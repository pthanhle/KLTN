import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const UniversalFitIndicator = ({ isUniversal, t }) => {
    if (!isUniversal) return null;

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex gap-5 items-start shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-100 dark:border-transparent">
                <ShieldCheck className="text-blue-600 dark:text-blue-400" size={24} strokeWidth={2.5} />
            </div>
            <div>
                <h4 className="font-bold text-blue-950 dark:text-blue-300 text-[16px] mb-2">
                    {t('universal_title', 'Phụ tùng Phổ Thông (Universal Fit)')}
                </h4>
                <p className="text-blue-700/80 dark:text-blue-400/80 text-[14px] font-medium leading-relaxed">
                    {t('universal_desc', 'Đây là dòng linh kiện mở, dễ dàng lắp ráp tương thích với hầu hết các mẫu xe thuộc mọi nhãn hiệu. Thiết kế tiêu chuẩn công nghiệp không kén đặc thù kỹ thuật của riêng dòng xe nào.')}
                </p>
            </div>
        </div>
    );
};

export default UniversalFitIndicator;
