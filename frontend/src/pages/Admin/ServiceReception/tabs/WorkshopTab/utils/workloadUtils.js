// Tiêu chuẩn quốc tế cho việc phân loại cảnh báo (International Standard Status Colors)
export const WORKLOAD_THRESHOLDS = {
    DANGER: 80,   // Quá tải (> 80%)
    WARNING: 50,  // Đang bận (> 50%)
};

export const WORKLOAD_COLORS = {
    DANGER: {
        hex: '#ef4444',
        cssClass: 'bg-red-500/10 text-red-500 border-red-500/20'
    },
    WARNING: {
        hex: '#f59e0b',
        cssClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    },
    SUCCESS: {
        hex: '#10b981',
        cssClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    }
};

/**
 * Tính toán style chuẩn quốc tế cho Workload dựa trên tỷ lệ phần trăm
 * @param {number} workloadPercentage - Tỷ lệ phần trăm workload hiện tại
 * @returns {Object} - Object chứa mã màu hex và class Tailwind tương ứng
 */
export const getWorkloadStyle = (workloadPercentage) => {
    if (workloadPercentage >= WORKLOAD_THRESHOLDS.DANGER) {
        return WORKLOAD_COLORS.DANGER;
    }
    if (workloadPercentage >= WORKLOAD_THRESHOLDS.WARNING) {
        return WORKLOAD_COLORS.WARNING;
    }
    return WORKLOAD_COLORS.SUCCESS;
};
