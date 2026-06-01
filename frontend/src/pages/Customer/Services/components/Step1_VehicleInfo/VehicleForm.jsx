import React from 'react';
import { Form, Select, Input } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';

const VehicleForm = ({ bookingData, vehicleBrands, t }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:car_brand')}</label>
                <Controller
                    name="vehicle_brand"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            placeholder={t('services:select_brand')}
                            size="large"
                            showSearch
                            optionFilterProp="label"
                            className={`w-full text-[15px] font-medium ${errors.vehicle_brand ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                            rootClassName="vehicle-select"
                            options={vehicleBrands}
                        />
                    )}
                />
                {errors.vehicle_brand && <span className="text-xs font-medium text-red-500 mt-1">{errors.vehicle_brand.message}</span>}
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:model')}</label>
                <Controller
                    name="vehicle_model"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            size="large"
                            placeholder={t('services:model_placeholder')}
                            className={`w-full text-[15px] font-medium ${errors.vehicle_model ? '!border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.vehicle_model && <span className="text-xs font-medium text-red-500 mt-1">{errors.vehicle_model.message}</span>}
            </div>

            <div className="flex flex-col gap-3 lg:col-span-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:license_plate', 'Biển số xe')}</label>
                <Controller
                    name="license_plate"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            size="large"
                            placeholder={t('services:license_plate_placeholder', 'VD: 30A-123.45')}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            className={`w-full text-[15px] font-bold tracking-[0.2em] uppercase ${errors.license_plate ? '!border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.license_plate && <span className="text-xs font-medium text-red-500 mt-1">{errors.license_plate.message}</span>}
            </div>

            <div className="flex flex-col gap-3 lg:col-span-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:input_contact_phone', 'Số điện thoại liên hệ')}</label>
                <Controller
                    name="contact_phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            size="large"
                            placeholder={t('services:contact_phone_placeholder', 'Để trống sẽ dùng SĐT mặc định')}
                            className={`w-full text-[15px] font-medium ${errors.contact_phone ? '!border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.contact_phone && <span className="text-xs font-medium text-red-500 mt-1">{errors.contact_phone.message}</span>}
            </div>
        </div>
    );
};

export default VehicleForm;
