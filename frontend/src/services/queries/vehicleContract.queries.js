import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getVehicleContracts, 
    getVehicleContractById, 
    createVehicleContract, 
    updateVehicleContract,
    updateVehicleContractStatus
} from '../api/vehicleContract.api';

export const vehicleContractKeys = {
    all: ['vehicle-contracts'],
    lists: () => [...vehicleContractKeys.all, 'list'],
    list: (filters) => [...vehicleContractKeys.lists(), filters],
    details: () => [...vehicleContractKeys.all, 'detail'],
    detail: (id) => [...vehicleContractKeys.details(), id],
};

export const useVehicleContractsQuery = (params) => {
    return useQuery({
        queryKey: vehicleContractKeys.list(params),
        queryFn: () => getVehicleContracts(params),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });
};

export const useVehicleContractDetailQuery = (id) => {
    return useQuery({
        queryKey: vehicleContractKeys.detail(id),
        queryFn: () => getVehicleContractById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useCreateVehicleContractMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createVehicleContract(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.lists() });
            // Cập nhật vehicle-units vì unit sẽ bị khóa
            queryClient.invalidateQueries({ queryKey: ['vehicle-units'] });
        }
    });
};

export const useUpdateVehicleContractMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateVehicleContract(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.lists() });
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.detail(variables.id) });
        }
    });
};

export const useApproveContractMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, statusData }) => updateVehicleContractStatus(id, statusData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.lists() });
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: ['vehicle-units'] });
        }
    });
};
