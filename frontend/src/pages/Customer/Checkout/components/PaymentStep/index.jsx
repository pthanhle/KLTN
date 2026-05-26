import DeliveryForm from './DeliveryForm';
import ShippingMethod from './ShippingMethod';
import PaymentMethod from './PaymentMethod';
import PaymentSummary from './PaymentSummary';

const PaymentStep = ({ hookState }) => {
    const {
        t, checkedItems, subtotal, discount, appliedVoucher, removeVoucher, isValidatingVoucher, isLoading,
        deliveryInfo, updateDeliveryInfo,
        shippingMethod, setShippingMethod,
        paymentMethod, setPaymentMethod,
        applyPromoCode, handleCheckoutSubmit
    } = hookState;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-8 space-y-8 animate-in slide-in-from-left-4 duration-700">
                <DeliveryForm hookState={hookState} />
                <ShippingMethod shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} mockShippingMethods={hookState.mockShippingMethods} t={t} />
                <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} mockPaymentMethods={hookState.mockPaymentMethods} t={t} />
            </div>

            <div className="lg:col-span-4 animate-in slide-in-from-right-4 duration-700 delay-100">
                <PaymentSummary
                    checkedItems={checkedItems}
                    subtotal={subtotal}
                    shippingFee={hookState.shippingFee}
                    discount={discount}
                    appliedVoucher={appliedVoucher}
                    removeVoucher={removeVoucher}
                    isValidatingVoucher={isValidatingVoucher}
                    isLoading={isLoading}
                    applyPromoCode={applyPromoCode}
                    handleCheckoutSubmit={handleCheckoutSubmit}
                    methods={hookState.methods}
                    onBack={() => hookState.setCurrentStep(1)}
                    t={t}
                />
            </div>
        </div>
    );
};

export default PaymentStep;
