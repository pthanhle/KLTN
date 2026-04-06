import { useFieldArray, useFormContext } from 'react-hook-form';

export const useOptionsBuilder = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options'
    });

    const handleAddOption = () => {
        append({ type: '', choices: [] });
    };

    return {
        control,
        fields,
        remove,
        handleAddOption
    };
};
