import React from 'react';
import { Input, Select } from 'antd';
import { User, Mail, Phone, Briefcase, Building2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { ROLE_OPTIONS } from '../../../constants/createStaffConstants';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';

const FieldWrapper = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5 mb-5">
        <label className="font-semibold text-sm text-slate-700 dark:text-slate-200">
            {label}
        </label>
        {children}
        {error && <span className="text-red-500 text-xs mt-0.5">{error.message}</span>}
    </div>
);

export const StaffFormFields = ({ t, control, errors }) => {
    const { data: deptData } = useQuery({
        queryKey: ['admin-staff-departments'],
        queryFn: () => AdminStaffAPI.getDepartments(),
        staleTime: 5 * 60 * 1000,
    });

    const departmentOptions = (deptData?.departments || []).map(d => ({ value: d, label: d }));

    return (
        <div className="flex flex-col mt-6">
            <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                    <FieldWrapper label={t('adminStaffCreate:label_fullname', 'Họ và tên')} error={errors.fullName}>
                        <Input
                            {...field}
                            prefix={<User size={16} className="text-slate-400 mr-1" />}
                            placeholder={t('adminStaffCreate:placeholder_fullname', 'VD: Nguyễn Văn A')}
                            className={`h-11 rounded-lg dark:bg-[#141416] dark:text-white ${errors.fullName ? 'border-red-500' : 'dark:border-white/10'}`}
                            status={errors.fullName ? 'error' : ''}
                        />
                    </FieldWrapper>
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <FieldWrapper label={t('adminStaffCreate:label_email', 'Địa chỉ Email')} error={errors.email}>
                        <Input
                            {...field}
                            prefix={<Mail size={16} className="text-slate-400 mr-1" />}
                            placeholder={t('adminStaffCreate:placeholder_email', 'VD: nguyen.van.a@dealership.com')}
                            className={`h-11 rounded-lg dark:bg-[#141416] dark:text-white ${errors.email ? 'border-red-500' : 'dark:border-white/10'}`}
                            status={errors.email ? 'error' : ''}
                        />
                    </FieldWrapper>
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <FieldWrapper label={t('adminStaffCreate:label_phone', 'Số điện thoại')} error={errors.phone}>
                        <Input
                            {...field}
                            prefix={<Phone size={16} className="text-slate-400 mr-1" />}
                            placeholder={t('adminStaffCreate:placeholder_phone', 'VD: 0901234567')}
                            className={`h-11 rounded-lg dark:bg-[#141416] dark:text-white ${errors.phone ? 'border-red-500' : 'dark:border-white/10'}`}
                            status={errors.phone ? 'error' : ''}
                        />
                    </FieldWrapper>
                )}
            />

            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <FieldWrapper label={t('adminStaffCreate:label_role', 'Vai trò (Chức vụ)')} error={errors.role}>
                        <Select
                            {...field}
                            placeholder={t('adminStaffCreate:placeholder_role', 'Chọn vai trò...')}
                            className={`h-11 [&>.ant-select-selector]:!rounded-lg dark:[&>.ant-select-selector]:!bg-[#141416] dark:[&_.ant-select-selection-item]:!text-white ${errors.role ? '[&>.ant-select-selector]:!border-red-500' : 'dark:[&>.ant-select-selector]:!border-white/10'}`}
                            options={ROLE_OPTIONS}
                            suffixIcon={<Briefcase size={16} className="text-slate-400" />}
                            status={errors.role ? 'error' : ''}
                        />
                    </FieldWrapper>
                )}
            />

            <Controller
                name="department"
                control={control}
                render={({ field }) => (
                    <FieldWrapper label={t('adminStaffCreate:label_department', 'Phòng ban')} error={errors.department}>
                        <Select
                            {...field}
                            placeholder={t('adminStaffCreate:placeholder_department', 'Chọn hoặc nhập phòng ban...')}
                            className="h-11 [&>.ant-select-selector]:!rounded-lg dark:[&>.ant-select-selector]:!bg-[#141416] dark:[&_.ant-select-selection-item]:!text-white dark:[&>.ant-select-selector]:!border-white/10"
                            options={departmentOptions}
                            suffixIcon={<Building2 size={16} className="text-slate-400" />}
                            mode="combobox"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                                option?.label?.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </FieldWrapper>
                )}
            />
        </div>
    );
};
