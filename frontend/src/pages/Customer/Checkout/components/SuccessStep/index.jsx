import { Skeleton, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Truck, ShoppingBag } from 'lucide-react';
import HeroSection from './components/HeroSection';
import ProductSummary from './components/Cards/ProductSummary';
import ShippingInfo from './components/Cards/ShippingInfo';
import PaymentInfo from './components/Cards/PaymentInfo';
import SupportBanner from './components/SupportBanner';

const SuccessStep = ({ hookState }) => {
    const { t, orderSuccessData, timelineSteps, handleCopyOrderId } = hookState;

    if (!orderSuccessData) {
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
            {/* Header / Hero */}
            <HeroSection orderData={orderSuccessData} handleCopyOrderId={handleCopyOrderId} t={t} />


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
                    <PaymentInfo
                        paymentMethod={orderSuccessData.payment?.method_name}
                        cardTail={orderSuccessData.payment?.card_tail}
                        t={t}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 mb-16 animate-in fade-in zoom-in-95 duration-700 delay-400">
                <Link to={`/profile/orders/${orderSuccessData.order_code}`} className="block w-full sm:w-[400px]">
                    <Button 
                        block
                        type="primary" 
                        icon={<Truck size={22} strokeWidth={2.5} />} 
                        className="!h-16 bg-yellow-500 hover:!bg-yellow-600 border-none text-slate-900 font-black uppercase tracking-widest rounded-full shadow-[0_15px_30px_rgba(234,179,8,0.3)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.4)] transition-all active:scale-[0.98] text-[14px]"
                    >
                        {t('success_track_btn')}
                    </Button>
                </Link>
                <Link to="/" className="block w-full sm:w-[400px]">
                    <Button 
                        block
                        type="default" 
                        icon={<ShoppingBag size={22} strokeWidth={2.5} />}
                        className="!h-16 bg-slate-100 dark:bg-white/5 border-none hover:bg-slate-200 dark:hover:!bg-white/10 text-slate-900 dark:!text-white font-black uppercase tracking-widest rounded-full shadow-none transition-all active:scale-[0.98] text-[14px]"
                    >
                        {t('success_continue_btn')}
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

export default SuccessStep;
