export const RECEPTION_CONSTANTS = {
    MAX_SA_WORKLOAD: 5,
    POLLING_INTERVAL: 3000,
    ANIMATION_DURATION: 300,
    BAY_FILTER_OPTIONS: [
        { value: 'ALL', labelKey: 'filter_all_bays', fallback: 'Tất cả khoang' },
        { value: 'LIFT', labelKey: 'bay_type_lift', fallback: 'CẦU NÂNG' },
        { value: 'ALIGNMENT', labelKey: 'bay_type_align', fallback: 'CÂN CHỈNH' },
        { value: 'PAINT', labelKey: 'bay_type_paint', fallback: 'PHÒNG SƠN' },
    ]
};
