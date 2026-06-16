import { VEHICLE_UNIT_STATUS_COLORS, TIMELINE_COLORS } from '../constants/vehicleUnit.constants';

export const getStatusColor = (status) => {
    return VEHICLE_UNIT_STATUS_COLORS[status] || 'default';
};

export const getTimelineColor = (type) => {
    return TIMELINE_COLORS[type] || 'gray';
};
