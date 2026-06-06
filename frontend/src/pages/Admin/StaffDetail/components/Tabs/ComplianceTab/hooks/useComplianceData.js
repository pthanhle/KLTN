import { useQuery } from '@tanstack/react-query';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';

export const useComplianceData = (staffId) => {
    const { data, isLoading } = useQuery({
        queryKey: ['admin-staff-compliance', staffId],
        queryFn: () => AdminStaffAPI.getCompliance(staffId),
        enabled: !!staffId,
        staleTime: 60 * 1000,
    });

    const logUnmaskAction = (fieldName) => {
        console.log(`[AUDIT LOG] Administrator unmasked sensitive field: ${fieldName} for staffId: ${staffId}`);
    };

    return {
        data,
        isLoading,
        logUnmaskAction,
        updateLocalData: () => {},
    };
};
