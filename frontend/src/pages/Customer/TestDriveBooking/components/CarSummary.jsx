import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

const CarSummary = ({ car }) => {
    const { t } = useTranslation(['booking']);

    return (
        <div className="w-full md:w-[460px] lg:w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-10 lg:p-14 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 space-y-2 mb-8 mt-4">
                <h2 className="text-3xl font-[900] text-white tracking-tight uppercase leading-none">{car.name}</h2>
                <p className="text-sm font-medium text-slate-400">{car.tagline}</p>
            </div>

            <div className="relative z-10 w-full mb-10 transform hover:scale-105 transition-transform duration-700 ease-out flex justify-center">
                <Image 
                    src={car.heroImage} 
                    alt={car.name}
                    preview={false} 
                    className="w-full h-auto object-cover opacity-90 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
                />
            </div>

            <div className="relative z-10 space-y-8 mb-4">
                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{t('summary_engine', 'ENGINE')}</span>
                        <span className="text-[14px] font-bold text-white">{car.engine}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{t('summary_power', 'POWER')}</span>
                        <span className="text-[14px] font-bold text-white">{car.power}</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                    <span className="text-xs text-slate-500 block mb-1">{t('summary_price', 'Price starting from')}</span>
                    <div className="text-2xl font-black text-yellow-500 tracking-tight">
                        {new Intl.NumberFormat('vi-VN').format(car.price)} VNĐ
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarSummary;
