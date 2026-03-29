import ContactInfoBlock from './ContactInfoBlock';
import ContactForm from './ContactForm';

const ContactFormSection = ({ t, control, errors, isSubmitting, handleSubmit, contactData, isLoading }) => {
    return (
        <section className="max-w-screen-2xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10 animate-in slide-in-from-bottom-8 duration-700 delay-500">
            <ContactInfoBlock contactData={contactData} isLoading={isLoading} t={t} />
            
            <div className="lg:col-span-7 relative">
                <ContactForm
                    control={control}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                    t={t}
                />
            </div>
        </section>
    );
};

export default ContactFormSection;
