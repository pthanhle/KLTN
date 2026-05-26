import { useState } from 'react';
import { Skeleton, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { RefreshCw, ShoppingBag, PhoneCall, ArrowLeft, AlertCircle } from 'lucide-react';
import { CheckoutAPI } from '../../../../../services/api/checkout';
import ProductSummary from '../SuccessStep/components/Cards/ProductSummary';
import ShippingInfo from '../SuccessStep/components/Cards/ShippingInfo';
import SupportBanner from '../SuccessStep/components/SupportBanner';

const FailedStep = ({ hookState }) => {
    const { t, orderSuccessData } = hookState;
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetryPayment = async () => {
        if (!orderSuccessData) return;
        setIsRetrying(true);
        try {
            const amount = orderSuccessData.financials?.grand_total || 0;
            const res = await CheckoutAPI.createVNPayPayment(orderSuccessData._id, amount);
            if (res && res.url) {
                window.location.href = res.url;
            } else {
                throw new Error('Không tạo được liên kết thanh toán.');
            }
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi tạo lại liên kết thanh toán. Vui lòng thử lại sau.');
        } finally {
            setIsRetrying(false);
        }
    };

    if (!orderSuccessData || !orderSuccessData.items) {
        return (
            <div className="max-w-5xl mx-auto pt-6 pb-20 px-4">
                <div className="flex items-center justify-center mb-10"><Skeleton.Avatar active size={100} /></div>
                <Skeleton active paragraph={{ rows: 2 }} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12">
                    <Skeleton.Button active block style={{ height: '400px' }} className="!rounded-3xl" />
                    <div className="space-y-8">
                        <Skeleton.Button active block style={{ height: '250px' }} className="!rounded-3xl" />
                        <Skeleton.Button active block style={{ height: '150px' }} className="!rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pt-6 pb-20 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header / Hero Section in Red/Error Theme */}
            <div className="text-center mb-12 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150"></div>
                    <div className="relative w-24 h-24 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center border-4 border-red-500/30">
                        <AlertCircle className="w-12 h-12 text-red-500" strokeWidth={2.5} />
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">
                    {t('failed_title', 'Thanh toán thất bại')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium text-base leading-relaxed">
                    {t('failed_subtitle', 'Giao dịch thanh toán của bạn không thành công hoặc đã bị hủy bởi người dùng.')}
                </p>
                <div className="inline-flex items-center gap-3 bg-red-50 dark:bg-red-500/5 px-6 py-2.5 rounded-full border border-red-100 dark:border-red-500/10 text-xs font-bold text-red-600 dark:text-red-400 mt-6 shadow-sm">
                    <span>{t('failed_order_id', 'MÃ ĐƠN HÀNG:')}</span>
                    <span className="font-black tracking-widest">{orderSuccessData.order_code}</span>
                </div>
            </div>

            {/* Main Content Grid 2-cols */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {/* Left Col: Order Summary */}
                <div className="animate-in slide-in-from-left-4 duration-700 delay-100 flex flex-col h-full">
                    <ProductSummary
                        items={orderSuccessData.items}
                        total={orderSuccessData.financials?.grand_total}
                        t={t}
                    />
                </div>

                {/* Right Col: Separate Info Cards */}
                <div className="flex flex-col gap-8 h-full animate-in slide-in-from-right-4 duration-700 delay-200">
                    <ShippingInfo
                        customerName={orderSuccessData.delivery?.receiver_name}
                        customerPhone={orderSuccessData.delivery?.phone}
                        address={orderSuccessData.delivery?.address}
                        shippingMethod={orderSuccessData.shipping?.provider}
                        deliveryEst={orderSuccessData.shipping?.estimated_delivery}
                        t={t}
                    />
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                            <span>{t('failed_reason_title', 'Thông tin giao dịch')}</span>
                        </h3>
                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800/50">
                                <span className="text-slate-400 font-medium">{t('payment_method_label', 'Phương thức:')}</span>
                                <span className="text-slate-900 dark:text-white font-bold">{orderSuccessData.payment?.method_name || 'Thanh toán VNPay'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-400 font-medium">{t('payment_status_label', 'Trạng thái:')}</span>
                                <span className="text-red-500 font-black uppercase tracking-wider bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full text-xs">
                                    {t('payment_status_unpaid', 'CHƯA THANH TOÁN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 mb-16 animate-in fade-in zoom-in-95 duration-700 delay-400">
                <Button
                    block
                    type="primary"
                    icon={<RefreshCw size={20} className={isRetrying ? 'animate-spin' : ''} strokeWidth={2.5} />}
                    loading={isRetrying}
                    onClick={handleRetryPayment}
                    className="!h-16 bg-red-600 hover:!bg-red-700 border-none text-white font-black uppercase tracking-widest rounded-full shadow-[0_15px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.4)] transition-all active:scale-[0.98] text-[14px] sm:w-[400px]"
                >
                    {t('failed_retry_btn', 'Thử thanh toán lại')}
                </Button>
                <Link to="/" className="block w-full sm:w-[400px]">
                    <Button
                        block
                        type="default"
                        icon={<ShoppingBag size={20} strokeWidth={2.5} />}
                        className="!h-16 bg-slate-100 dark:bg-white/5 border-none hover:bg-slate-200 dark:hover:!bg-white/10 text-slate-900 dark:!text-white font-black uppercase tracking-widest rounded-full shadow-none transition-all active:scale-[0.98] text-[14px]"
                    >
                        {t('success_continue_btn', 'Quay lại trang chủ')}
                    </Button>
                </Link>
            </div>

            {/* Support Box */}
            <div className="animate-in fade-in zoom-in-95 duration-700 delay-300">
                <SupportBanner t={t} />
            </div>
        </div>
    );
};

export default FailedStep;
