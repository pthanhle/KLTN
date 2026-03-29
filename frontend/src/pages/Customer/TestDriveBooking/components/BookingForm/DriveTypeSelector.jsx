import { Building2, MapPin } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
const DriveTypeSelector = ({ t, isDemoAvailable = true }) => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
                {t('booking_typeTitle', 'Hình thức lái thử')}
            </label>
            <Controller
                name="bookingType"
                control={control}
                render={({ field }) => (
                    <div className="grid grid-cols-2 gap-4">
                        <label 
                            className={`relative flex items-center justify-center p-4 rounded-2xl border-2 transition-all ${!isDemoAvailable ? 'opacity-40 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5' : 'cursor-pointer'} ${
                                field.value === 'showroom' 
                                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 shadow-[0_4px_14px_rgba(234,179,8,0.15)]' 
                                    : (!isDemoAvailable ? '' : 'border-slate-100 dark:border-white/5 bg-transparent text-slate-500 hover:border-slate-300 dark:hover:border-white/20')
                            }`}
                        >
                            <input disabled={!isDemoAvailable} type="radio" value="showroom" className="sr-only" checked={field.value === 'showroom'} onChange={() => field.onChange('showroom')} />
                            <div className="flex items-center gap-2 font-bold text-[14px]">
                                <Building2 size={18} />
                                <span>{t('booking_typeShowroom', 'Tại Showroom')}</span>
                            </div>
                        </label>
                        <label 
                            className={`relative flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                field.value === 'home' 
                                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 shadow-[0_4px_14px_rgba(234,179,8,0.15)]' 
                                    : 'border-slate-100 dark:border-white/5 bg-transparent text-slate-500 hover:border-slate-300 dark:hover:border-white/20'
                            }`}
                        >
                            <input type="radio" value="home" className="sr-only" checked={field.value === 'home'} onChange={() => field.onChange('home')} />
                            <div className="flex items-center gap-2 font-bold text-[14px]">
                                <MapPin size={18} />
                                <span>{t('booking_typeHome', 'Phục vụ tận nhà')}</span>
                            </div>
                        </label>
                    </div>
                )}
            />
        </div>
    );
};

export default DriveTypeSelector;
