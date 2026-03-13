import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AppointmentDetails from './AppointmentDetails';

const Step3_Review = ({ 
    bookingData, 
    handlePrevStep, 
    handleSubmitBooking, 
    isSubmitting,
    t 
}) => {
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
                    {t('services:step3_title', 'Review Your Booking')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base leading-relaxed">
                    {t('services:step3_subtitle', 'Please double-check your service details before confirming your appointment.')}
                </p>
            </div>

            <div className="flex flex-col gap-8">
                <AppointmentDetails 
                    bookingData={bookingData}
                    handlePrevStep={handlePrevStep}
                    t={t}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 lg:pt-12 mb-20 lg:mb-32">
                <button 
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="px-6 py-4 flex items-center gap-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold tracking-wider transition-colors disabled:opacity-50"
                >
                    <ArrowLeft size={20} />
                    {t('services:back_to_schedule', 'Back to Schedule')}
                </button>
                <button 
                    onClick={() => handleSubmitBooking(t)}
                    disabled={isSubmitting}
                    className="px-8 lg:px-10 py-4 lg:py-5 font-bold tracking-wider rounded-2xl flex items-center gap-4 transition-all bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_15px_30px_rgba(234,179,8,0.25)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.35)] hover:-translate-y-1"
                >
                    {isSubmitting ? t('services:processing', 'Processing...') : t('services:confirm_booking', 'Confirm Booking')}
                    {!isSubmitting && <ArrowRight size={22} />}
                </button>
            </div>
        </motion.div>
    );
};

export default Step3_Review;
