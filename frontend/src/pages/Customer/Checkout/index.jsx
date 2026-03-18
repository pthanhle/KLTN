import { useCheckoutLogic } from './hooks/useCheckoutLogic';
import StepIndicator from './components/Shared/StepIndicator';
import CartStep from './components/CartStep';
import PaymentStep from './components/PaymentStep';
import SuccessStep from './components/SuccessStep';

const CheckoutFlow = () => {
    const hookState = useCheckoutLogic();
    const { currentStep, t } = hookState;

    return (
        <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] min-h-screen flex flex-col font-sans transition-colors">
            <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 max-w-screen-2xl mx-auto w-full">

                {currentStep < 3 && <StepIndicator currentStep={currentStep} t={t} />}

                {currentStep === 1 && <CartStep hookState={hookState} />}
                {currentStep === 2 && <PaymentStep hookState={hookState} />}

                {currentStep === 3 && <SuccessStep hookState={hookState} />}
            </main>
        </div>
    );
};

export default CheckoutFlow;
