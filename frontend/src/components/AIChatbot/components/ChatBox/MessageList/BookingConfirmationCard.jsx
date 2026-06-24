import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { serviceCategoryAPI } from '@/services/api/serviceCategories.api';
import { serviceItemAPI } from '@/services/api/serviceItems.api';

const TIME_SLOTS = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00'];

const mapCategoryToServiceType = (categoryName = '') => {
    const n = categoryName.toLowerCase();
    if (n.includes('bảo dưỡng')) return 'MAINTENANCE';
    if (n.includes('rửa') || n.includes('chăm sóc') || n.includes('ngoại thất') || n.includes('sơn')) return 'CAR_SPA';
    if (n.includes('kiểm tra') || n.includes('đăng kiểm') || n.includes('kiểm định')) return 'INSPECTION';
    if (n.includes('sửa chữa') || n.includes('động cơ') || n.includes('phanh') || n.includes('lái') || n.includes('hộp số') || n.includes('điện')) return 'REPAIR';
    return 'OTHER';
};

const inputCls = (hasError) =>
    `w-full bg-slate-100 dark:bg-[#252528] text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3 py-2 border ${hasError
        ? 'border-red-400 focus:ring-red-400'
        : 'border-slate-200 dark:border-white/10 focus:ring-yellow-500'
    } focus:outline-none focus:ring-1 transition-colors`;

const Label = ({ children, required }) => (
    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
        {children}
        {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
);

const FieldError = ({ msg }) =>
    msg ? <p className="text-[10px] text-red-400 mt-0.5">{msg}</p> : null;

const formatPrice = (price, priceType) => {
    if (!price || priceType === 'CONTACT') return 'Liên hệ';
    const prefix = priceType === 'STARTING_AT' ? 'Từ ' : '';
    return `${prefix}${price.toLocaleString('vi-VN')}đ`;
};

const BookingConfirmationCard = ({ bookingDraft, defaultPhone, onConfirm }) => {
    const isTestDrive = bookingDraft?.service_type === 'TEST_DRIVE';

    const [form, setForm] = useState({
        booking_date: bookingDraft?.booking_date || '',
        time_slot: bookingDraft?.time_slot || '',
        vehicle_brand: bookingDraft?.vehicle_brand || '',
        vehicle_model: bookingDraft?.vehicle_model || '',
        vehicle_license_plate: bookingDraft?.vehicle_license_plate || '',
        contact_phone: defaultPhone || '',
        notes: bookingDraft?.notes || '',
        product_id: '',
    });

    const [cars, setCars] = useState([]);
    const [loadingCars, setLoadingCars] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const [categories, setCategories] = useState([]);
    const [serviceItems, setServiceItems] = useState([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [loadingItems, setLoadingItems] = useState(false);

    const [status, setStatus] = useState('pending');
    const [bookingCode, setBookingCode] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        serviceCategoryAPI
            .getClientServiceCategories()
            .then((res) => {
                const cats = Array.isArray(res) ? res : res?.categories || [];
                setCategories(cats);
            })
            .catch(() => setCategories([]))
            .finally(() => setLoadingCats(false));
    }, []);

    useEffect(() => {
        if (!selectedCategory) {
            setServiceItems([]);
            return;
        }
        setLoadingItems(true);
        setSelectedItems([]);
        serviceItemAPI
            .getClientServiceItems({ category: selectedCategory._id, limit: 50 })
            .then((res) => {
                const items = res?.services || [];
                setServiceItems(items);
            })
            .catch(() => setServiceItems([]))
            .finally(() => setLoadingItems(false));
    }, [selectedCategory]);

    useEffect(() => {
        if (isTestDrive) {
            setLoadingCars(true);
            import('@/services/api/clientProduct.api').then(({ getAllClientProducts }) => {
                getAllClientProducts()
                    .then(res => {
                        const carList = Array.isArray(res) ? res : res?.products || res?.data || [];
                        // Try to auto-select if AI extracted brand/model
                        let defaultCarId = '';
                        if (bookingDraft?.vehicle_brand || bookingDraft?.vehicle_model) {
                            const searchStr = `${bookingDraft.vehicle_brand || ''} ${bookingDraft.vehicle_model || ''}`.toLowerCase();
                            const matchedCar = carList.find(c => 
                                searchStr.includes(c.brandName?.toLowerCase()) || 
                                searchStr.includes(c.name?.toLowerCase())
                            );
                            if (matchedCar) defaultCarId = matchedCar._id;
                        }
                        setCars(carList);
                        if (defaultCarId) {
                            setForm(prev => ({ ...prev, product_id: defaultCarId }));
                        }
                    })
                    .catch(() => setCars([]))
                    .finally(() => setLoadingCars(false));
            });
        }
    }, [isTestDrive, bookingDraft]);

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const toggleItem = (item) => {
        setSelectedItems((prev) =>
            prev.find((i) => i._id === item._id)
                ? prev.filter((i) => i._id !== item._id)
                : [...prev, item]
        );
    };

    const validate = () => {
        const errs = {};
        if (!form.booking_date) errs.booking_date = 'Vui lòng chọn ngày hẹn';
        if (!form.time_slot) errs.time_slot = 'Vui lòng chọn khung giờ';
        if (!form.contact_phone.trim()) errs.contact_phone = 'Vui lòng nhập số điện thoại';

        if (isTestDrive) {
            if (!form.product_id) errs.product_id = 'Vui lòng chọn dòng xe';
        } else {
            if (!selectedCategory) errs.category = 'Vui lòng chọn nhóm dịch vụ';
            if (!form.vehicle_brand.trim()) errs.vehicle_brand = 'Vui lòng nhập thương hiệu xe';
            if (!form.vehicle_license_plate.trim()) errs.vehicle_license_plate = 'Vui lòng nhập biển số xe';
        }

        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleConfirm = async () => {
        if (!validate()) return;
        setStatus('loading');
        setApiError(null);
        try {
            const result = await onConfirm({
                ...form,
                service_type: isTestDrive ? 'TEST_DRIVE' : (selectedCategory
                    ? mapCategoryToServiceType(selectedCategory.name)
                    : bookingDraft?.service_type || 'OTHER'),
                services: isTestDrive ? [] : selectedItems.map((item) => ({
                    service_id: item._id,
                    service_name: item.serviceName,
                    price: item.basePrice || 0,
                })),
            });
            setBookingCode(result?.booking?.booking_code || result?.booking_code);
            setStatus('confirmed');
        } catch {
            setApiError('Đặt lịch thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp shop.');
            setStatus('error');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    if (status === 'confirmed') {
        return (
            <div className="mt-2 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 space-y-2 w-full">
                <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={17} />
                    <span className="font-semibold text-sm">Đặt lịch thành công!</span>
                </div>
                {bookingCode && (
                    <p className="text-xs text-slate-400">
                        Mã đặt lịch:{' '}
                        <span className="text-yellow-400 font-bold">{bookingCode}</span>
                    </p>
                )}
                <p className="text-xs text-slate-500">
                    Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong thời gian sớm nhất.
                </p>
            </div>
        );
    }

    if (status === 'cancelled') {
        return (
            <div className="mt-2 rounded-2xl border border-slate-600/30 bg-slate-800/30 p-3 w-full">
                <div className="flex items-center gap-2 text-slate-500">
                    <XCircle size={15} />
                    <span className="text-sm">Đã hủy yêu cầu đặt lịch.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-2 rounded-2xl border border-yellow-500/30 bg-white dark:bg-[#1c1c1e] p-4 space-y-3 w-full shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-yellow-500">
                {isTestDrive ? 'Phiếu đặt lịch lái thử' : 'Phiếu đặt lịch dịch vụ'}
            </p>

            {/* --- Date + Time --- */}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label required>Ngày hẹn</Label>
                    <input
                        type="date"
                        min={today}
                        value={form.booking_date}
                        onChange={set('booking_date')}
                        className={inputCls(!!fieldErrors.booking_date)}
                    />
                    <FieldError msg={fieldErrors.booking_date} />
                </div>
                <div>
                    <Label required>Khung giờ</Label>
                    <select
                        value={form.time_slot}
                        onChange={set('time_slot')}
                        className={inputCls(!!fieldErrors.time_slot)}
                    >
                        <option value="">Chọn khung giờ</option>
                        {TIME_SLOTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <FieldError msg={fieldErrors.time_slot} />
                </div>
            </div>

            {/* --- Service Category --- */}
            {!isTestDrive && (
                <div>
                    <Label required>Nhóm dịch vụ</Label>
                    {loadingCats ? (
                        <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                            <Loader2 size={13} className="animate-spin" />
                            Đang tải danh mục...
                        </div>
                    ) : (
                        <select
                            value={selectedCategory?._id || ''}
                            onChange={(e) => {
                                const cat = categories.find((c) => c._id === e.target.value) || null;
                                setSelectedCategory(cat);
                            }}
                            className={inputCls(!!fieldErrors.category)}
                        >
                            <option value="">Chọn nhóm dịch vụ</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    )}
                    <FieldError msg={fieldErrors.category} />
                </div>
            )}

            {/* --- Service Items --- */}
            {!isTestDrive && selectedCategory && (
                <div>
                    <Label>Hạng mục chi tiết</Label>
                    {loadingItems ? (
                        <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                            <Loader2 size={13} className="animate-spin" />
                            Đang tải hạng mục...
                        </div>
                    ) : serviceItems.length === 0 ? (
                        <p className="text-xs text-slate-400 py-1">
                            Không có hạng mục nào cho danh mục này.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {serviceItems.map((item) => {
                                const selected = selectedItems.some((i) => i._id === item._id);
                                return (
                                    <button
                                        key={item._id}
                                        type="button"
                                        onClick={() => toggleItem(item)}
                                        className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${selected
                                            ? 'bg-yellow-500 border-yellow-500 text-slate-900'
                                            : 'bg-slate-100 dark:bg-white/8 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-yellow-500/50'
                                            }`}
                                    >
                                        {item.serviceName}
                                        {item.basePrice > 0 && (
                                            <span className={`ml-1 ${selected ? 'text-slate-800' : 'text-slate-400'}`}>
                                                · {formatPrice(item.basePrice, item.priceType)}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* --- Vehicle info --- */}
            <div className="grid grid-cols-2 gap-2">
                {isTestDrive ? (
                    <div className="col-span-2">
                        <Label required>Dòng xe muốn lái thử</Label>
                        {loadingCars ? (
                            <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                                <Loader2 size={13} className="animate-spin" />
                                Đang tải danh sách xe...
                            </div>
                        ) : (
                            <select
                                value={form.product_id || ''}
                                onChange={set('product_id')}
                                className={inputCls(!!fieldErrors.product_id)}
                            >
                                <option value="">Chọn xe để lái thử</option>
                                {cars.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.brandName} {c.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <FieldError msg={fieldErrors.product_id} />
                    </div>
                ) : (
                    <>
                        <div>
                            <Label required>Thương hiệu xe</Label>
                            <input
                                type="text"
                                placeholder="Toyota, Honda..."
                                value={form.vehicle_brand}
                                onChange={set('vehicle_brand')}
                                className={inputCls(!!fieldErrors.vehicle_brand)}
                            />
                            <FieldError msg={fieldErrors.vehicle_brand} />
                        </div>
                        <div>
                            <Label>Dòng xe</Label>
                            <input
                                type="text"
                                placeholder="Camry, Civic..."
                                value={form.vehicle_model}
                                onChange={set('vehicle_model')}
                                className={inputCls(false)}
                            />
                        </div>
                        <div>
                            <Label required>Biển số xe</Label>
                            <input
                                type="text"
                                placeholder="51A-123.45"
                                value={form.vehicle_license_plate}
                                onChange={set('vehicle_license_plate')}
                                className={inputCls(!!fieldErrors.vehicle_license_plate)}
                            />
                            <FieldError msg={fieldErrors.vehicle_license_plate} />
                        </div>
                    </>
                )}
                <div className="col-span-2">
                    <Label required>Số điện thoại</Label>
                    <input
                        type="tel"
                        placeholder="0901234567"
                        value={form.contact_phone}
                        onChange={set('contact_phone')}
                        className={inputCls(!!fieldErrors.contact_phone)}
                    />
                    <FieldError msg={fieldErrors.contact_phone} />
                </div>
            </div>

            {/* --- Notes --- */}
            <div>
                <Label>{isTestDrive ? 'Ghi chú thêm' : 'Triệu chứng / Ghi chú'}</Label>
                <textarea
                    rows={2}
                    placeholder={isTestDrive ? "Yêu cầu đặc biệt..." : "Mô tả triệu chứng hoặc yêu cầu đặc biệt..."}
                    value={form.notes}
                    onChange={set('notes')}
                    className={inputCls(false) + ' resize-none'}
                />
            </div>

            {apiError && <p className="text-xs text-red-400">{apiError}</p>}

            {/* --- Actions --- */}
            <div className="flex gap-2 pt-0.5">
                <button
                    onClick={handleConfirm}
                    disabled={status === 'loading'}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 text-sm font-semibold rounded-xl py-2.5 transition-all"
                >
                    {status === 'loading' ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <CheckCircle size={14} />
                    )}
                    {status === 'loading' ? 'Đang đặt lịch...' : 'Xác nhận đặt lịch'}
                </button>
                <button
                    onClick={() => setStatus('cancelled')}
                    disabled={status === 'loading'}
                    className="px-4 flex items-center justify-center bg-slate-100 dark:bg-white/8 hover:bg-slate-200 dark:hover:bg-white/15 disabled:opacity-60 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl py-2.5 transition-colors"
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationCard;
