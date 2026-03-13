import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CalendarWidget from './CalendarWidget';
import TimeSlotSelector from './TimeSlotSelector';

const Step2_Schedule = ({ 
    bookingData, 
    updateBookingData, 
    handleNextStep, 
    handlePrevStep, 
    timeSlots,
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
                    {t('services:step2_title', 'Schedule Appointment')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base leading-relaxed">
                    {t('services:step2_subtitle', 'Select your preferred date and time for service.')}
                </p>
            </div>

            <div className="flex flex-col gap-8">
                <CalendarWidget 
                    bookingData={bookingData}
                    updateBookingData={updateBookingData}
                />

                <TimeSlotSelector 
                    timeSlots={timeSlots}
                    bookingData={bookingData}
                    updateBookingData={updateBookingData}
                    t={t}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 lg:pt-12 mb-20 lg:mb-32">
                <button 
                    onClick={handlePrevStep}
                    className="px-6 py-4 flex items-center gap-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold tracking-wider transition-colors"
                >
                    <ArrowLeft size={20} />
                    {t('services:back_to_service', 'Back to Service')}
                </button>
                <button 
                    onClick={handleNextStep}
                    disabled={!bookingData.booking_date || !bookingData.time_slot}
                    className={`px-8 lg:px-10 py-4 lg:py-5 font-bold tracking-wider rounded-2xl flex items-center gap-4 transition-all ${!bookingData.booking_date || !bookingData.time_slot ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed' : 'bg-slate-900 dark:bg-white text-white dark:text-[#0a0a0b] hover:bg-black dark:hover:bg-slate-200 shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1'}`}
                >
                    {t('services:continue_to_confirmation', 'Continue to Confirmation')}
                    <ArrowRight size={22} />
                </button>
            </div>
        </motion.div>
    );
};

export default Step2_Schedule;
