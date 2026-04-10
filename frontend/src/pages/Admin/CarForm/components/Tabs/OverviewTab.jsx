import { useTranslation } from 'react-i18next';
import GeneralInfoCard from './Overview/components/GeneralInfoCard';
import ClassificationCard from './Overview/components/ClassificationCard';
import CoverPreviewCard from './Overview/components/CoverPreviewCard';
import SeoShortcutCard from './Overview/components/SeoShortcutCard';

const OverviewTab = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Header Text */}
            <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 uppercase text-[10px] tracking-[0.2em] font-black mb-6">{t('overviewHeroSubtitle', 'Trạm nhập Tổng Quan')}</span>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">{t('overviewHeroTitle', 'Cấu trúc Dữ liệu Siêu Xe Cơ Bản')}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">{t('overviewHeroDesc', 'Tab này định nghĩa thông số nhận diện DNA của phương tiện. Kích hoạt giao diện từ Menu hoặc làm theo hướng dẫn Stitch để tạo Form.')}</p>
            </div>

            {/* Main Form Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <GeneralInfoCard />
                </div>
                
                <div className="space-y-8">
                    <ClassificationCard />
                    <CoverPreviewCard />
                    <SeoShortcutCard />
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
