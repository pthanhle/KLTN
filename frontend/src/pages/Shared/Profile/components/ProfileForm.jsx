import { Input, Button, Form, Select } from 'antd';
import { FormProvider, Controller } from 'react-hook-form';

const ProfileForm = ({ profile, isEditing, methods, provinces, districts, wards, handleSave, handleEditToggle, t }) => {
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSave}
                className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1.5">{t('form_title', 'Thông Tin Cá Nhân')}</h2>
                        <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">{t('form_subtitle', 'Cập nhật chi tiết hồ sơ của bạn tại đây')}</p>
                    </div>
                    {isEditing ? (
                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                onClick={handleEditToggle}
                                className="!h-11 !px-5 !rounded-xl !border-slate-200 dark:!border-white/10 !bg-transparent !text-slate-600 dark:!text-slate-300 hover:!bg-slate-50 dark:hover:!bg-white/5 !font-bold transition-all shadow-none"
                            >
                                {t('buttons_cancel', 'Hủy')}
                            </Button>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="!h-11 !px-6 !rounded-xl !bg-yellow-500 hover:!bg-yellow-400 !border-yellow-500 !text-slate-900 !font-black !shadow-[0_8px_20px_rgba(234,179,8,0.25)] transition-all"
                            >
                                {t('buttons_save', 'Lưu thay đổi')}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleEditToggle}
                            className="!h-11 !px-6 !rounded-xl !bg-yellow-500 hover:!bg-yellow-400 !border-yellow-500 !text-slate-900 !font-black !shadow-[0_8px_20px_rgba(234,179,8,0.25)] transition-all"
                        >
                            {t('buttons_edit', 'Chỉnh sửa')}
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex flex-col gap-2.5">
                        <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_fullName', 'Họ và Tên')}</label>
                        <Controller
                            name="full_name"
                            control={methods.control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Input
                                        {...field}
                                        disabled={!isEditing}
                                        className={`!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default transition-all placeholder:text-slate-400 ${error ? '!border-red-500 focus:!border-red-500' : ''}`}
                                    />
                                    {error && <span className="text-[13px] font-medium text-red-500" style={{ marginTop: '4px' }}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_phone', 'Số điện thoại')}</label>
                        <Controller
                            name="phone"
                            control={methods.control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9+]/g, '');
                                            field.onChange(val);
                                        }}
                                        disabled={!isEditing}
                                        className={`!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default transition-all placeholder:text-slate-400 ${error ? '!border-red-500 focus:!border-red-500' : ''}`}
                                    />
                                    {error && <span className="text-[13px] font-medium text-red-500" style={{ marginTop: '4px' }}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_city', 'Tỉnh/Thành phố')}</label>
                            {isEditing ? (
                                <Controller
                                    name="city"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={provinces?.map(p => ({ label: p.name, value: p.name }))}
                                            showSearch
                                            placeholder={t('placeholder_city', 'Chọn Tỉnh/Thành phố')}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            className="w-full !h-[52px] text-[15px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!min-h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 [&_.ant-select-selection-item]:!leading-[52px] [&_.ant-select-selection-placeholder]:!leading-[52px] [&_.ant-select-selector]:!items-center"
                                        />
                                    )}
                                />
                            ) : (
                                <Input disabled value={profile?.addresses?.[0]?.city || ''} className="!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default" />
                            )}
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_district', 'Quận/Huyện')}</label>
                            {isEditing ? (
                                <Controller
                                    name="district"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={districts?.map(d => ({ label: d.name, value: d.name }))}
                                            showSearch
                                            disabled={!methods.watch('city')}
                                            placeholder={t('placeholder_district', 'Chọn Quận/Huyện')}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            className="w-full !h-[52px] text-[15px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!min-h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 [&_.ant-select-selection-item]:!leading-[52px] [&_.ant-select-selection-placeholder]:!leading-[52px] [&_.ant-select-selector]:!items-center"
                                        />
                                    )}
                                />
                            ) : (
                                <Input disabled value={profile?.addresses?.[0]?.district || ''} className="!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default" />
                            )}
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_ward', 'Phường/Xã')}</label>
                            {isEditing ? (
                                <Controller
                                    name="ward"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={wards?.map(w => ({ label: w.name, value: w.name }))}
                                            showSearch
                                            disabled={!methods.watch('district')}
                                            placeholder={t('placeholder_ward', 'Chọn Phường/Xã')}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            className="w-full !h-[52px] text-[15px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!min-h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 hover:[&_.ant-select-selector]:!border-yellow-500 [&_.ant-select-selection-item]:!leading-[52px] [&_.ant-select-selection-placeholder]:!leading-[52px] [&_.ant-select-selector]:!items-center"
                                        />
                                    )}
                                />
                            ) : (
                                <Input disabled value={profile?.addresses?.[0]?.ward || ''} className="!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default" />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5 md:col-span-2">
                        <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{t('form_street', 'Số nhà, Tên đường')}</label>
                        <Controller
                            name="street"
                            control={methods.control}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Input
                                        {...field}
                                        disabled={!isEditing}
                                        placeholder={t('placeholder_street', 'Nhập chi tiết số nhà, ngõ, tên đường...')}
                                        className={`!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white disabled:!bg-slate-100 disabled:dark:!bg-white/5 disabled:!text-slate-500 disabled:!cursor-default transition-all placeholder:text-slate-400 ${error ? '!border-red-500 focus:!border-red-500' : ''}`}
                                    />
                                    {error && <span className="text-[13px] font-medium text-red-500" style={{ marginTop: '4px' }}>{error.message}</span>}
                                </>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-[13px] font-bold text-slate-400 dark:text-slate-500">{t('form_email', 'Email')}</label>
                        <Input
                            value={profile?.email}
                            disabled
                            className="!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-transparent !text-[14px] !font-medium !text-slate-500 dark:!text-slate-400 transition-all !cursor-default"
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-[13px] font-bold text-slate-400 dark:text-slate-500">{t('form_username', 'Tên đăng nhập')}</label>
                        <Input
                            value={profile?.username}
                            disabled
                            className="!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-transparent !text-[14px] !font-medium !text-slate-500 dark:!text-slate-400 transition-all !cursor-default"
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default ProfileForm;
