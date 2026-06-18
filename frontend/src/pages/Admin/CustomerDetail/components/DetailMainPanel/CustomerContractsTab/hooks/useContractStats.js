import { useMemo } from 'react';
import { useVehicleContractsQuery } from '../../../../../../../services/queries/vehicleContract.queries';

export const useContractStats = (customerId) => {
    const { data: allContractsResponse, isLoading } = useVehicleContractsQuery({
        customerId,
        limit: 100
    });

    const stats = useMemo(() => {
        const count = allContractsResponse?.total || allContractsResponse?.data?.length || 0;
        const totalValue = allContractsResponse?.data?.reduce((sum, c) => {
            return sum + (c.pricing_snapshot?.grand_total || c.pricing_snapshot?.sale_price || 0);
        }, 0) || 0;

        return { count, totalValue };
    }, [allContractsResponse]);

    return { stats, isLoading };
};
