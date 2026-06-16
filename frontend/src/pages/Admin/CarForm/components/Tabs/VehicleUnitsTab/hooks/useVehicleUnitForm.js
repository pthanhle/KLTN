import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateVehicleUnitMutation, useUpdateVehicleUnitMutation } from '../../../../../../../services/queries/vehicleUnit.queries';
import { getVehicleUnitSchema } from '../schemas/vehicleUnit.schema';

export const useVehicleUnitForm = ({ unit, carId, onClose, t }) => {
    const { mutate: createUnit, isPending: isCreating } = useCreateVehicleUnitMutation();
    const { mutate: updateUnit, isPending: isUpdating } = useUpdateVehicleUnitMutation();
    
    const isEditing = !!unit;
    const isSubmitting = isCreating || isUpdating;

    const schema = getVehicleUnitSchema(t);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            vin: '',
            engine_number: '',
            unit_code: '',
            model_year: '',
            odometer: '',
            condition: 'new',
            color_name: '',
            color_value: '',
            color_json: null,
            location_type: 'warehouse',
            location_name: '',
            location_code: '',
            notes: ''
        }
    });

    const { reset, handleSubmit: hookFormSubmit } = form;

    useEffect(() => {
        if (isEditing && unit) {
            reset({
                vin: unit.vin || '',
                engine_number: unit.engine_number || '',
                unit_code: unit.unit_code || '',
                model_year: unit.model_year || '',
                odometer: unit.odometer || 0,
                condition: unit.condition || 'new',
                color_name: unit.color?.name || '',
                color_value: unit.color?.value || '',
                color_json: unit.color?.name ? JSON.stringify({ name: unit.color.name, value: unit.color.value }) : null,
                location_type: unit.location?.type || 'warehouse',
                location_name: unit.location?.name || '',
                location_code: unit.location?.code || '',
                notes: unit.notes || ''
            });
        } else {
            reset({
                vin: '',
                engine_number: '',
                unit_code: '',
                model_year: '',
                odometer: '',
                condition: 'new',
                color_name: '',
                color_value: '',
                color_json: null,
                location_type: 'warehouse',
                location_name: '',
                location_code: '',
                notes: ''
            });
        }
    }, [isEditing, unit, reset]);

    const onSubmit = (values) => {
        const payload = {
            car_id: carId,
            vin: values.vin,
            engine_number: values.engine_number || undefined,
            unit_code: values.unit_code || undefined,
            model_year: values.model_year ? Number(values.model_year) : undefined,
            odometer: values.odometer ? Number(values.odometer) : 0,
            condition: values.condition,
            color: {
                name: values.color_name,
                value: values.color_value
            },
            location: {
                type: values.location_type,
                name: values.location_name,
                code: values.location_code
            },
            notes: values.notes
        };

        if (isEditing) {
            updateUnit({ id: unit.id, data: payload }, {
                onSuccess: () => {
                    reset();
                    onClose();
                }
            });
        } else {
            createUnit(payload, {
                onSuccess: () => {
                    reset();
                    onClose();
                }
            });
        }
    };

    return {
        form,
        isEditing,
        isSubmitting,
        submitForm: hookFormSubmit(onSubmit),
        resetForm: reset
    };
};
