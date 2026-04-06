import { useFieldArray, useFormContext } from 'react-hook-form';

export const useSpecsBuilder = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specs'
    });

    const handleAddSpec = () => {
        append({ label: '', value: '' });
    };

    return {
        control,
        fields,
        remove,
        handleAddSpec
    };
};
