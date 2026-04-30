import React from 'react';
import { Car, Calendar, FileText, PhoneCall } from 'lucide-react';
import { Image } from 'antd';

const BookingSummary = ({ bookingData, currentStep, t }) => {
    return (
        <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 sticky top-[120px] flex flex-col gap-6">
            {/* Summary Card - Switches based on step */}
            {currentStep < 3 ? (
                <div className="w-full bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none">
                    {/* Car Image Header */}
                    <div className="w-full h-[180px] md:h-[200px] relative bg-black">
                        <Image 
                            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" 
                            alt="Booking Summary" 
                            width="100%"
                            height="100%"
                            className="object-cover opacity-60" 
                            preview={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-white text-[18px] font-bold">{t('services:booking_summary', 'Booking Summary')}</h3>
                            <p className="text-white/60 text-[11px] font-mono tracking-widest mt-1">
                                {t('services:ref', 'Ref:')} TT-{Math.floor(Math.random() * 9000) + 1000}-B
                            </p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col gap-8">
                        {/* Vehicle Node */}
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0">
                                <Car size={18} className="text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1">{t('services:vehicle', 'VEHICLE')}</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                    {bookingData.vehicle_brand || bookingData.vehicle_model ? `${bookingData.vehicle_brand} ${bookingData.vehicle_model}` : t('services:pending_details', 'Pending Details')}
                                </p>
                                {bookingData.license_plate && <p className="text-[11px] font-mono text-slate-500 mt-1.5 uppercase bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded inline-block">{bookingData.license_plate}</p>}
                            </div>
                        </div>

                        {/* Appointment Node */}
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0">
                                <Calendar size={18} className="text-slate-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1">{t('services:appointment', 'APPOINTMENT')}</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                    {bookingData.booking_date ? `${bookingData.booking_date} | ${bookingData.time_slot}` : t('services:select_in_step_2', 'Select in Step 2')}
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-200 dark:bg-white/10 my-1"></div>

                        {/* Estimate Node */}
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200/50 dark:bg-yellow-500/10 dark:border-yellow-500/20 flex items-center justify-center shrink-0">
                                <FileText size={18} className="text-yellow-600 dark:text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-1">{t('services:estimated_total', 'ESTIMATED TOTAL')}</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    $ --.--
                                </p>
                                <p className="text-[10px] text-slate-400 italic mt-1.5 leading-relaxed">{t('services:final_price_note', '*Final price confirmed after inspection')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-[#101014] border border-white/5 rounded-[28px] overflow-hidden shadow-2xl p-6 md:p-8">
                    <h3 className="text-white text-[22px] font-bold mb-1">{t('services:booking_summary', 'Booking Summary')}</h3>
                    <p className="text-slate-400 text-[11px] font-mono tracking-widest mb-8">
                        Order #BKG-{Math.floor(Math.random() * 90000) + 10000}
                    </p>

                    <div className="flex flex-col gap-5 mb-8">
                        <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/5 pb-4">
                            <span className="text-slate-400">{t('services:base_service_fee')}</span>
                            <span className="text-white font-bold">{t('services:contact')}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/5 pb-4">
                            <span className="text-slate-400">{t('services:parts_and_materials')}</span>
                            <span className="text-white font-bold">---</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px] font-medium border-b border-white/5 pb-4">
                            <span className="text-slate-400">{t('services:environmental_tax')}</span>
                            <span className="text-white font-bold">---</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-[12px] font-bold text-slate-400 tracking-widest uppercase mb-2">{t('services:estimated_total')}</p>
                        <p className="text-[32px] font-black tracking-tighter text-yellow-500">
                            {t('services:contact')}
                        </p>
                        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1">{t('services:taxes_included')}</p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">{t('services:included_perks')}</p>
                        <ul className="flex flex-col gap-3">
                            {[
                                t('services:perk_1'),
                                t('services:perk_2'),
                                t('services:perk_3')
                            ].map((perk, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-[13px] font-medium text-slate-300 leading-tight">{perk}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Help Card */}
            <div className="w-full bg-[#141416] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none"></div>
                <h4 className="text-white font-bold mb-2">{t('services:need_help', 'Need Help?')}</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{t('services:need_help_desc', 'Our service advisors are ready to assist you.')}</p>
                <div className="flex items-center gap-3 text-yellow-500">
                    <PhoneCall size={20} />
                    <span className="font-bold tracking-widest">{t('services:contact_phone', '1-800-TT-AUTO')}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingSummary;
