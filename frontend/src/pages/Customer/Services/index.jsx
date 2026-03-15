import React from 'react';
import { useTranslation } from 'react-i18next';
import BookingStepper from './components/BookingStepper';
import BookingSummary from './components/BookingSummary';
import Step1_VehicleInfo from './components/Step1_VehicleInfo';
import Step2_Schedule from './components/Step2_Schedule';
import Step3_Review from './components/Step3_Review';
import { useServiceBookingLogic } from './hooks/useServiceBookingLogic';
import { Helmet } from 'react-helmet-async';
import { FormProvider } from 'react-hook-form';

const ServicesPage = () => {
    const { t } = useTranslation(['services']);
    
    const {
        methods,
        currentStep,
        services,
        categories,
        vehicleBrands,
        filteredServices,
        selectedCategory,
        setSelectedCategory,
        timeSlots,
        bookingData,
        isSubmitting,
        isStep1Valid,
        isStep2Valid,
        updateBookingData,
        handleServiceToggle,
        handleNextStep,
        handlePrevStep,
        handleSubmitBooking
    } = useServiceBookingLogic();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] pt-24 pb-20 transition-colors duration-300 font-sans">
            <Helmet>
                <title>{t('services:title')} | TT AUTO</title>
            </Helmet>

            <FormProvider {...methods}>
                <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                    {/* Stepper Logic */}
                    <BookingStepper currentStep={currentStep} t={t} />

                {/* Main Content Layout */}
                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-start justify-between w-full mt-4 md:mt-12 xl:px-8">
                    
                    {/* Left Column Wrapper (Steps) */}
                    <div className="flex-1 w-full max-w-4xl mx-auto lg:mx-0">
                        {currentStep === 1 && (
                            <Step1_VehicleInfo 
                                bookingData={bookingData} 
                                updateBookingData={updateBookingData}
                                handleNextStep={handleNextStep}
                                categories={categories}
                                vehicleBrands={vehicleBrands}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                filteredServices={filteredServices}
                                handleServiceToggle={handleServiceToggle}
                                isStep1Valid={isStep1Valid}
                                t={t}
                            />
                        )}

                        {currentStep === 2 && (
                            <Step2_Schedule 
                                bookingData={bookingData}
                                updateBookingData={updateBookingData}
                                handleNextStep={handleNextStep}
                                handlePrevStep={handlePrevStep}
                                timeSlots={timeSlots}
                                t={t}
                            />
                        )}
                        {currentStep === 3 && (
                            <Step3_Review 
                                bookingData={bookingData}
                                handlePrevStep={handlePrevStep}
                                handleSubmitBooking={handleSubmitBooking}
                                isSubmitting={isSubmitting}
                                t={t}
                            />
                        )}
                    </div>

                    {/* Right Column Summary Sidebar */}
                    <BookingSummary 
                        bookingData={bookingData} 
                        currentStep={currentStep} 
                        t={t} 
                    />

                </div>
            </div>
            </FormProvider>
        </div>
    );
};

export default ServicesPage;
