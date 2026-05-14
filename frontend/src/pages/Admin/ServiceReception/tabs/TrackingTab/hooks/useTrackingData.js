import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../../data/mockServiceBookings';
import { getOverviewData } from '../../../../../Customer/ServiceTrackingDetail/data/mockOverviewData';
import { getDiagnosticData } from '../../../../../Customer/ServiceTrackingDetail/data/mockDiagnosticData';
import { getQuotationData } from '../../../../../Customer/ServiceTrackingDetail/data/mockQuotationData';
import { determineStage } from '../utils/trackingUtils';
import { TRACKING_STAGES, TRACKING_STATUS_FILTERS } from '../constants/trackingConstants';

export const useTrackingData = (queryParams) => {
    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndMapData = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));

                const { page, limit, search, stage, status } = queryParams;

                const activeBookings = MOCK_SERVICE_BOOKINGS.filter(b => b.status !== 'CANCELLED');

                const mappedData = activeBookings.map(booking => {
                    const diagnostic = getDiagnosticData(booking.booking_code);
                    const quotation = getQuotationData(booking.booking_code);
                    const overview = getOverviewData(booking.booking_code);

                    const current_stage = determineStage(booking.status);

                    let quotationStatus = quotation?.status || 'PENDING';
                    if (booking.status === 'ASSIGNED_TO_SA') quotationStatus = 'WAITING_FOR_APPROVAL';
                    if (booking.status === 'IN_PROGRESS') quotationStatus = 'APPROVED';

                    return {
                        id: booking._id || booking.booking_code,
                        booking_code: booking.booking_code,
                        time_in: booking.time_slot ? booking.time_slot.split(' - ')[0] : '08:00',
                        customer_name: booking.customer_name,
                        license_plate: booking.license_plate,
                        vehicle_model: booking.vehicle_model,
                        diagnostic_status: diagnostic?.summary?.critical > 0 ? 'critical' : 'healthy',
                        quotation_status: quotationStatus,
                        current_stage: current_stage,
                        raw_status: booking.status,
                        selected_services: booking.selected_services || []
                    };
                });

                // Simulate Backend filtering
                const filteredData = mappedData.filter(row => {
                    const matchesSearch = !search ||
                        row.booking_code.toLowerCase().includes(search.toLowerCase()) ||
                        row.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                        row.license_plate.toLowerCase().includes(search.toLowerCase());

                    const matchesStage = stage === TRACKING_STAGES.ALL || row.current_stage === stage;

                    let matchesStatus = true;
                    if (status === TRACKING_STATUS_FILTERS.WAITING_APPROVAL) {
                        matchesStatus = row.quotation_status === 'WAITING_FOR_APPROVAL';
                    } else if (status === TRACKING_STATUS_FILTERS.CRITICAL) {
                        matchesStatus = row.diagnostic_status === 'critical';
                    }

                    return matchesSearch && matchesStage && matchesStatus;
                });

                // Simulate Backend pagination
                const start = (page - 1) * limit;
                const paginatedData = filteredData.slice(start, start + limit);

                setData(paginatedData);
                setTotalResults(filteredData.length);
            } catch (error) {
                console.error("Failed to load tracking data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndMapData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.page, queryParams.limit, queryParams.search, queryParams.stage, queryParams.status]);

    return { data, totalResults, isLoading };
};
