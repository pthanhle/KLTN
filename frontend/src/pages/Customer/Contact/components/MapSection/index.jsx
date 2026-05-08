import { Skeleton } from 'antd';
import { MapPin } from 'lucide-react';

const LocationMap = ({ contactData, isLoading, t }) => {
    // Extract address or use a fallback if undefined
    const addressString = contactData?.address?.content || "01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Hồ Chí Minh";
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressString)}&t=m&z=16&output=embed&iwloc=near`;

    return (
        <section className="w-full h-[350px] md:h-[600px] relative mt-20 animate-in fade-in duration-1000 delay-700 bg-slate-100 dark:bg-[#0a0a0b]">
            {isLoading ? (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center">
                    <Skeleton.Image className="!w-32 !h-32 opacity-20" />
                </div>
            ) : (
                <iframe
                    title="Google Map Location"
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'contrast(1.05) saturate(1.1) brightness(0.95)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[10%] dark:invert-[90%] dark:hue-rotate-180 dark:contrast-100 transition-all duration-700 pointer-events-auto"
                ></iframe>
            )}
            <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none mix-blend-overlay"></div>

            {/* Floating Map Card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-auto md:right-8 md:translate-x-0 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-yellow-500/20 flex items-center gap-4 min-w-[280px] w-[90%] md:w-fit md:max-w-[380px] shadow-xl hover:scale-[1.02] transition-transform duration-500 cursor-default pointer-events-auto z-10 h-fit">
                {isLoading ? (
                    <Skeleton.Avatar active size={44} shape="circle" />
                ) : (
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 shadow-md shadow-yellow-500/20">
                        <MapPin className="text-slate-900 w-5 h-5 md:w-5 md:h-5 animate-bounce" strokeWidth={2} />
                    </div>
                )}
                <div className="flex-1">
                    {isLoading ? (
                        <Skeleton active paragraph={{ rows: 2, width: ['100%', '80%'] }} title={{ width: '60%' }} />
                    ) : (
                        <>
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-sm md:text-base mb-1">
                                {t('map_showroom')}
                            </h4>
                            <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider leading-relaxed">
                                {addressString}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LocationMap;
