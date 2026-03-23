import { ArrowLeft } from 'lucide-react';
import { usePreorderLogic } from './hooks/usePreorderLogic';
import SummaryCard from './components/SummaryCard';
import PreorderForm from './components/PreorderForm';
import PreorderSkeleton from './components/PreorderSkeleton';

const PreorderPartPage = () => {
    const {
        part, selectedOptions, isLoading, isSubmitting,
        register, control, handleSubmit, errors,
        quantityValue, handleQuantityChange, handleOptionSelect,
        navigate, t
    } = usePreorderLogic();

    if (isLoading) {
        return <PreorderSkeleton />;
    }

    if (!part) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => navigate(`/parts/${part.id}`)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> {t('btn_back', 'Quay lại')}
                </button>

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        {t('preorder_title', 'Yêu cầu Đặt hàng Phụ tùng')}
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
                        {t('preorder_subtitle', 'Sản phẩm hiện đang tạm hết hàng. Chúng tôi sẽ báo giá và điều chuyển từ tổng kho quốc tế sau khi nhận được thông tin từ bạn.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-4 sticky top-32">
                        <SummaryCard 
                            part={part} 
                            selectedOptions={selectedOptions} 
                            handleOptionSelect={handleOptionSelect}
                            errors={errors}
                            t={t} 
                        />
                    </div>

                    <div className="lg:col-span-8">
                        <PreorderForm
                            part={part}
                            register={register}
                            control={control}
                            handleSubmit={handleSubmit}
                            errors={errors}
                            quantityValue={quantityValue}
                            handleQuantityChange={handleQuantityChange}
                            isSubmitting={isSubmitting}
                            navigate={navigate}
                            t={t}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreorderPartPage;
