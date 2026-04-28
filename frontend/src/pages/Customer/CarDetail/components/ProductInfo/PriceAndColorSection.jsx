import { useState } from 'react';
import Car360Viewer from './Car360Viewer';
import { ChevronDown, Box, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';

const PriceAndColorSection = ({ car, colors, selectedColor, setSelectedColor, t }) => {
    const navigate = useNavigate();
    const [previewVisible, setPreviewVisible] = useState(false);
    const img1 = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200";
    const img2 = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200";
    const frames = Array.from({ length: 36 }).map((_, i) => i % 2 === 0 ? img1 : img2);

    return (
        <section id="price-color" className="min-h-[calc(100vh-136px)] flex items-center py-10 lg:py-0 bg-white dark:bg-[#0a0a0b] overflow-hidden">
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(0.8deg); }
                    }
                    .animate-float {
                        animation: float 8s ease-in-out infinite;
                    }
                    .studio-light {
                        background: radial-gradient(circle at center, rgba(234, 179, 8, 0.1) 0%, transparent 80%);
                    }
                    .dark .studio-light {
                        background: radial-gradient(circle at center, rgba(234, 179, 8, 0.15) 0%, transparent 80%);
                    }
                    .stage-line {
                        background: linear-gradient(90deg, transparent, rgba(203, 213, 225, 0.2), transparent);
                    }
                    .dark .stage-line {
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
                    }
                    .sharpen-image {
                        image-rendering: -webkit-optimize-contrast;
                        image-rendering: crisp-edges;
                        transform-origin: center center;
                    }
                `}
            </style>

            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                <div className="flex flex-col-reverse lg:flex-row gap-10 xl:gap-16 items-center">

                    <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6 lg:gap-8">
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                            <h2 className="text-[28px] lg:text-[36px] font-black uppercase text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-3">
                                {t('priceColor', 'GIÁ BÁN & MÀU SẮC')}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed max-w-sm">
                                {t('customizationDesc', 'Cá nhân hóa chiếc xe của bạn với những tùy chọn màu sắc và cấu hình cao cấp nhất.')}
                            </p>
                        </div>

                        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                            <div className="flex gap-4 sm:gap-5 flex-wrap">
                                {colors.map(color => {
                                    const isActive = selectedColor && selectedColor.id === color.id;
                                    return (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color)}
                                            className="relative flex flex-col items-center gap-2 group"
                                        >
                                            <div className={`
                                                relative w-12 h-12 rounded-full flex items-center justify-center p-[2px] transition-all duration-500
                                                ${isActive ? 'bg-yellow-500 shadow-[0_5px_15px_rgba(234,179,8,0.4)] scale-110' : 'bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20'}
                                            `}>
                                                <div
                                                    className="w-full h-full rounded-full border-2 border-white dark:border-[#0a0a0b] shadow-inner"
                                                    style={{
                                                        backgroundColor: color.value,
                                                        backgroundImage: color.name.toLowerCase().includes('trắng') ? 'linear-gradient(135deg, #fff 0%, #f1f5f9 100%)' : ''
                                                    }}
                                                ></div>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-slate-900 dark:text-white translate-y-0 opacity-100' : 'text-slate-400 opacity-0 -translate-y-2'}`}>
                                                {color.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-6 lg:p-8 rounded-[24px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{t('retailPrice', 'GIÁ BÁN LẺ ĐỀ XUẤT')}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                            {(car.price).toLocaleString()}
                                        </span>
                                        <span className="text-[12px] font-black text-yellow-600 dark:text-yellow-500">VNĐ</span>
                                    </div>
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>
                                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                                    <button className="w-full py-4 bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-600 dark:hover:bg-yellow-400 transition-all rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-yellow-500/10 active:scale-95">
                                        {t('estimateBtn', 'DỰ TOÁN CHI PHÍ')}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/test-drive/${car.id || car._id || '1'}`)}
                                        className="w-full py-4 bg-white dark:bg-transparent border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[11px] font-black uppercase tracking-[0.2em] hover:border-slate-900 dark:hover:border-white transition-all rounded-xl active:scale-95"
                                    >
                                        {t('testDriveBtn', 'ĐĂNG KÝ LÁI THỬ')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center relative">
                        <div className="absolute inset-0 studio-light pointer-events-none transition-opacity duration-1000"></div>

                        <div className="absolute bottom-[25%] left-0 right-0 h-[1px] stage-line z-0"></div>

                        <div key={selectedColor?.id} className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000 ease-out">
                            <div className="relative w-full max-w-[1200px] aspect-[21/9] flex items-center justify-center group px-12">

                                {selectedColor?.image ? (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center animate-float">
                                        <div className="absolute bottom-[5%] w-[85%] h-[50px] bg-black/40 dark:bg-black/80 blur-[60px] rounded-[100%] pointer-events-none z-0"></div>
                                        <div className="absolute bottom-[5%] w-[65%] h-[25px] bg-black/60 dark:bg-black/95 blur-[30px] rounded-[100%] pointer-events-none z-0 opacity-70"></div>

                                        <img
                                            src={selectedColor.image}
                                            alt={selectedColor.name}
                                            className="w-full h-full object-contain relative z-10 scale-125 transition-transform duration-1000 sharpen-image filter saturate-[1.05] contrast-[1.15] brightness-[1.05] drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                                        />

                                        <div className="hidden">
                                            <Image
                                                src={selectedColor.image}
                                                preview={{
                                                    visible: previewVisible,
                                                    onVisibleChange: (value) => setPreviewVisible(value),
                                                    src: selectedColor.image,
                                                }}
                                            />
                                        </div>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                                            <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
                                                <Box size={14} className="text-yellow-500" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Studio Render</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : car.threeSixty?.images?.length > 0 ? (
                                    <div className="w-full h-full rounded-[60px] overflow-hidden border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm p-8 shadow-2xl">
                                        <Car360Viewer imageSequence={car.threeSixty.images} t={t} />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center animate-float scale-110">
                                        <div className="absolute bottom-[10%] w-[80%] h-[40px] bg-black/40 blur-[40px] rounded-[100%] z-0"></div>
                                        <Car360Viewer imageSequence={frames} t={t} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute top-10 right-10 flex flex-col gap-4 mt-2">
                            <button
                                onClick={() => setPreviewVisible(true)}
                                className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white/60 hover:text-yellow-500 dark:hover:text-yellow-500 hover:border-yellow-500 transition-all group shadow-xl z-30 active:scale-90"
                            >
                                <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceAndColorSection;
