import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BookingCard = ({ booking }) => {
    const { t } = useTranslation('adminServiceReception');
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: booking._id,
        data: {
            type: 'booking',
            booking,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 999 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white dark:bg-[#1c1c1e] rounded-xl p-5 shadow-lg dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)] relative group hover:-translate-y-1 transition-transform cursor-grab touch-none border border-slate-100 dark:border-white/5"
        >
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-3 gap-2">
                <div className="flex flex-col gap-1.5">
                    <span className="w-fit bg-slate-50 dark:bg-[#0a0a0b] text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-mono text-[10px] tracking-wider border border-slate-200 dark:border-white/10 shadow-inner">
                        {booking.booking_code}
                    </span>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-500 text-[10px] font-bold">
                        <Calendar className="w-3 h-3 mr-1" />
                        {booking.booking_date.split('-').reverse().join('/')}
                        <span className="mx-1.5 opacity-50">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        {booking.time_slot}
                    </div>
                </div>
                <GripVertical className="text-slate-400 dark:text-slate-500 w-4 h-4 shrink-0 mt-1 cursor-grab" />
            </div>

            <div className="mb-4">
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight">
                    {booking.customer_name} {booking.is_vip && <span className="text-yellow-500 dark:text-yellow-400 ml-1">★</span>}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {booking.vehicle_brand} {booking.vehicle_model} • {booking.license_plate}
                </p>
            </div>

            <div className="mb-4 bg-slate-50 dark:bg-[#0a0a0b] p-3 rounded-lg border border-slate-200 dark:border-white/5 shadow-inner">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 block">
                    {t('bookingCard_symptoms', 'Symptoms / Notes')}
                </span>
                <p className="text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {booking.vehicle_condition || t('bookingCard_noSymptoms', 'No specific symptoms noted.')}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {booking.selected_services?.map((service, index) => (
                    <span 
                        key={index} 
                        className="bg-slate-100 dark:bg-[#23293c] px-2 py-1 rounded-md text-[10px] uppercase tracking-wide text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                        {service}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BookingCard;
