import React from 'react';
import { Drawer, Tag } from 'antd';
import {
    Calendar, Clock, User, Car, Phone, Wrench, FileText, UserCheck, Hash
} from 'lucide-react';

const STATUS_CFG = {
    CONFIRMED:  { color: 'blue',    label: 'Đã xác nhận' },
    RECEIVED:   { color: 'cyan',    label: 'Đã tiếp nhận' },
    IN_PROGRESS:{ color: 'orange',  label: 'Đang xử lý' },
    COMPLETED:  { color: 'green',   label: 'Hoàn thành' },
    CANCELLED:  { color: 'red',     label: 'Đã hủy' },
};

const InfoRow = ({ icon: Icon, label, value }) =>
    value ? (
        <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-white/5 last:border-0">
            <Icon size={15} className="text-yellow-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-white mt-0.5 break-words">{value}</p>
            </div>
        </div>
    ) : null;

const Section = ({ title, children }) => (
    <div className="mb-6">
        <p className="text-[11px] font-black tracking-widest uppercase text-yellow-500/80 dark:text-yellow-500/60 mb-3 border-b border-slate-100 dark:border-white/5 pb-2">
            {title}
        </p>
        {children}
    </div>
);

const ServiceBookingDetailDrawer = ({ booking, advisors = [], open, onClose }) => {
    if (!booking) return null;

    const statusCfg = STATUS_CFG[booking.status] || { color: 'default', label: booking.status };

    const advisorName = (() => {
        if (!booking.advisor_id) return null;
        const found = advisors.find(a => a._id.toString() === booking.advisor_id.toString());
        return found?.fullName || null;
    })();

    const vehicleDisplay = [booking.vehicle_brand, booking.vehicle_model]
        .filter(Boolean).join(' ') || '—';

    return (
        <Drawer
            title={
                <div className="flex items-center gap-3">
                    <span className="text-[16px] font-bold text-slate-800 dark:text-white">
                        Chi tiết lịch dịch vụ
                    </span>
                    <Tag color={statusCfg.color} className="text-[11px] font-bold">
                        {statusCfg.label}
                    </Tag>
                </div>
            }
            placement="right"
            width={520}
            onClose={onClose}
            open={open}
            classNames={{
                header: 'bg-white dark:bg-[#141416] border-b border-slate-200 dark:border-white/5',
                body: 'bg-white dark:bg-[#141416]',
            }}
            closeIcon={<span className="text-slate-400 hover:text-red-500 transition-colors">✕</span>}
            destroyOnHidden
        >
            <div className="px-1">
                {/* Booking code + date created */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-white/5">
                    <div>
                        <p className="text-[12px] text-slate-400 mb-0.5">Mã đặt lịch</p>
                        <p className="text-[17px] font-black text-slate-800 dark:text-white tracking-wider font-mono">
                            {booking.booking_code || '—'}
                            {booking.sequence_number != null && (
                                <span className="ml-2 text-yellow-600 dark:text-yellow-500">#{booking.sequence_number}</span>
                            )}
                        </p>
                    </div>
                    {booking.created_at && (
                        <div className="text-right">
                            <p className="text-[11px] text-slate-400">Ngày tạo</p>
                            <p className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
                                {new Date(booking.created_at).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    )}
                </div>

                {/* Customer info */}
                <Section title="Thông tin khách hàng">
                    <InfoRow icon={User}  label="Họ tên"         value={booking.customer_name} />
                    <InfoRow icon={Phone} label="Số điện thoại"  value={booking.customer_phone} />
                    {booking.is_vip && (
                        <div className="flex items-center gap-2 py-2">
                            <span className="text-yellow-500 text-base">★</span>
                            <Tag color="gold" className="text-[11px] font-bold">Khách hàng VIP</Tag>
                        </div>
                    )}
                </Section>

                {/* Appointment */}
                <Section title="Lịch hẹn">
                    <InfoRow
                        icon={Calendar}
                        label="Ngày hẹn"
                        value={booking.booking_date
                            ? booking.booking_date.split('-').reverse().join('/')
                            : null}
                    />
                    <InfoRow icon={Clock} label="Khung giờ" value={booking.time_slot} />
                </Section>

                {/* Vehicle */}
                <Section title="Thông tin xe">
                    <InfoRow icon={Car}      label="Xe"        value={vehicleDisplay} />
                    <InfoRow icon={Hash}     label="Biển số"   value={booking.license_plate} />
                </Section>

                {/* Services */}
                {booking.selected_services?.length > 0 && (
                    <Section title="Dịch vụ yêu cầu">
                        <div className="flex flex-wrap gap-2 py-1">
                            {booking.selected_services.map((s, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-[12px] font-semibold rounded-lg border border-yellow-500/20"
                                >
                                    <Wrench size={11} />
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Symptoms / notes */}
                {booking.vehicle_condition && (
                    <Section title="Triệu chứng / Ghi chú">
                        <div className="bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3 border border-slate-100 dark:border-white/5">
                            <p className="text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {booking.vehicle_condition}
                            </p>
                        </div>
                    </Section>
                )}

                {/* Assigned advisor */}
                {advisorName && (
                    <Section title="Cố vấn phụ trách">
                        <div className="flex items-center gap-3 py-2">
                            <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 font-black text-[14px] shrink-0">
                                {advisorName[0]?.toUpperCase()}
                            </div>
                            <div>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-white">
                                    {advisorName}
                                </p>
                                <p className="text-[11px] text-slate-400 uppercase tracking-wide">Advisor</p>
                            </div>
                        </div>
                    </Section>
                )}
            </div>
        </Drawer>
    );
};

export default ServiceBookingDetailDrawer;
