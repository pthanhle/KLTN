import ContactHero from './components/HeroArea';
import ContactInfoCards from './components/InfoSection';
import ContactFormSection from './components/FormSection';
import LocationMap from './components/MapSection';
import { useContactLogic } from './hooks/useContactLogic';

const ContactPage = () => {
    const { t, isLoadingData, contactData, form } = useContactLogic();
    const { control, errors, isSubmitting, handleSubmit } = form;

    return (
        <main className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0c1324] font-sans selection:bg-yellow-500 selection:text-slate-900 transition-colors duration-300">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-[120px]"></div>
            </div>

            <ContactHero t={t} />
            
            <ContactInfoCards contactData={contactData} isLoading={isLoadingData} t={t} />
            
            <ContactFormSection 
                t={t} 
                control={control} 
                errors={errors} 
                isSubmitting={isSubmitting} 
                handleSubmit={handleSubmit}
                contactData={contactData}
                isLoading={isLoadingData}
            />
            
            <LocationMap contactData={contactData} isLoading={isLoadingData} t={t} />
        </main>
    );
};

export default ContactPage;
