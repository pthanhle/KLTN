import InfoCardItem from './InfoCardItem';

const ContactInfoCards = ({ contactData, isLoading, t }) => {
    // If loading, show 3 dummy skeletons
    const itemsToRender = isLoading 
        ? ['address', 'hotline', 'workingHours'] 
        : Object.keys(contactData).filter(key => ['address', 'hotline', 'workingHours'].includes(key));

    return (
        <section className="max-w-screen-2xl mx-auto px-8 -mt-24 relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {itemsToRender.map((key) => (
                    <InfoCardItem 
                        key={key}
                        itemKey={key}
                        data={contactData?.[key]}
                        isLoading={isLoading}
                        t={t}
                    />
                ))}
            </div>
        </section>
    );
};

export default ContactInfoCards;
