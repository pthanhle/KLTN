import { Select, Input } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const LocationSelector = ({ branches, t, locationData }) => {
    const { control, setValue, formState: { errors } } = useFormContext();
    const bookingType = useWatch({ control, name: 'bookingType' });
    const selectedCity = useWatch({ control, name: 'city' });
    const selectedDistrict = useWatch({ control, name: 'district' });

    const {
        provinces = [], districts = [], wards = [],
        loadingDistricts = false, loadingWards = false
    } = locationData || {};

    const handleCityChange = (val, field) => {
        field.onChange(val);
        setValue('district', undefined, { shouldValidate: true });
        setValue('ward', undefined, { shouldValidate: true });
    };

    const handleDistrictChange = (val, field) => {
        field.onChange(val);
        setValue('ward', undefined, { shouldValidate: true });
    };

    if (bookingType === 'showroom') {
        return (
            <div key="showroom-selector" className="space-y-2.5 max-w-md animate-in fade-in zoom-in-95 duration-200">
                <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    {t('booking_branch', 'Chọn chi nhánh')}
                </label>
                <Controller
                    name="showroomBranch"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={branches.map(b => ({ label: b.name, value: b.id }))}
                            className={`!h-[52px] !w-full [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[50px] [&_.ant-select-selection-item]:!text-[15px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-arrow]:!text-slate-400 ${errors.showroomBranch ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                        />
                    )}
                />
                {errors.showroomBranch && <span className="text-[13px] font-medium text-red-500 block">{errors.showroomBranch.message}</span>}
            </div>
        );
    }

    return (
        <div key="home-selector" className="space-y-4 animate-in fade-in zoom-in-95 duration-200 bg-slate-50/50 dark:bg-white/[0.02] p-6 rounded-[24px] border border-slate-100 dark:border-white/5">
            <h3 className="text-[14px] font-bold text-slate-900 dark:text-white mb-2">{t('booking_deliveryAddress', 'Địa chỉ nhận xe tiêu chuẩn')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City Sector */}
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{t('booking_city', 'Tỉnh/Thành phố')}</label>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(val) => handleCityChange(val, field)}
                                placeholder={t('booking_city_placeholder', 'Chọn Thành phố')}
                                options={provinces.map(p => ({ label: p.name, value: p.name }))}
                                showSearch
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                className={`!h-[48px] !w-full [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white ${errors.city ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.city && <span className="text-xs font-medium text-red-500">{errors.city.message}</span>}
                </div>

                {/* District Sector */}
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{t('booking_district', 'Quận/Huyện')}</label>
                    <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                onChange={(val) => handleDistrictChange(val, field)}
                                placeholder={t('booking_district_placeholder', 'Chọn Quận/Huyện')}
                                options={districts.map(d => ({ label: d.name, value: d.name }))}
                                disabled={!selectedCity}
                                loading={loadingDistricts}
                                showSearch
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                className={`!h-[48px] !w-full [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white ${errors.district ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.district && <span className="text-xs font-medium text-red-500">{errors.district.message}</span>}
                </div>

                {/* Ward Sector */}
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{t('booking_ward', 'Phường/Xã')}</label>
                    <Controller
                        name="ward"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder={t('booking_ward_placeholder', 'Chọn Phường/Xã')}
                                options={wards.map(w => ({ label: w.name, value: w.name }))}
                                disabled={!selectedDistrict}
                                loading={loadingWards}
                                showSearch
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                className={`!h-[48px] !w-full [&_.ant-select-selector]:!h-[48px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-white dark:[&_.ant-select-selector]:!bg-[#141416] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500/50 [&_.ant-select-selection-item]:!leading-[46px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white ${errors.ward ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.ward && <span className="text-xs font-medium text-red-500">{errors.ward.message}</span>}
                </div>

                {/* Detail Address Sector */}
                <div className="space-y-2">
                    <label className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{t('booking_addressDetail', 'Địa chỉ cụ thể')}</label>
                    <Controller
                        name="addressDetail"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                value={field.value || ''}
                                autoComplete="new-password"
                                placeholder={t('booking_addressDetail_placeholder', 'Số nhà, Tên đường...')}
                                className={`!h-[48px] !px-4 !rounded-xl !bg-white dark:!bg-[#141416] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[14px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400 ${errors.addressDetail ? '!border-red-500 focus:!border-red-500' : ''}`}
                            />
                        )}
                    />
                    {errors.addressDetail && <span className="text-xs font-medium text-red-500">{errors.addressDetail.message}</span>}
                </div>
            </div>
        </div>
    );
};

export default LocationSelector;
