import { useFieldArray, useFormContext } from 'react-hook-form';

export const useOptionsBuilder = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options'
    });

    const handleAddOption = () => {
        append({ type: '', choices: [{ label: '', price_modifier: 0, image_url: '' }] });
    };

    return {
        control,
        fields,
        remove,
        handleAddOption
    };
};
