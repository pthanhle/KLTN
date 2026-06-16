import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    getVehicleUnits, 
    getVehicleUnitById, 
    createVehicleUnit, 
    updateVehicleUnit, 
    updateVehicleUnitStatus 
} from '../api/vehicleUnit.api';
import { adminProductKeys } from './adminProduct.queries';

export const vehicleUnitKeys = {
    all: ['vehicle-units'],
    lists: () => [...vehicleUnitKeys.all, 'list'],
    list: (filters) => [...vehicleUnitKeys.lists(), filters],
    details: () => [...vehicleUnitKeys.all, 'detail'],
    detail: (id) => [...vehicleUnitKeys.details(), id],
};

export const useVehicleUnitsQuery = (params) => {
    return useQuery({
        queryKey: vehicleUnitKeys.list(params),
        queryFn: () => getVehicleUnits(params),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });
};

export const useVehicleUnitDetailQuery = (id) => {
    return useQuery({
        queryKey: vehicleUnitKeys.detail(id),
        queryFn: () => getVehicleUnitById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useCreateVehicleUnitMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createVehicleUnit(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: vehicleUnitKeys.lists() });
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        }
    });
};

export const useUpdateVehicleUnitMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateVehicleUnit(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: vehicleUnitKeys.lists() });
            queryClient.invalidateQueries({ queryKey: vehicleUnitKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        }
    });
};

export const useUpdateVehicleUnitStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, statusData }) => updateVehicleUnitStatus(id, statusData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: vehicleUnitKeys.lists() });
            queryClient.invalidateQueries({ queryKey: vehicleUnitKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        }
    });
};
