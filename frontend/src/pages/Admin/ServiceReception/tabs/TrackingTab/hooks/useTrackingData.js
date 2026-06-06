import { useState, useEffect } from 'react';
import { AdminRepairAPI } from '../../../../../../services/api/adminRepair.api';
import { TRACKING_STAGES, TRACKING_STATUS_FILTERS } from '../constants/trackingConstants';

const STATUS_TO_STAGE = {
    RECEIVED: TRACKING_STAGES.DIAGNOSIS,
    DIAGNOSING: TRACKING_STAGES.DIAGNOSIS,
    QUOTING: TRACKING_STAGES.QUOTATION,
    IN_PROGRESS: TRACKING_STAGES.EXECUTION,
    QC_TESTING: TRACKING_STAGES.QC,
    COMPLETED: TRACKING_STAGES.DELIVERY,
};

const mapProgressToRow = (p) => {
    const booking = p.booking_id || {};
    const vehicle = booking.vehicle_info || {};
    const customer = booking.user_id || booking.customer_info || {};

    const diagStep = (p.timeline || []).find(t => t.step === 'DIAGNOSING');
    const hasCritical = (diagStep?.diagnostics || []).some(cat =>
        (cat.items || []).some(item => item.status === 'critical')
    );

    const quotationStatus = p.quotation?.status || 'PENDING';
    const currentStage = STATUS_TO_STAGE[p.status] || TRACKING_STAGES.DIAGNOSIS;

    const timeSlot = booking.time_slot || '';
    const timeIn = timeSlot ? timeSlot.split(' - ')[0] : '';

    const services = (booking.services || []).map(s => ({ name: s.service_name }));
    if (!services.length && booking.service_type) services.push({ name: booking.service_type });

    return {
        id: p._id,
        booking_code: booking.booking_code || p._id,
        time_in: timeIn,
        customer_name: customer.full_name || customer.name || 'Khách hàng',
        license_plate: vehicle.license_plate || '',
        vehicle_model: vehicle.model || vehicle.brand || '',
        diagnostic_status: hasCritical ? 'critical' : 'healthy',
        quotation_status: quotationStatus,
        current_stage: currentStage,
        raw_status: p.status,
        selected_services: services,
        mechanic_name: p.mechanic_id?.full_name || '',
        bay_id: p.bay_id || '',
        progress_id: p._id,
    };
};

export const useTrackingData = (queryParams) => {
    const [data, setData] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const statuses = 'RECEIVED,DIAGNOSING,QUOTING,IN_PROGRESS,QC_TESTING,COMPLETED';
                const res = await AdminRepairAPI.getRepairProgresses({
                    limit: 200,
                    page: 1,
                    search: queryParams.search || undefined,
                });

                let rows = (res?.repairProgresses || []).map(mapProgressToRow);

                if (queryParams.stage && queryParams.stage !== TRACKING_STAGES.ALL) {
                    rows = rows.filter(r => r.current_stage === queryParams.stage);
                }

                if (queryParams.status === TRACKING_STATUS_FILTERS.WAITING_APPROVAL) {
                    rows = rows.filter(r => r.quotation_status === 'PENDING' && r.current_stage === TRACKING_STAGES.QUOTATION);
                } else if (queryParams.status === TRACKING_STATUS_FILTERS.CRITICAL) {
                    rows = rows.filter(r => r.diagnostic_status === 'critical');
                }

                setTotalResults(rows.length);
                const start = (queryParams.page - 1) * queryParams.limit;
                setData(rows.slice(start, start + queryParams.limit));
            } catch (err) {
                console.error('TrackingTab: failed to load data', err);
                setData([]);
                setTotalResults(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [queryParams.page, queryParams.limit, queryParams.search, queryParams.stage, queryParams.status]);

    return { data, totalResults, isLoading };
};
