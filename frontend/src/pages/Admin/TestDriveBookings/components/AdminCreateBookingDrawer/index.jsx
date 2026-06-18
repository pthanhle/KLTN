import React, { useMemo } from 'react';
import { Drawer, Input, AutoComplete, Select, DatePicker, Tag } from 'antd';
import { FormProvider, Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { User, PhoneCall, AlignLeft, Search, Flag } from 'lucide-react';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import { useAdminCreateBookingLogic } from '../../hooks/useAdminCreateBookingLogic';
import DriveTypeSelector from '../../../../Customer/TestDriveBooking/components/BookingForm/DriveTypeSelector';
import LocationSelector from '../../../../Customer/TestDriveBooking/components/BookingForm/LocationSelector';

const INPUT_CLS = '!h-[52px] !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white transition-all placeholder:!text-slate-400';
const SELECT_CLS = 'w-full !h-[52px] [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selection-item]:!leading-[50px] [&_.ant-select-selection-item]:!text-[14px] [&_.ant-select-selection-item]:!font-medium [&_.ant-select-selection-item]:!text-slate-900 dark:[&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-placeholder]:!leading-[50px] [&_.ant-select-selection-placeholder]:!text-slate-400';

const SectionLabel = ({ children }) => (
    <p className="text-[11px] font-black tracking-widest uppercase text-yellow-500/80 dark:text-yellow-500/60 mb-4 mt-8 first:mt-0 border-b border-slate-100 dark:border-white/5 pb-2">
        {children}
    </p>
);

const FieldLabel = ({ icon: Icon, children, optional }) => (
    <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-2.5">
        {Icon && <Icon size={15} className="text-yellow-500 shrink-0" />}
        {children}
        {optional && <span className="text-[11px] font-normal text-slate-400 ml-1">(tuỳ chọn)</span>}
    </label>
);

const ErrorMsg = ({ msg }) =>
    msg ? <span className="text-[12px] font-medium text-red-500 mt-1.5 block">{msg}</span> : null;

const disabledDate = (current) => current && current.valueOf() < Date.now() - 86400000;

const FormBody = ({
    customerResults, customerSearching, handleCustomerSearch, handleCustomerSelect,
    carResults, carSearching, carInputValue, handleCarSearch, handleCarSelect,
    staffOptions, timeSlots, branches, locationData, t,
}) => {
    const customerOptions = useMemo(() =>
        customerResults.map((c) => ({
            value: String(c._id),
            label: (
                <div className="flex items-center gap-3 py-0.5">
                    {c.avatar
                        ? <img src={c.avatar} alt={c.full_name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        : <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                            {c.full_name?.[0]?.toUpperCase() || '?'}
                          </div>}
                    <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 dark:text-white truncate">{c.full_name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.phone || c.email}</p>
                    </div>
                </div>
            ),
            customer: c,
        })),
    [customerResults]);

    const carOptions = useMemo(() =>
        carResults.map((c) => ({
            value: String(c._id),
            label: (
                <div className="flex items-center gap-3 py-0.5">
                    {c.image
                        ? <img src={c.image} alt={c.name} className="w-10 h-7 object-cover rounded-md shrink-0" />
                        : <div className="w-10 h-7 rounded-md bg-slate-200 dark:bg-slate-700 shrink-0" />}
                    <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 dark:text-white truncate">{c.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.sku} · {c.brandName}</p>
                    </div>
                </div>
            ),
            car: c,
        })),
    [carResults]);
    const { control, formState: { errors }, setValue } = useFormContext();
    const { i18n } = useTranslation();
    const currentLocale = i18n.language === 'vi' ? viVN.DatePicker : enUS.DatePicker;

    return (
        <div>
            {/* ─── Customer ─── */}
            <SectionLabel>Thông tin khách hàng</SectionLabel>

            <div className="mb-5">
                <FieldLabel icon={Search}>Tìm khách trong hệ thống</FieldLabel>
                <AutoComplete
                    options={customerOptions}
                    onSearch={handleCustomerSearch}
                    onSelect={handleCustomerSelect}
                    filterOption={false}
                    notFoundContent={
                        customerSearching
                            ? <span className="text-slate-400 text-[13px] px-2">Đang tìm...</span>
                            : null
                    }
                    popupMatchSelectWidth={true}
                    className={`w-full [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selection-search-input]:!h-[50px] [&_.ant-select-selection-search-input]:!leading-[50px] [&_.ant-select-selection-placeholder]:!leading-[50px]`}
                    placeholder="Tìm theo tên hoặc số điện thoại..."
                    allowClear
                />
                <p className="text-[12px] text-slate-400 mt-1.5">Chọn khách có sẵn để điền tự động, hoặc nhập trực tiếp bên dưới.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel icon={User}>Họ và tên *</FieldLabel>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Nguyễn Văn A"
                                className={`${INPUT_CLS} ${errors.fullName ? '!border-red-500' : ''}`} />
                        )}
                    />
                    <ErrorMsg msg={errors.fullName?.message} />
                </div>
                <div>
                    <FieldLabel icon={PhoneCall}>Số điện thoại *</FieldLabel>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                onChange={(e) => onChange(e.target.value.replace(/[^0-9+]/g, ''))}
                                placeholder="0xxx xxx xxx"
                                maxLength={11}
                                className={`${INPUT_CLS} ${errors.phoneNumber ? '!border-red-500' : ''}`}
                            />
                        )}
                    />
                    <ErrorMsg msg={errors.phoneNumber?.message} />
                </div>
            </div>

            {/* ─── Car ─── */}
            <SectionLabel>Xe lái thử</SectionLabel>
            <div>
                <FieldLabel icon={Search}>Chọn xe *</FieldLabel>
                <Controller
                    name="carId"
                    control={control}
                    render={({ field }) => (
                        <AutoComplete
                            value={carInputValue}
                            options={carOptions}
                            onSearch={handleCarSearch}
                            onSelect={(val, opt) => {
                                field.onChange(val);
                                handleCarSelect(val, opt);
                            }}
                            onChange={(val) => {
                                if (!val) {
                                    field.onChange('');
                                    handleCarSearch('');
                                }
                            }}
                            filterOption={false}
                            notFoundContent={
                                carSearching
                                    ? <span className="text-slate-400 text-[13px] px-2">Đang tìm...</span>
                                    : carInputValue.length > 0
                                        ? <span className="text-slate-400 text-[13px] px-2">Không tìm thấy xe</span>
                                        : null
                            }
                            popupMatchSelectWidth={true}
                            className={`w-full [&_.ant-select-selector]:!h-[52px] [&_.ant-select-selector]:!rounded-2xl [&_.ant-select-selector]:!bg-slate-50 dark:[&_.ant-select-selector]:!bg-[#0a0a0b] [&_.ant-select-selector]:!border-slate-200 dark:[&_.ant-select-selector]:!border-white/10 [&_.ant-select-selection-search-input]:!h-[50px] [&_.ant-select-selection-search-input]:!leading-[50px] [&_.ant-select-selection-placeholder]:!leading-[50px] ${errors.carId ? '[&_.ant-select-selector]:!border-red-500' : ''}`}
                            placeholder="Tìm theo tên xe hoặc SKU..."
                            allowClear
                        />
                    )}
                />
                <ErrorMsg msg={errors.carId?.message} />
            </div>

            {/* ─── Type & Location ─── */}
            <SectionLabel>Hình thức & Địa điểm</SectionLabel>
            <DriveTypeSelector t={t} isDemoAvailable={true} />
            <div className="mt-4">
                <LocationSelector branches={branches} t={t} locationData={locationData} />
            </div>

            {/* ─── Date & Time ─── */}
            <SectionLabel>Ngày & Giờ</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <FieldLabel>Ngày lái thử *</FieldLabel>
                    <Controller
                        name="selectedDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                format="DD/MM/YYYY"
                                disabledDate={disabledDate}
                                placeholder="dd/mm/yyyy"
                                locale={currentLocale}
                                className={`!h-[52px] !w-full !px-4 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 [&_input]:!text-[15px] [&_input]:!font-medium [&_input]:!text-slate-900 dark:[&_input]:!text-white ${errors.selectedDate ? '!border-red-500' : ''}`}
                                classNames={{ popup: '[&_.ant-picker-cell-in-view.ant-picker-cell-selected_.ant-picker-cell-inner]:!bg-yellow-500 [&_.ant-picker-cell-in-view.ant-picker-cell-selected_.ant-picker-cell-inner]:!text-slate-900' }}
                            />
                        )}
                    />
                    <ErrorMsg msg={errors.selectedDate?.message} />
                </div>
                <div>
                    <FieldLabel>Khung giờ *</FieldLabel>
                    <Controller
                        name="selectedTimeSlot"
                        control={control}
                        render={({ field }) => (
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        type="button"
                                        key={time}
                                        onClick={() => field.onChange(time)}
                                        className={`h-[52px] rounded-2xl text-[12px] font-bold transition-all border ${
                                            field.value === time
                                                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                                                : 'bg-white dark:bg-[#141416] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-yellow-500 hover:text-yellow-500'
                                        } ${errors.selectedTimeSlot && !field.value ? 'border-red-500' : ''}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        )}
                    />
                    <ErrorMsg msg={errors.selectedTimeSlot?.message} />
                </div>
            </div>

            {/* ─── Assignment ─── */}
            <SectionLabel>Phân công nhân viên</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel optional>Nhân viên kinh doanh phụ trách</FieldLabel>
                    <Controller
                        name="staffId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Chọn nhân viên..."
                                options={staffOptions}
                                allowClear
                                showSearch
                                filterOption={(input, opt) => (opt?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                className={`${SELECT_CLS} hover:[&_.ant-select-selector]:!border-yellow-500/50`}
                            />
                        )}
                    />
                    <p className="text-[12px] text-slate-400 mt-1.5">Bỏ trống để tạo đơn chờ phân công.</p>
                </div>
                <div>
                    <FieldLabel icon={Flag}>Mức độ ưu tiên</FieldLabel>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className={SELECT_CLS}
                                options={[
                                    { value: 'LOW', label: '🟢 Thấp' },
                                    { value: 'MEDIUM', label: '🟡 Trung bình' },
                                    { value: 'HIGH', label: '🟠 Cao' },
                                    { value: 'URGENT', label: '🔴 Khẩn cấp' },
                                ]}
                            />
                        )}
                    />
                </div>
            </div>

            {/* ─── Note ─── */}
            <SectionLabel>Ghi chú</SectionLabel>
            <div>
                <FieldLabel icon={AlignLeft} optional>Ghi chú thêm</FieldLabel>
                <Controller
                    name="note"
                    control={control}
                    render={({ field }) => (
                        <Input.TextArea
                            {...field}
                            placeholder="Yêu cầu đặc biệt, ghi chú nội bộ..."
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            className="!px-4 !py-3 !rounded-2xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[15px] !font-medium !text-slate-900 dark:!text-white"
                        />
                    )}
                />
            </div>

            {/* bottom padding for footer */}
            <div className="h-4" />
        </div>
    );
};

const AdminCreateBookingDrawer = ({ open, onClose }) => {
    const { t } = useTranslation(['adminTestDriveBookings', 'booking']);

    const logic = useAdminCreateBookingLogic({ onSuccess: onClose });

    return (
        <Drawer
            title={
                <span className="text-[16px] font-bold text-slate-800 dark:text-white">
                    Tạo Lịch Hẹn Lái Thử
                </span>
            }
            placement="right"
            width={560}
            onClose={onClose}
            open={open}
            classNames={{
                header: 'bg-white dark:bg-[#141416] border-b border-slate-200 dark:border-white/5',
                body: 'p-0 bg-white dark:bg-[#141416]',
            }}
            closeIcon={<span className="text-slate-400 hover:text-red-500 transition-colors">✕</span>}
            footer={
                <div className="flex gap-3 px-6 py-4 bg-white dark:bg-[#141416] border-t border-slate-100 dark:border-white/5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-[13px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                    >
                        Huỷ
                    </button>
                    <button
                        type="button"
                        onClick={logic.onSubmit}
                        disabled={logic.isSubmitting}
                        className="flex-[2] h-12 rounded-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-[13px] tracking-wider uppercase shadow-lg shadow-yellow-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                    >
                        {logic.isSubmitting ? 'Đang tạo...' : '+ Tạo Lịch Hẹn'}
                    </button>
                </div>
            }
            destroyOnHidden
        >
            <div className="px-6 py-5 overflow-y-auto h-full">
                <FormProvider {...logic.methods}>
                    <form onSubmit={logic.onSubmit}>
                        <FormBody
                            customerResults={logic.customerResults}
                            customerSearching={logic.customerSearching}
                            handleCustomerSearch={logic.handleCustomerSearch}
                            handleCustomerSelect={logic.handleCustomerSelect}
                            carResults={logic.carResults}
                            carSearching={logic.carSearching}
                            carInputValue={logic.carInputValue}
                            handleCarSearch={logic.handleCarSearch}
                            handleCarSelect={logic.handleCarSelect}
                            staffOptions={logic.staffOptions}
                            timeSlots={logic.timeSlots}
                            branches={logic.branches}
                            locationData={logic.locationData}
                            t={t}
                        />
                    </form>
                </FormProvider>
            </div>
        </Drawer>
    );
};

export default AdminCreateBookingDrawer;
