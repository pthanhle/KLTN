import { TRACKING_STAGES, QUOTATION_STATUSES, DIAGNOSTIC_STATUSES, TRACKING_STATUS_FILTERS } from '../constants/trackingConstants';

export const getLiveStatusText = (status, quotationStatus, selectedServices, t) => {
    switch (status) {
        case 'PENDING':
        case 'CONFIRMED':
            return t('live_status_pending', 'Chờ Cố vấn tiếp nhận');
        case 'ASSIGNED_TO_SA':
            return t('live_status_assigned', 'Cố vấn đang kiểm tra xe');
        case 'RO_CREATED':
            if (quotationStatus === 'WAITING_FOR_APPROVAL') return t('live_status_waiting_quote', 'Chờ khách duyệt Báo giá');
            return t('live_status_ro_created', 'Đã lập Lệnh, chờ xuất vật tư');
        case 'IN_PROGRESS':
            if (selectedServices && selectedServices.length > 0) {
                const mainTask = selectedServices[0]?.name;
                const extraTasks = selectedServices.length - 1;
                return extraTasks > 0 
                    ? `${t('live_status_executing', 'Đang thi công:')} ${mainTask} +${extraTasks}`
                    : `${t('live_status_executing', 'Đang thi công:')} ${mainTask}`;
            }
            return t('live_status_in_progress', 'Đang thi công dịch vụ');
        case 'QC_PENDING':
            return t('live_status_qc', 'Đang kiểm định (QC)');
        case 'READY_FOR_HANDOVER':
            return t('live_status_ready', 'Chờ bàn giao xe');
        case 'COMPLETED':
        case 'DELIVERED':
            return t('live_status_completed', 'Đã hoàn thành');
        default:
            return t('live_status_unknown', 'Chưa xác định');
    }
};

export const determineStage = (bookingStatus) => {
    switch (bookingStatus) {
        case 'ASSIGNED_TO_SA':
        case 'RO_CREATED':
            return TRACKING_STAGES.DIAGNOSIS;
        case 'IN_PROGRESS':
            return TRACKING_STAGES.EXECUTION;
        case 'QC_PENDING':
            return TRACKING_STAGES.QC;
        case 'COMPLETED':
        case 'DELIVERED':
            return TRACKING_STAGES.DELIVERY;
        default:
            return TRACKING_STAGES.DIAGNOSIS;
    }
};

export const getStageOptions = (t) => [
    { value: TRACKING_STAGES.ALL, label: t('tracking_filter_all_stages', 'Tất cả Giai đoạn') },
    { value: TRACKING_STAGES.DIAGNOSIS, label: t('stage_diagnosis', 'Chẩn đoán') },
    { value: TRACKING_STAGES.QUOTATION, label: t('stage_quotation', 'Báo giá') },
    { value: TRACKING_STAGES.EXECUTION, label: t('stage_execution', 'Thi công') },
    { value: TRACKING_STAGES.QC, label: t('stage_qc', 'Kiểm định') },
    { value: TRACKING_STAGES.DELIVERY, label: t('stage_delivery', 'Bàn giao') }
];

export const getStatusOptions = (t) => [
    { value: TRACKING_STATUS_FILTERS.ALL, label: t('tracking_filter_all_status', 'Tất cả Trạng thái') },
    { value: TRACKING_STATUS_FILTERS.WAITING_APPROVAL, label: t('tracking_filter_waiting', 'Chờ duyệt báo giá') },
    { value: TRACKING_STATUS_FILTERS.CRITICAL, label: t('tracking_filter_critical', 'Báo động đỏ (Critical)') }
];
