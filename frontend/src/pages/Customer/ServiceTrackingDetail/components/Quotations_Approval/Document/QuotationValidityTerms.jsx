import React from 'react';
import { AlertCircle } from 'lucide-react';

const QuotationValidityTerms = ({ quotation, t }) => {
    const validityDays = quotation?.validity_days || 7;

    return (
        <div className="mt-8 mb-4 p-5 rounded-xl bg-slate-50 dark:bg-[#1e1e20]/50 border border-slate-100 dark:border-white/5 flex items-start gap-3 transition-colors">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-[13px] leading-relaxed text-slate-500 dark:text-[#a0a0a0]">
                <strong className="text-slate-700 dark:text-[#d3c5ac]">{t('quote_terms_title', 'Lưu ý pháp lý & Cam kết')}:</strong>{' '}
                {t('quote_bar_note', `Báo giá có giá trị trong vòng {{days}} ngày. Vui lòng kiểm tra kỹ các thông tin phụ tùng và tiền công trước khi Phê duyệt. Mọi thắc mắc xin liên hệ Cố vấn dịch vụ.`, { days: validityDays })}
            </div>
        </div>
    );
};

export default QuotationValidityTerms;
