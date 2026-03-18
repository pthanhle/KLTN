import { Input, Select } from 'antd';
import { MapPin } from 'lucide-react';
import { Controller } from 'react-hook-form';

const DeliveryForm = ({ hookState }) => {
    const { methods, mockCities, currentDistricts, t } = hookState;
    return (
        <section className="bg-white dark:bg-[#141416] p-8 rounded-3xl shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-yellow-500" size={24} strokeWidth={2.5} />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">{t('checkout_delivery_title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller 
                    name="fullName"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_fullname')}</label>
                            <Input 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="Nguyễn Văn A" 
                                className="!h-12 !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-slate-900 dark:!text-white font-medium"
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller 
                    name="phone"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_phone')}</label>
                            <Input 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="090 123 4567" 
                                className="!h-12 !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-slate-900 dark:!text-white font-medium"
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller 
                    name="email"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_email')}</label>
                            <Input 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="example@ttauto.com" 
                                className="!h-12 !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-slate-900 dark:!text-white font-medium"
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller 
                    name="city"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_city')}</label>
                            <Select 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="Chọn Tỉnh/Thành phố"
                                className="w-full h-12 [&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-arrow]:text-slate-400 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:font-medium"
                                options={mockCities}
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller 
                    name="district"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_district')}</label>
                            <Select 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="Chọn Quận/Huyện"
                                className="w-full h-12 [&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-arrow]:text-slate-400 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:text-slate-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:font-medium"
                                options={currentDistricts}
                                disabled={!methods.watch('city')}
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />

                <Controller 
                    name="address"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{t('checkout_address')}</label>
                            <Input 
                                {...field}
                                status={fieldState.error ? 'error' : ''}
                                placeholder="123 Đường ABC, Phường XYZ" 
                                className="!h-12 !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-slate-900 dark:!text-white font-medium"
                            />
                            {fieldState.error && <p className="text-rose-500 text-xs mt-1 animate-in fade-in">{fieldState.error.message}</p>}
                        </div>
                    )}
                />
            </div>
        </section>
    );
};

export default DeliveryForm;
