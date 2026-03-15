import Car360Viewer from './Car360Viewer';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceAndColorSection = ({ car, colors, selectedColor, setSelectedColor, t }) => {
    const navigate = useNavigate();
    const img1 = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200";
    const img2 = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200";
    const frames = Array.from({ length: 36 }).map((_, i) => i % 2 === 0 ? img1 : img2);

    return (
        <section id="price-color" className="pt-24 lg:pt-32 pb-24 bg-white dark:bg-[#0a0a0b]">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                <div className="flex flex-col-reverse lg:flex-row gap-16 xl:gap-24 items-center">

                    <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-8">
                        <div>
                            <h2 className="text-[24px] lg:text-[28px] font-black uppercase text-slate-900 dark:text-white mb-2">{t('products:detail.priceColor')}</h2>
                            <div className="relative mt-8 group cursor-pointer">
                                <button className="w-full flex items-center justify-between bg-white dark:bg-[#0a0a0b] border-b-2 border-slate-200 dark:border-white/10 pb-4 text-[16px] font-bold text-slate-900 dark:text-white group-hover:border-slate-800 dark:group-hover:border-white/60 transition-colors">
                                    {car.versions[0]}
                                    <ChevronDown size={20} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-4 sm:gap-6 flex-wrap mt-2">
                                {colors.map(color => {
                                    const isActive = selectedColor.id === color.id;
                                    return (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color)}
                                            className="flex flex-col items-center gap-2 group transition-all"
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${isActive ? 'border-yellow-500 scale-110 shadow-[0_5px_15px_rgba(234,179,8,0.2)]' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:scale-105'}`}>
                                                <div
                                                    className="w-9 h-9 rounded-full shadow-inner border border-black/5 dark:border-white/10"
                                                    style={{ backgroundColor: color.value, backgroundImage: color.id === 'white' ? 'linear-gradient(135deg, #fff 0%, #f1f5f9 100%)' : '' }}
                                                ></div>
                                            </div>
                                            <span className={`text-[12px] font-bold whitespace-nowrap transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 opacity-60 group-hover:opacity-100'}`}>
                                                {color.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">{t('products:detail.retailPrice')}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    {(car.price).toLocaleString()}
                                </span>
                                <span className="text-[14px] font-bold text-slate-400">VNĐ</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button className="flex-1 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[13px] font-bold uppercase tracking-widest hover:bg-yellow-600 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-slate-900 transition-all rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
                                {t('products:detail.estimateBtn')}
                            </button>
                            <button
                                onClick={() => navigate(`/test-drive/${car.id || car._id || '1'}`)}
                                className="flex-1 px-8 py-4 bg-slate-50 dark:bg-[#141416] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[13px] font-bold uppercase tracking-widest hover:border-slate-900 dark:hover:border-white transition-all rounded-[16px]"
                            >
                                {t('products:detail.testDriveBtn')}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 w-full flex items-center justify-center p-4 lg:p-12 relative">
                        <div className="w-full h-full transition-all duration-700 ease-in-out" style={{ filter: selectedColor.filterStyle }}>
                            <Car360Viewer imageSequence={frames} t={t} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceAndColorSection;
