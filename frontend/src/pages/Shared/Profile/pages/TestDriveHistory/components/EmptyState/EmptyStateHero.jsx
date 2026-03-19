import { CarFront } from 'lucide-react';
import { Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EMPTY_STATE_BG_IMAGE } from '../../constants/emptyState';

const EmptyStateHero = ({ t }) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full overflow-hidden bg-white dark:bg-[#07090e] border border-slate-200/50 dark:border-white/5 rounded-[40px] px-6 py-20 flex flex-col items-center justify-center text-center shadow-2xl transition-colors duration-300">
            {/* Background Image / Blur Effect Overlay */}
            <div className="absolute right-0 bottom-0 w-2/3 h-full mix-blend-multiply dark:mix-blend-screen opacity-[0.15] dark:opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white dark:to-[#07090e] z-10 transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:to-[#07090e] via-transparent to-transparent z-10 transition-colors duration-300"></div>
                <Image
                    src={EMPTY_STATE_BG_IMAGE}
                    preview={true}
                    alt="Luxury car background"
                    className="w-full h-full object-cover object-right-bottom filter grayscale contrast-125"
                    rootClassName="w-full h-full absolute inset-0"
                />
            </div>

            {/* Glowing Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-400/20 dark:bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-28 h-28 rounded-full bg-slate-50 dark:bg-white/5 backdrop-blur-md flex items-center justify-center mb-8 border border-slate-100 dark:border-white/10 shadow-[0_0_40px_rgba(234,179,8,0.1)] transition-colors duration-300">
                <CarFront size={48} strokeWidth={2.5} className="text-yellow-500" />
            </div>

            <h3 className="relative z-10 text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-md transition-colors duration-300">
                {t('empty_hero_title', 'Hành trình mới đang chờ bạn')}
            </h3>

            <p className="relative z-10 text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-[500px] mx-auto leading-relaxed text-[15px] transition-colors duration-300">
                {t('empty_hero_desc', 'Bạn chưa có lịch hẹn lái thử nào trong danh sách. Hãy chọn mẫu xe yêu thích và trải nghiệm ngay cảm giác lái thượng lưu cùng TT AUTO.')}
            </p>

            <Button
                type="primary"
                onClick={() => navigate('/cars')}
                className="relative z-10 w-fit !h-auto !py-5 !px-10 bg-yellow-500 hover:!bg-yellow-400 text-slate-900 border-none transition-all font-black rounded-full uppercase tracking-widest text-[13px] shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] hover:-translate-y-1"
            >
                {t('empty_hero_btn', 'Đăng ký lái thử ngay')}
            </Button>
        </div>
    );
};

export default EmptyStateHero;
