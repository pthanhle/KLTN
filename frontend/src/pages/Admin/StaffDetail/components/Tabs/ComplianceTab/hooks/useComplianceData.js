import { useState, useEffect } from 'react';
import { generateMockComplianceForStaff } from '../data/mockComplianceData';

export const useComplianceData = (staffId) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!staffId) return;

        let isMounted = true;
        setIsLoading(true);

        setTimeout(() => {
            if (isMounted) {
                const fetchedData = generateMockComplianceForStaff(staffId);
                setData(fetchedData);
                setIsLoading(false);
            }
        }, 800); // 800ms để người dùng cảm nhận được quá trình mã hóa/giải mã

        return () => {
            isMounted = false;
        };
    }, [staffId]);

    const logUnmaskAction = (fieldName) => {
        console.log(`[AUDIT LOG] Administrator unmasked sensitive field: ${fieldName} for staffId: ${staffId}`);
    };

    const updateLocalData = (newData) => {
        setData(newData);
    };

    return {
        data,
        isLoading,
        logUnmaskAction,
        updateLocalData
    };
};
