import { useState } from 'react';
import { Calendar, Clock, Wrench, Car, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SERVICE_LABELS = {
    MAINTENANCE: 'Bảo dưỡng định kỳ',
    REPAIR: 'Sửa chữa',
    CAR_SPA: 'Rửa xe / Chăm sóc xe',
    INSPECTION: 'Kiểm tra tổng quát',
    OTHER: 'Dịch vụ khác',
};

const formatDate = (dateStr) => {
    if (!dateStr) return 'Chưa xác định';
    try {
        return new Date(dateStr).toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return dateStr;
    }
};

const BookingConfirmationCard = ({ bookingDraft, onConfirm }) => {
    const [status, setStatus] = useState('pending');
    const [bookingCode, setBookingCode] = useState(null);
    const [error, setError] = useState(null);

    const vehicleParts = [
        bookingDraft.vehicle_brand,
        bookingDraft.vehicle_model,
        bookingDraft.vehicle_license_plate,
    ].filter(Boolean);

    const handleConfirm = async () => {
        setStatus('loading');
        setError(null);
        try {
            const result = await onConfirm(bookingDraft);
            setBookingCode(result?.booking?.booking_code || result?.booking_code);
            setStatus('confirmed');
        } catch (e) {
            setError('Đặt lịch thất bại. Vui lòng thử lại hoặc liên hệ trực tiếp shop.');
            setStatus('error');
        }
    };

    if (status === 'confirmed') {
        return (
            <div className="mt-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 space-y-2 max-w-[85%]">
                <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={18} />
                    <span className="font-semibold text-sm">Đặt lịch thành công!</span>
                </div>
                {bookingCode && (
                    <p className="text-xs text-slate-400">
                        Mã đặt lịch: <span className="text-yellow-400 font-bold">{bookingCode}</span>
                    </p>
                )}
                <p className="text-xs text-slate-500">Chúng tôi sẽ liên hệ xác nhận lịch hẹn của bạn sớm nhất.</p>
            </div>
        );
    }

    if (status === 'cancelled') {
        return (
            <div className="mt-3 rounded-2xl border border-slate-600/40 bg-slate-800/40 p-3 max-w-[85%]">
                <div className="flex items-center gap-2 text-slate-400">
                    <XCircle size={16} />
                    <span className="text-sm">Đã hủy yêu cầu đặt lịch.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 dark:bg-yellow-500/10 p-4 space-y-3 max-w-[85%]">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-500">
                Xác nhận thông tin đặt lịch
            </p>

            <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Wrench size={14} className="mt-0.5 text-yellow-500 shrink-0" />
                    <span>{SERVICE_LABELS[bookingDraft.service_type] || bookingDraft.service_type || 'Chưa xác định'}</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Calendar size={14} className="mt-0.5 text-yellow-500 shrink-0" />
                    <span>{formatDate(bookingDraft.booking_date)}</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Clock size={14} className="mt-0.5 text-yellow-500 shrink-0" />
                    <span>{bookingDraft.time_slot || 'Chưa xác định'}</span>
                </div>

                {vehicleParts.length > 0 && (
                    <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <Car size={14} className="mt-0.5 text-yellow-500 shrink-0" />
                        <span>{vehicleParts.join(' - ')}</span>
                    </div>
                )}

                {bookingDraft.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-5 italic">
                        {bookingDraft.notes}
                    </p>
                )}
            </div>

            {status === 'error' && (
                <p className="text-xs text-red-400">{error}</p>
            )}

            <div className="flex gap-2 pt-1">
                <button
                    onClick={handleConfirm}
                    disabled={status === 'loading'}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-900 text-sm font-semibold rounded-xl py-2 transition-colors"
                >
                    {status === 'loading' ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <CheckCircle size={14} />
                    )}
                    {status === 'loading' ? 'Đang đặt...' : 'Xác nhận'}
                </button>
                <button
                    onClick={() => setStatus('cancelled')}
                    disabled={status === 'loading'}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 disabled:opacity-60 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl py-2 transition-colors"
                >
                    <XCircle size={14} />
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmationCard;
