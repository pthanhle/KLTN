import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroSection = ({ onViewCars, onBookService }) => {
    const { t } = useTranslation('layout');
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-[#0a0a0b] overflow-hidden transition-colors duration-300">
            {/* Background Image Area */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2400&auto=format&fit=crop" 
                    alt="TT AUTO Luxury Car" 
                    className="w-full h-full object-cover object-center scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10 pointer-events-none"></div>
                {/* Global slight dark overlay */}
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10 pointer-events-none"></div>
            </div>

            {/* Content in Container */}
            <div className="container mx-auto px-6 lg:px-10 h-full relative z-20 flex">
                <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col justify-center text-left py-12 lg:py-0 pr-0 z-20">
                    <p className="inline-block px-3 py-1 mb-6 text-[10px] sm:text-xs font-bold tracking-widest text-yellow-500 bg-yellow-500/10 uppercase rounded-full w-max border border-yellow-500/20 backdrop-blur-sm shadow-sm">
                        {t('customer.home.hero.badge')}
                    </p>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter leading-[1.05] text-white mb-6">
                        {t('customer.home.hero.titlePart1')} <br />
                        <span className="text-slate-300">{t('customer.home.hero.titlePart2')}</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-lg leading-relaxed font-medium">
                        {t('customer.home.hero.description')}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <button 
                            onClick={onViewCars}
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base flex items-center gap-2"
                        >
                            {t('customer.home.hero.viewCarsBtn')}
                        </button>
                        <button 
                            onClick={onBookService}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:border-white/30 active:scale-95 text-sm sm:text-base"
                        >
                            {t('customer.home.hero.bookServiceBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
