import { useState, useMemo, useCallback } from 'react';
import { App } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from 'dayjs';
import { useAdminSalesStaff, useCreateTestDriveBookingMutation } from '../../../../services/queries/testDriveBookingAdmin.queries';
import { bookingApi } from '../../../../services/api/testDriveBookingAdmin.api';
import { TIME_SLOTS, SHOWROOM_BRANCHES } from '../../../Customer/TestDriveBooking/data/testDrive.mock';
import { useLocationCascade } from '../../../Customer/TestDriveBooking/hooks/useLocationCascade';

const adminBookingSchema = z
    .object({
        fullName: z.string().min(2, 'Vui lòng nhập họ và tên (ít nhất 2 ký tự)'),
        phoneNumber: z
            .string()
            .transform((v) => v.replace(/\s+/g, ''))
            .pipe(z.string().regex(/^(0|\+84)[0-9]{8,9}$/, 'Số điện thoại không hợp lệ')),
        carId: z.string().min(1, 'Vui lòng chọn xe lái thử'),
        bookingType: z.enum(['showroom', 'home']),
        showroomBranch: z.string().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
        addressDetail: z.string().optional(),
        selectedDate: z.any().refine((v) => v !== null && v !== undefined, { message: 'Vui lòng chọn ngày lái thử' }),
        selectedTimeSlot: z.string().min(1, 'Vui lòng chọn khung giờ'),
        staffId: z.string().optional(),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
        note: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.bookingType === 'showroom' && !data.showroomBranch) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Vui lòng chọn chi nhánh', path: ['showroomBranch'] });
        }
        if (data.bookingType === 'home') {
            if (!data.city) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Vui lòng chọn Tỉnh/Thành phố', path: ['city'] });
            if (!data.district) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Vui lòng chọn Quận/Huyện', path: ['district'] });
            if (!data.ward) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Vui lòng chọn Phường/Xã', path: ['ward'] });
            if (!data.addressDetail?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Vui lòng nhập địa chỉ cụ thể', path: ['addressDetail'] });
        }
    });

const DEFAULT_VALUES = {
    fullName: '',
    phoneNumber: '',
    carId: '',
    bookingType: 'showroom',
    showroomBranch: '1',
    city: undefined,
    district: undefined,
    ward: undefined,
    addressDetail: '',
    selectedDate: null,
    selectedTimeSlot: '',
    staffId: undefined,
    priority: 'MEDIUM',
    note: '',
};

export const useAdminCreateBookingLogic = ({ onSuccess }) => {
    const { message } = App.useApp();

    const methods = useForm({
        resolver: zodResolver(adminBookingSchema),
        mode: 'onChange',
        defaultValues: DEFAULT_VALUES,
    });

    const locationData = useLocationCascade(methods);
    const { data: salesStaff = [] } = useAdminSalesStaff();
    const createMutation = useCreateTestDriveBookingMutation();

    // Car search
    const [carResults, setCarResults] = useState([]);
    const [carSearching, setCarSearching] = useState(false);
    const [carInputValue, setCarInputValue] = useState('');

    const handleCarSearch = useCallback(async (q) => {
        setCarInputValue(q);
        if (!q || q.trim().length < 1) { setCarResults([]); return; }
        setCarSearching(true);
        try {
            const res = await bookingApi.searchCars(q);
            setCarResults(Array.isArray(res) ? res : []);
        } catch (_) { setCarResults([]); }
        finally { setCarSearching(false); }
    }, []);

    const handleCarSelect = useCallback((value, option) => {
        methods.setValue('carId', value, { shouldValidate: true });
        setCarInputValue(option.car.name);
    }, [methods]);

    // Customer search
    const [customerResults, setCustomerResults] = useState([]);
    const [customerSearching, setCustomerSearching] = useState(false);

    const handleCustomerSearch = useCallback(async (q) => {
        if (!q || q.trim().length < 1) { setCustomerResults([]); return; }
        setCustomerSearching(true);
        try {
            const res = await bookingApi.searchCustomers(q);
            setCustomerResults(res?.customers || []);
        } catch (_) { setCustomerResults([]); }
        finally { setCustomerSearching(false); }
    }, []);

    const handleCustomerSelect = useCallback((_value, option) => {
        const c = option.customer;
        methods.setValue('fullName', c.full_name || '', { shouldValidate: true });
        methods.setValue('phoneNumber', c.phone || '', { shouldValidate: true });
    }, [methods]);

    const staffOptions = useMemo(() =>
        salesStaff.map((s) => ({ value: String(s._id), label: s.fullName })),
    [salesStaff]);

    const onSubmit = methods.handleSubmit((data) => {
        const deliveryAddressObj = data.bookingType === 'home'
            ? { street: data.addressDetail, ward: data.ward, district: data.district, city: data.city }
            : null;

        const payload = {
            full_name: data.fullName,
            contact_phone: data.phoneNumber,
            product_id: data.carId,
            test_drive_type: data.bookingType,
            showroom_branch: data.bookingType === 'showroom' ? data.showroomBranch : null,
            delivery_address: deliveryAddressObj,
            booking_date: dayjs(data.selectedDate).format('YYYY-MM-DD'),
            time_slot: data.selectedTimeSlot,
            advisor_id: data.staffId || null,
            priority: data.priority || 'MEDIUM',
            note: data.note || '',
        };

        createMutation.mutate(payload, {
            onSuccess: () => {
                message.success('Tạo lịch hẹn thành công!');
                methods.reset(DEFAULT_VALUES);
                setCarResults([]);
                setCarInputValue('');
                setCustomerResults([]);
                onSuccess?.();
            },
            onError: (err) => {
                message.error(err?.response?.data?.message || err?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            },
        });
    });

    return {
        methods,
        locationData,
        // raw results — component builds JSX labels
        carResults, carSearching, carInputValue, handleCarSearch, handleCarSelect,
        customerResults, customerSearching, handleCustomerSearch, handleCustomerSelect,
        staffOptions,
        timeSlots: TIME_SLOTS,
        branches: SHOWROOM_BRANCHES,
        onSubmit,
        isSubmitting: createMutation.isPending,
    };
};
