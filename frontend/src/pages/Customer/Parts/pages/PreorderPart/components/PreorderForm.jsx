import { FormProvider } from 'react-hook-form';
import { Form } from 'antd';
import ContactSection from './FormSections/ContactSection';
import FitmentSection from './FormSections/FitmentSection';
import FormActions from './FormSections/FormActions';

const PreorderForm = ({ 
    part,
    register, 
    control,
    handleSubmit, 
    errors, 
    quantityValue, 
    handleQuantityChange, 
    isSubmitting, 
    navigate, 
    t 
}) => {
    return (
        <Form component="form" onSubmitCapture={handleSubmit} className="space-y-8">
            <ContactSection control={control} errors={errors} t={t} />
            <FitmentSection 
                part={part} 
                control={control} 
                errors={errors} 
                quantityValue={quantityValue} 
                handleQuantityChange={handleQuantityChange} 
                t={t} 
            />
            <FormActions isSubmitting={isSubmitting} t={t} navigate={navigate} />
        </Form>
    );
};

export default PreorderForm;
