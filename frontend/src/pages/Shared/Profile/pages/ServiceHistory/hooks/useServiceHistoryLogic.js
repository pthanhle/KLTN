import { useMemo, useState } from 'react';
import { useGetServiceBookingsQuery } from '../../../../../../services/queries/bookingQueries';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 4;

export const useServiceHistoryLogic = () => {
    const { t } = useTranslation('profile');
    const { data: bookings = [], isLoading } = useGetServiceBookingsQuery();
    const [currentPage, setCurrentPage] = useState(1);

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

    const nextRecommendedDates = useMemo(() => {
        const completedBookings = servicesData.filter(b => b.booking_status === 'COMPLETED');
        if (completedBookings.length === 0) return [];

        const vehicleGroups = {};
        completedBookings.forEach(b => {
            const vehicleId = b.vehicle_info?.license_plate || b.vehicle_info?.vin_number || 'Unknown';
            if (!vehicleGroups[vehicleId]) {
                vehicleGroups[vehicleId] = [];
            }
            vehicleGroups[vehicleId].push(b);
        });

        const recommendations = [];
        for (const [vehicleId, bookings] of Object.entries(vehicleGroups)) {
            const latestBooking = bookings.reduce((latest, current) => {
                return new Date(current.booking_date) > new Date(latest.booking_date) ? current : latest;
            });

            const nextDate = new Date(latestBooking.booking_date);
            nextDate.setDate(nextDate.getDate() + 90);

            const day = String(nextDate.getDate()).padStart(2, '0');
            const month = String(nextDate.getMonth() + 1).padStart(2, '0');
            const year = nextDate.getFullYear();

            recommendations.push({
                vehicleId,
                brand: latestBooking.vehicle_info?.brand,
                model: latestBooking.vehicle_info?.model,
                license_plate: latestBooking.vehicle_info?.license_plate,
                nextDate: `${day}/${month}/${year}`
            });
        }

        return recommendations;
    }, [servicesData]);

    const paginatedServices = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return servicesData.slice(start, start + PAGE_SIZE);
    }, [servicesData, currentPage]);

    return {
        t,
        servicesData: paginatedServices,
        totalServices: servicesData.length,
        currentPage,
        setCurrentPage,
        pageSize: PAGE_SIZE,
        nextRecommendedDates,
        isLoading
    };
};
