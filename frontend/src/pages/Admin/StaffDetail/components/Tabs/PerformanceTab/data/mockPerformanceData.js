import { mockStaffData } from '../../../../../Staff/data/mockStaffData';

export const getStaffPerformance = (staffId) => {
    const staff = mockStaffData.find(s => s._id === staffId);

    return staff?.performance || {
        kpis: { revenue: null, csat: null, efficiency: null, rework: null },
        kanban: { todo: [], inProgress: [], done: [] }
    };
};