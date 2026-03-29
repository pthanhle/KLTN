import { Sparkles } from 'lucide-react';

const WaitlistNotification = ({ t }) => {
    return (
        <div className="mb-8 flex gap-4 items-start p-6 rounded-2xl bg-yellow-50/30 dark:bg-[#13151a] border border-yellow-200/60 dark:border-yellow-500/10 shadow-sm relative overflow-hidden">
            {/* Soft UI Glow Effect */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-yellow-500/5 to-transparent blur-2xl pointer-events-none" />

            <div className="mt-0.5 shrink-0 text-yellow-500 dark:text-yellow-400">
                <Sparkles size={22} className="animate-pulse" />
            </div>

            <div className="flex-1 font-sans text-[14.5px] text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 relative z-10">
                <p>
                    <strong className="text-slate-900 dark:text-white block text-base mb-1.5 flex items-center gap-2">
                        {t('booking_no_demo_title', 'Tạm Vắng Xe Hơi Tại Showroom')}
                    </strong>
                    {t('booking_no_demo_desc1', 'Dòng xe này hiện đang cực kỳ hút khách và tạm thời vắng mặt tại Showroom do lịch lái thử đã kín.')}
                </p>
                
                <p>
                    {t('booking_no_demo_desc2', 'Tuy nhiên, TT AUTO luôn ưu tiên trải nghiệm của quý khách. Vui lòng để lại Thông tin liên hệ ngay bên dưới, đội ngũ Sales sẽ trực tiếp xếp lịch và')} <strong className="text-yellow-600 dark:text-yellow-500 font-bold">{t('booking_no_demo_desc3', 'điều phối xe đến tận nhà')}</strong> {t('booking_no_demo_desc4', 'để quý khách có thể trải nghiệm một cách riêng tư và thoải mái nhất!')}
                </p>
            </div>
        </div>
    );
};

export default WaitlistNotification;
