import { Wrench, Sparkles, Settings } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ExclusiveServices = () => {
    const { t } = useTranslation('layout');
    const navigate = useNavigate();

    const SERVICES_DATA = [
        {
            id: 1,
            icon: Wrench,
            title: t('customer.home.exclusiveServices.services.s1_title'),
            desc: t('customer.home.exclusiveServices.services.s1_desc')
        },
        {
            id: 2,
            icon: Sparkles,
            title: t('customer.home.exclusiveServices.services.s2_title'),
            desc: t('customer.home.exclusiveServices.services.s2_desc')
        },
        {
            id: 3,
            icon: Settings,
            title: t('customer.home.exclusiveServices.services.s3_title'),
            desc: t('customer.home.exclusiveServices.services.s3_desc')
        }
    ];

    const handleCardClick = (id) => {
        if (id === 1) {
            navigate('/services', { state: { category: 'Bảo dưỡng' } });
        } else if (id === 2) {
            navigate('/services', { state: { category: 'Chăm sóc xe' } });
        } else if (id === 3) {
            navigate('/parts');
        }
    };

    return (
        <section className="py-20 lg:py-28 bg-[#fafafa] dark:bg-[#060608] border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
                        {t('customer.home.exclusiveServices.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
                        {t('customer.home.exclusiveServices.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    {SERVICES_DATA.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            id={service.id}
                            icon={service.icon}
                            title={service.title}
                            desc={service.desc}
                            onClick={() => handleCardClick(service.id)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ExclusiveServices;
