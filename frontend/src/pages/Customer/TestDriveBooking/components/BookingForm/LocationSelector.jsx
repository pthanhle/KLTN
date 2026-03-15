import { Select, Input } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const LocationSelector = ({ branches, t }) => {
    const { control, formState: { errors } } = useFormContext();
    const bookingType = useWatch({ control, name: 'bookingType' });

    if (bookingType === 'showroom') {
        return (
            <div className="space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
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
                            dropdownStyle={{ padding: 8, borderRadius: 16 }}
                        />
                    )}
                />
                {errors.showroomBranch && <span className="text-[13px] font-medium text-red-500 block">{errors.showroomBranch.message}</span>}
            </div>
        );
    }

    return (
        <div className="space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                {t('booking_deliveryAddress', 'Địa chỉ nhận xe')}
            </label>
            <Controller
                name="deliveryAddress"
                control={control}
                render={({ field }) => (
                    <Input 
                        {...field}
                        placeholder="Nhập địa chỉ của bạn để chúng tôi giao xe tới..."
                        className={`!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400 ${errors.deliveryAddress ? '!border-red-500 focus:!border-red-500' : ''}`}
                    />
                )}
            />
            {errors.deliveryAddress && <span className="text-[13px] font-medium text-red-500 block">{errors.deliveryAddress.message}</span>}
        </div>
    );
};

export default LocationSelector;
