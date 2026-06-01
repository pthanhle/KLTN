import { useMemo } from 'react';
import { useGetServiceBookingsQuery } from '../../../../../../services/queries/bookingQueries';
import { useTranslation } from 'react-i18next';

export const useServiceHistoryLogic = () => {
    const { t } = useTranslation('profile');
    const { data: bookings = [], isLoading } = useGetServiceBookingsQuery();

    const servicesData = useMemo(() => {
        return bookings.map(b => ({
            booking_code: b.booking_code,
            user_id: b.user_id,
            service_type: b.service_type || 'MAINTENANCE',
            advisor_info: b.advisor_id ? { id: b.advisor_id._id, name: b.advisor_id.full_name, phone: b.advisor_id.phone, avatar: b.advisor_id.avatar } : null,
            mechanic_info: b.mechanic_id ? { id: b.mechanic_id._id, name: b.mechanic_id.full_name, level: 'Technician', avatar: b.mechanic_id.avatar } : null,
            vehicle_info: {
                brand: b.vehicle_info?.brand || '',
                model: b.vehicle_info?.model || '',
                license_plate: b.vehicle_info?.license_plate || '',
                vin_number: b.vehicle_info?.vin_number || '',
                current_odometer: b.vehicle_info?.current_odometer || 0
            },
            services: b.services.map(s => ({
                service_id: s.service_id,
                service_name: s.service_name,
                price: s.price
            })),
            total_cost: b.total_cost || 0,
            customer_note: b.customer_note || '',
            attachments: b.attachments || { before: [], after: [] },
            rating: b.rating,
            booking_date: new Date(b.booking_date).toISOString().split('T')[0],
            time_slot: b.time_slot,
            booking_status: b.booking_status,
            timeline: b.timeline || []
        }));
    }, [bookings]);

    const nextRecommendedDate = servicesData.length > 0 ? "20/05/2026" : null;

    return {
        t,
        servicesData,
        nextRecommendedDate,
        isLoading
    };
};
