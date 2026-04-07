import { Star, Upload, MessageSquare } from 'lucide-react';
import { Button } from 'antd';
import DOMPurify from 'dompurify';
import SpecsSection from './Specs';
import ReviewSection from './Review';

import LandingBlockRenderer from './LandingBlockRenderer';

export const PartTabsSection = ({ part, activeTab, setActiveTab, selectedOptions, t }) => {
    return (
        <section className="border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 sm:gap-12 overflow-x-auto custom-scrollbar mb-10 w-full no-scrollbar">
                <Button type="text" onClick={() => setActiveTab('description')} className={`!pb-6 !h-auto !px-[2px] !rounded-none !text-lg !font-medium whitespace-nowrap !shadow-none focus:!outline-none focus:!bg-transparent hover:!bg-transparent ${activeTab === 'description' ? '!text-slate-900 dark:!text-white border-b-4 !border-transparent !border-b-yellow-500 !font-bold outline-none' : '!text-slate-400 hover:!text-slate-600 dark:hover:!text-slate-200 bg-transparent transition-colors outline-none !border-transparent'}`}>
                    {t('tab_desc', 'Mô tả sản phẩm')}
                </Button>
                <Button type="text" onClick={() => setActiveTab('specs')} className={`!pb-6 !h-auto !px-[2px] !rounded-none !text-lg !font-medium whitespace-nowrap !shadow-none focus:!outline-none focus:!bg-transparent hover:!bg-transparent ${activeTab === 'specs' ? '!text-slate-900 dark:!text-white border-b-4 !border-transparent !border-b-yellow-500 !font-bold outline-none' : '!text-slate-400 hover:!text-slate-600 dark:hover:!text-slate-200 bg-transparent transition-colors outline-none !border-transparent'}`}>
                    {t('tab_specs', 'Thông số kỹ thuật')}
                </Button>
                <Button type="text" onClick={() => setActiveTab('reviews')} className={`!pb-6 !h-auto !px-[2px] !rounded-none !text-lg !font-medium whitespace-nowrap !shadow-none focus:!outline-none focus:!bg-transparent hover:!bg-transparent ${activeTab === 'reviews' ? '!text-slate-900 dark:!text-white border-b-4 !border-transparent !border-b-yellow-500 !font-bold outline-none' : '!text-slate-400 hover:!text-slate-600 dark:hover:!text-slate-200 bg-transparent transition-colors outline-none !border-transparent'}`}>
                    {t('tab_reviews', 'Đánh giá & Bình luận')} ({part.reviews?.length || 0})
                </Button>
            </div>

            {activeTab === 'description' && (
                <div className="w-full">
                    <LandingBlockRenderer blocks={part.landing_blocks} t={t} />
                </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
                <SpecsSection part={part} />
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
                <ReviewSection part={part} selectedOptions={selectedOptions} t={t} />
            )}
        </section>
    );
};

export default PartTabsSection;
