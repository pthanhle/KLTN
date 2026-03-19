import { Image } from 'antd';

const TicketVisual = ({ carName, carImage, t }) => {
    return (
        <div className="w-full xl:w-[280px] relative group overflow-hidden min-h-[220px] md:min-h-full shrink-0">
            <Image 
                src={carImage}
                alt={carName}
                preview={false}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                rootClassName="w-full h-full absolute inset-0"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-1 block shadow-sm">
                    {t('selected_model', 'Mẫu xe đã chọn')}
                </span>
                <h2 className="text-xl xl:text-2xl font-black text-white leading-tight drop-shadow-md">{carName}</h2>
            </div>
            
            <div className="absolute top-4 left-4 bg-white/20 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 dark:border-white/10 shadow-sm transition-colors duration-300">
                <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none drop-shadow-sm">
                    {t('premium_series', 'Premium Series')}
                </span>
            </div>
        </div>
    );
};

export default TicketVisual;
