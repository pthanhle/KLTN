import { ChevronRight, HelpCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const OrderHeader = ({ orderDetail, t }) => {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2" data-purpose="header-section">
            <div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                    <Link to="/profile/orders" className="hover:text-yellow-500 transition-colors">
                        {t('order_history_title', 'Lịch sử giao dịch')}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span>{t('order_btn_detail', 'Chi tiết')}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t('order_dtl_title', 'Đơn hàng')} #{orderDetail.order_code}
                </h1>
                <p className="text-slate-500 mt-1">{t('order_dtl_placed_on', 'Đặt lúc')} {orderDetail.created_at}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
                <Button className="!h-auto !py-2.5 !px-5 !rounded-xl !border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-800 !text-sm !font-semibold hover:!bg-slate-50 dark:hover:!bg-slate-700 transition-all flex items-center gap-2 shadow-sm !text-slate-700 dark:!text-slate-300">
                    <HelpCircle className="w-4 h-4" /> 
                    {t('order_dtl_support', 'Liên hệ Hỗ trợ')}
                </Button>
                <Button className="!h-auto !py-2.5 !px-5 !rounded-xl !border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-800 !text-sm !font-semibold hover:!bg-slate-50 dark:hover:!bg-slate-700 transition-all flex items-center gap-2 shadow-sm !text-slate-700 dark:!text-slate-300">
                    <FileText className="w-4 h-4" /> 
                    {t('order_btn_invoice', 'Xuất Hoá đơn VAT')}
                </Button>
            </div>
        </header>
    );
};

export default OrderHeader;
