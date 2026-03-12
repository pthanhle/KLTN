import { useTranslation } from 'react-i18next';

const TradeInPromote = ({ onTradeIn }) => {
    const { t } = useTranslation('layout');
    return (
        <section className="py-20 lg:py-32 bg-white dark:bg-[#0a0a0b] transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-10">
                
                <div className="relative w-full rounded-[40px] overflow-hidden bg-slate-900 dark:bg-black shadow-2xl flex flex-col md:flex-row min-h-[500px]">
                    
                    {/* Dark gradient overlay for extreme contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent dark:from-black dark:via-black/80 z-10 pointer-events-none md:w-3/4"></div>
                    
                    {/* Left text content */}
                    <div className="relative z-20 w-full md:w-1/2 p-10 sm:p-16 lg:p-20 flex flex-col justify-center text-left">
                        <p className="inline-block mb-4 text-[10px] font-black tracking-[0.2em] text-yellow-500 uppercase">
                            {t('customer.home.tradeIn.badge')}
                        </p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                            {t('customer.home.tradeIn.title1')} <br/>
                            {t('customer.home.tradeIn.title2')} <br/> {t('customer.home.tradeIn.title3')}
                        </h2>
                        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-sm font-medium leading-relaxed">
                            {t('customer.home.tradeIn.description')}
                        </p>
                        
                        <div>
                            <button 
                                onClick={onTradeIn}
                                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 text-sm sm:text-base shadow-xl hover:shadow-white/20 whitespace-nowrap"
                            >
                                {t('customer.home.tradeIn.appraiseBtn')}
                            </button>
                        </div>
                    </div>

                    {/* Right Background Image Box */}
                    <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/4 h-full z-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
                        <img 
                            src="https://images.unsplash.com/photo-1590362891991-f761ef1c2f9d?q=80&w=1600&auto=format&fit=crop" 
                            alt="Luxury Steering Wheel" 
                            className="w-full h-full object-cover object-right-top"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TradeInPromote;
