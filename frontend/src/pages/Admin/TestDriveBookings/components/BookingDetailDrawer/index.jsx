import React from 'react';
import { Drawer, Skeleton, Tag, Image } from 'antd';
import { MapPin, Clock, User, Car, Phone, Star, FileText, UserCheck, ShieldCheck } from 'lucide-react';
import { useTestDriveBookingDetail } from '../../../../../services/queries/testDriveBookingAdmin.queries';
import { SHOWROOM_BRANCHES } from '../../../../Customer/TestDriveBooking/data/testDrive.mock';

const PRIORITY_CFG = {
    LOW:    { color: 'green',  label: 'Thấp' },
    MEDIUM: { color: 'blue',   label: 'Trung bình' },
    HIGH:   { color: 'orange', label: 'Cao' },
    URGENT: { color: 'red',    label: 'Khẩn cấp' },
};

const STATUS_CFG = {
    Pending:    { color: 'default',  label: 'Chờ phân công' },
    Confirmed:  { color: 'blue',     label: 'Đã xác nhận' },
    Received:   { color: 'cyan',     label: 'Khách đã đến' },
    InProgress: { color: 'orange',   label: 'Đang lái thử' },
    Completed:  { color: 'green',    label: 'Hoàn thành' },
    Cancelled:  { color: 'red',      label: 'Đã hủy' },
};

const INTEREST_LABELS = ['Tiềm năng thấp', 'Đang cân nhắc', 'Tiềm năng cao'];
const INTEREST_COLORS = ['red', 'orange', 'green'];

const InfoRow = ({ icon: Icon, label, value }) => (
    value ? (
        <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-white/5 last:border-0">
            <Icon size={15} className="text-yellow-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-[14px] font-semibold text-slate-800 dark:text-white mt-0.5">{value}</p>
            </div>
        </div>
    ) : null
);

const Section = ({ title, children }) => (
    <div className="mb-6">
        <p className="text-[11px] font-black tracking-widest uppercase text-yellow-500/80 dark:text-yellow-500/60 mb-3 border-b border-slate-100 dark:border-white/5 pb-2">
            {title}
        </p>
        {children}
    </div>
);

const BookingDetailDrawer = ({ bookingId, open, onClose }) => {
    const { data: booking, isLoading } = useTestDriveBookingDetail(bookingId);

    const branchName = booking?.showroomBranch
        ? (SHOWROOM_BRANCHES.find(b => b.id === booking.showroomBranch)?.name || booking.showroomBranch)
        : null;

    const addressStr = booking?.delivery_address
        ? [booking.delivery_address.street, booking.delivery_address.ward, booking.delivery_address.district, booking.delivery_address.city].filter(Boolean).join(', ')
        : '';

    const priorityCfg = PRIORITY_CFG[booking?.priority] || PRIORITY_CFG.MEDIUM;
    const statusCfg = STATUS_CFG[booking?.status] || { color: 'default', label: booking?.status };

    return (
        <Drawer
            title={
                <div className="flex items-center gap-3">
                    <span className="text-[16px] font-bold text-slate-800 dark:text-white">Chi tiết lịch lái thử</span>
                    {booking && (
                        <Tag color={statusCfg.color} className="text-[11px] font-bold">
                            {statusCfg.label}
                        </Tag>
                    )}
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
            destroyOnClose
        >
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 12 }} />
            ) : !booking ? (
                <p className="text-slate-400 text-center py-12">Không tìm thấy dữ liệu.</p>
            ) : (
                <div className="px-1">
                    {/* Booking code + priority */}
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-white/5">
                        <div>
                            <p className="text-[12px] text-slate-400">Mã lịch hẹn</p>
                            <p className="text-[15px] font-black text-slate-800 dark:text-white tracking-wider">
                                {booking.booking_code || '—'}
                                {booking.sequence_number != null && (
                                    <span className="ml-2 text-yellow-600 dark:text-yellow-500">#{booking.sequence_number}</span>
                                )}
                            </p>
                        </div>
                        <Tag color={priorityCfg.color} className="text-[12px] font-bold px-3 py-1">
                            {priorityCfg.label}
                        </Tag>
                    </div>

                    {/* Customer */}
                    <Section title="Thông tin khách hàng">
                        <InfoRow icon={User}  label="Họ tên"         value={booking.fullName} />
                        <InfoRow icon={Phone} label="Số điện thoại"  value={booking.phoneNumber} />
                        <div className="flex items-center gap-2 py-2">
                            <ShieldCheck size={15} className={booking.hasDriverLicense ? 'text-green-500' : 'text-slate-400'} />
                            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mr-2">Bằng lái xe</span>
                            <Tag color={booking.hasDriverLicense ? 'green' : 'default'} className="text-[11px] font-bold">
                                {booking.hasDriverLicense ? 'Đã cam kết có bằng lái' : 'Chưa xác nhận'}
                            </Tag>
                        </div>
                    </Section>

                    {/* Car + schedule */}
                    <Section title="Xe & Lịch hẹn">
                        {booking.targetCar?.image && (
                            <div className="mb-3 rounded-xl overflow-hidden h-36 bg-slate-100 dark:bg-white/5">
                                <img src={booking.targetCar.image} alt={booking.targetCar.name}
                                    className="w-full h-full object-cover" />
                            </div>
                        )}
                        <InfoRow icon={Car}   label="Xe"       value={booking.targetCar?.name || booking.targetCarSku} />
                        <InfoRow icon={Clock} label="Ngày giờ" value={`${booking.selectedDate} — ${booking.selectedTimeSlot}`} />
                        <InfoRow icon={MapPin} label="Địa điểm"
                            value={booking.bookingType === 'home'
                                ? `Lái thử tại nhà${addressStr ? ' — ' + addressStr : ''}`
                                : `Tại showroom${branchName ? ' — ' + branchName : ''}`
                            } />
                    </Section>

                    {/* Staff assignment */}
                    {booking.assignedStaff && (
                        <Section title="Nhân viên phụ trách">
                            <div className="flex items-center gap-3 py-2">
                                {booking.assignedStaff.avatar
                                    ? <img src={booking.assignedStaff.avatar} alt={booking.assignedStaff.name}
                                        className="w-10 h-10 rounded-full object-cover" />
                                    : <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 font-black text-[14px]">
                                        {booking.assignedStaff.name?.[0]?.toUpperCase()}
                                      </div>
                                }
                                <div>
                                    <p className="text-[14px] font-bold text-slate-800 dark:text-white">{booking.assignedStaff.name}</p>
                                    {booking.assignment_note && (
                                        <p className="text-[12px] text-slate-400 mt-0.5">Ghi chú: {booking.assignment_note}</p>
                                    )}
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* Customer note */}
                    {booking.note && (
                        <Section title="Ghi chú của khách">
                            <p className="text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed">{booking.note}</p>
                        </Section>
                    )}

                    {/* Check-in data */}
                    {(booking.driverLicenseUrl || booking.signatureUrl) && (
                        <Section title="Dữ liệu check-in">
                            <div className="grid grid-cols-2 gap-4">
                                {booking.driverLicenseUrl && (
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                            <UserCheck size={13} className="text-yellow-500" /> Bằng lái xe
                                        </p>
                                        <Image
                                            src={booking.driverLicenseUrl}
                                            alt="Bằng lái xe"
                                            className="!rounded-xl object-cover"
                                            style={{ width: '100%', height: 110, objectFit: 'cover' }}
                                            preview={{ mask: 'Xem ảnh' }}
                                        />
                                    </div>
                                )}
                                {booking.signatureUrl && (
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                            <FileText size={13} className="text-yellow-500" /> Chữ ký khách hàng
                                        </p>
                                        <Image
                                            src={booking.signatureUrl}
                                            alt="Chữ ký"
                                            className="!rounded-xl !bg-white"
                                            style={{ width: '100%', height: 110, objectFit: 'contain', background: '#fff' }}
                                            preview={{ mask: 'Xem ảnh' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Section>
                    )}

                    {/* Post-drive evaluation */}
                    {booking.interestLevel !== null && booking.interestLevel !== undefined && (
                        <Section title="Đánh giá sau lái thử">
                            <div className="flex items-center gap-3 mb-3">
                                <Star size={15} className="text-yellow-500 shrink-0" />
                                <Tag color={INTEREST_COLORS[booking.interestLevel]} className="text-[13px] font-bold px-3 py-1">
                                    {INTEREST_LABELS[booking.interestLevel]}
                                </Tag>
                            </div>
                            {booking.evaluationFeedback && (
                                <p className="text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3">
                                    {booking.evaluationFeedback}
                                </p>
                            )}
                        </Section>
                    )}
                </div>
            )}
        </Drawer>
    );
};

export default BookingDetailDrawer;
