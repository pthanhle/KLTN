import React from 'react';
import { Car, Wrench, Calendar, MapPin, Edit3 } from 'lucide-react';

const AppointmentDetails = ({ bookingData, handlePrevStep, t }) => {
    return (
        <div className="w-full bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-[28px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 lg:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                        <Calendar className="text-yellow-600 dark:text-yellow-500" size={20} />
                    </div>
                    <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">
                        {t('services:appointment_details', 'Appointment Details')}
                    </h3>
                </div>
                <button 
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
                >
                    {t('services:edit_details', 'Edit Details')}
                </button>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
                
                {/* Vehicle */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0">
                        <Car size={22} className="text-slate-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1.5">{t('services:vehicle', 'VEHICLE')}</p>
                        <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight mb-2">
                            {bookingData.vehicle_brand || bookingData.vehicle_model ? `${bookingData.vehicle_brand} ${bookingData.vehicle_model}` : t('services:pending_details', 'Pending Details')}
                        </p>
                        {bookingData.license_plate && (
                            <p className="text-[12px] font-mono text-slate-500 tracking-wider">
                                {t('services:license_plate', 'Plate')}: {bookingData.license_plate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Service */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0">
                        <Wrench size={22} className="text-slate-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1.5">{t('services:service_category', 'SERVICE CATEGORY')}</p>
                        <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight mb-2">
                            {bookingData.selected_services?.length > 0 
                                ? bookingData.selected_services.map(s => s.serviceName).join(', ') 
                                : t('services:pending_details', 'Pending Details')}
                        </p>
                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-1">
                            {bookingData.vehicle_condition || t('services:price_contact', 'Liên hệ báo giá')}
                        </p>
                    </div>
                </div>

                {/* Date & Time */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-yellow-50 border border-yellow-200/50 dark:bg-yellow-500/10 dark:border-yellow-500/20 flex items-center justify-center shrink-0">
                        <Calendar size={22} className="text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1.5">{t('services:step2_short', 'DATE & TIME')}</p>
                        <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight mb-2">
                            {bookingData.booking_date || t('services:pending_details', 'Pending Details')}
                        </p>
                        <p className="text-[12px] font-bold text-yellow-600 dark:text-yellow-500">
                            {bookingData.time_slot ? `${bookingData.time_slot}` : ''}
                        </p>
                    </div>
                </div>

                {/* Service Center */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0">
                        <MapPin size={22} className="text-slate-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1.5">{t('services:service_center', 'SERVICE CENTER')}</p>
                        <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight mb-2">
                            {t('services:service_center_name', 'TT AUTO - Central Hub')}
                        </p>
                        <p className="text-[12px] text-slate-500">
                            {t('services:service_center_address', '45 Industrial Ave, Tech District')}
                        </p>
                    </div>
                </div>

            </div>

            {/* Important Note */}
            <div className="mx-6 lg:mx-8 mb-6 lg:mb-8 p-5 bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 rounded-2xl">
                <p className="text-[13px] leading-relaxed text-orange-800 dark:text-orange-200/80">
                    <strong className="text-orange-900 dark:text-orange-300 font-bold mr-2">
                        {t('services:important_note', 'Important Note:')}
                    </strong>
                    {t('services:important_note_desc')}
                </p>
            </div>
        </div>
    );
};

export default AppointmentDetails;
