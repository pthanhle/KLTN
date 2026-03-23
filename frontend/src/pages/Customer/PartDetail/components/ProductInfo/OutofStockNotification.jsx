import { Info } from 'lucide-react';

const OutofStockNotification = ({ t }) => {
    return (
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#13151a] border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center shrink-0 text-slate-500">
                    <Info size={16} strokeWidth={2.5} />
                </span>
                <div className="flex-1 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                    {t('out_of_stock_desc', 'Sản phẩm này hiện đang tạm hết hàng. Quý khách vui lòng liên hệ trực tiếp với Cố vấn dịch vụ để được hỗ trợ nhập kho hoặc tìm linh kiện thay thế.')}
                </div>
            </div>
        </div>
    );
};

export default OutofStockNotification;
