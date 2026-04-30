import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import VehicleForm from './VehicleForm';
import ServiceCategorySelector from './ServiceCategorySelector';
import ServiceList from './ServiceList';

const { TextArea } = Input;

const Step1_VehicleInfo = ({ 
    bookingData, 
    updateBookingData, 
    handleNextStep, 
    categories,
    vehicleBrands,
    selectedCategory,
    setSelectedCategory,
    filteredServices,
    handleServiceToggle,
    isStep1Valid,
    isServicesLoading,
    t 
}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-10 lg:gap-14 w-full md:pr-4"
        >
            {/* Header */}
            <div>
                <h2 className="text-[28px] lg:text-[36px] font-black text-slate-900 dark:text-white tracking-tight mb-3">
                    {t('services:step1_title')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base leading-relaxed">
                    {t('services:step1_subtitle')}
                </p>
            </div>

            <VehicleForm 
                bookingData={bookingData}
                vehicleBrands={vehicleBrands}
                t={t}
            />

            {/* Service Category Buttons (Micro Component) */}
            <ServiceCategorySelector 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isServicesLoading={isServicesLoading}
                t={t}
            />

            {/* Service Items Grid (Micro Component) */}
            <ServiceList 
                filteredServices={filteredServices}
                bookingData={bookingData}
                handleServiceToggle={handleServiceToggle}
                isServicesLoading={isServicesLoading}
                t={t}
            />

            {/* Symptoms / Note */}
            <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4 block">{t('services:vehicle_symptoms')}</label>
                <Controller
                    name="vehicle_condition"
                    control={control}
                    render={({ field }) => (
                        <TextArea 
                            {...field}
                            rows={4}
                            placeholder={t('services:symptoms_placeholder')}
                            className="w-full text-[15px] font-medium"
                            size="large"
                        />
                    )}
                />
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-8 lg:pt-12 mb-20 lg:mb-32">
                <button 
                    onClick={handleNextStep}
                    disabled={!isStep1Valid}
                    className={`px-10 py-4 lg:py-5 font-bold tracking-wider rounded-2xl flex items-center gap-4 transition-all ${
                        !isStep1Valid 
                        ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed' 
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-[0_15px_30px_rgba(234,179,8,0.25)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.35)] hover:-translate-y-1'
                    }`}
                >
                    {t('services:next_step')}
                    <ArrowRight size={22} />
                </button>
            </div>
        </motion.div>
    );
};
export default Step1_VehicleInfo;
