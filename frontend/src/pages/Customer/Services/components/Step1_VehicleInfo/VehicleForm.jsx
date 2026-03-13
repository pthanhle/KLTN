import React from 'react';
import { Form, Select, Input } from 'antd';

const VehicleForm = ({ bookingData, updateBookingData, vehicleBrands, t }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:car_brand')}</label>
                <Select
                    value={bookingData.vehicle_brand}
                    onChange={(val) => updateBookingData({ vehicle_brand: val })}
                    placeholder={t('services:select_brand')}
                    size="large"
                    showSearch
                    optionFilterProp="label"
                    className="w-full text-[15px] font-medium"
                    rootClassName="vehicle-select"
                    options={vehicleBrands}
                />
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:model')}</label>
                <Input
                    size="large"
                    placeholder={t('services:model_placeholder')}
                    value={bookingData.vehicle_model}
                    onChange={(e) => updateBookingData({ vehicle_model: e.target.value })}
                    className="w-full text-[15px] font-medium"
                />
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{t('services:license_plate')}</label>
                <Input
                    size="large"
                    placeholder={t('services:license_plate_placeholder')}
                    value={bookingData.license_plate}
                    onChange={(e) => updateBookingData({ license_plate: e.target.value.toUpperCase() })}
                    className="w-full text-[15px] font-bold tracking-[0.2em] uppercase"
                />
            </div>
        </div>
    );
};

export default VehicleForm;
