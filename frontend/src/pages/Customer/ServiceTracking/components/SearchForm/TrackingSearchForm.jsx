import React from 'react';
import { Ticket, CarFront } from 'lucide-react';
import { Form } from 'antd';
import SearchInput from './SearchInput';
import SubmitButton from './SubmitButton';

const TrackingSearchForm = ({ hookState }) => {
    const { form, rules, onFinish, isSearching, t } = hookState;

    return (
        <div className="flex-1 w-full max-w-md z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
            <div className="bg-white/90 dark:bg-[#151b2d]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/20 dark:bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                    {t('search_form_title', 'Tra cứu thông tin')}
                </h2>

                <Form 
                    form={form} 
                    onFinish={onFinish} 
                    layout="vertical"
                    className="space-y-6"
                >
                    <SearchInput
                        name="bookingCode"
                        rules={rules.bookingCode}
                        label={t('label_booking_code', 'Mã đơn hàng')}
                        placeholder={t('placeholder_booking_code', 'VD: SRV-2026-B77P')}
                        icon={Ticket}
                    />

                    <SearchInput
                        name="licensePlate"
                        rules={rules.licensePlate}
                        label={t('label_license_plate', 'Biển số xe')}
                        placeholder={t('placeholder_license_plate', 'VD: 30A-123.45')}
                        icon={CarFront}
                    />

                    <SubmitButton isSearching={isSearching} />
                </Form>

                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 text-center">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        {t('search_help_text', 'Bạn gặp sự cố khi tra cứu?')}
                    </p>
                    <a href="/contact" className="text-yellow-600 dark:text-yellow-500 text-xs font-bold hover:underline underline-offset-4 decoration-2 transition-all">
                        {t('search_help_link', 'Liên hệ đội ngũ hỗ trợ 24/7')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TrackingSearchForm;
