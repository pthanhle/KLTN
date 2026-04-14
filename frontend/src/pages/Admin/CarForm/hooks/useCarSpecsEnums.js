import { useQuery } from '@tanstack/react-query';
import { FUEL_TYPES_MOCK, MOCK_API_DELAY } from '../data/carSpecs.mock';

export const useCarSpecsEnums = () => {
    const { data: fuelTypes = [], isLoading } = useQuery({
        queryKey: ['car-specs-enums'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

            return FUEL_TYPES_MOCK;
        },
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });

    return {
        fuelTypes,
        isLoading
    };
};
