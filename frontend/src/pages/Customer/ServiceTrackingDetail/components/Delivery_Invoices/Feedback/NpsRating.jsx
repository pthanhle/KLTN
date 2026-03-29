import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import NpsRatingStar from './NpsRatingStar';
import { useNpsRatingLogic } from '../../../hooks/useNpsRatingLogic';

const NpsRating = ({ data }) => {
    const { t } = useTranslation('tracking');
    const { ratingData, isSubmitting, isSubmitted, handleRatingChange, handleCommentChange, handleSubmit } = useNpsRatingLogic(data);

    if (isSubmitted) {
        return (
            <section className="bg-slate-50 dark:bg-[#111827] w-full rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 mx-auto">
                    <CheckCircle2 className="text-emerald-500" size={32} />
                </div>
                <h2 className="text-slate-800 dark:text-white text-xl font-semibold mb-2">{t('del_rating_thanks', 'Cảm ơn Đánh Giá của Quý Khách')}</h2>
                <p className="text-slate-500 dark:text-gray-500 text-xs">{t('del_rating_appreciate', 'Sự đóng góp của ngài giúp chúng tôi hoàn thiện dịch vụ.')}</p>
            </section>
        );
    }

    return (
        <section className="bg-slate-50 dark:bg-[#111827] w-full rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 shadow-sm">
            <header className="mb-8">
                <h2 className="text-slate-800 dark:text-white text-xl font-semibold mb-1">{t('del_rating_title', 'Tâm Khảo Sát Đánh Giá')}</h2>
                <p className="text-slate-500 dark:text-gray-500 text-xs">{t('del_rating_subtitle', 'Help us perfect your next executive experience.')}</p>
            </header>
            
            <div className="space-y-6 mb-8">
                <NpsRatingStar 
                    label={t('del_rating_advisor', 'Cố Vấn Dịch Vụ Định Danh')} 
                    value={ratingData.advisor_rating} 
                    onChange={(val) => handleRatingChange('advisor_rating', val)} 
                />
                <NpsRatingStar 
                    label={t('del_rating_tech', 'Kỹ Thuật Thi Công')} 
                    value={ratingData.tech_rating} 
                    onChange={(val) => handleRatingChange('tech_rating', val)} 
                />
                <NpsRatingStar 
                    label={t('del_rating_facility', 'Phòng chờ & Tiện ích')} 
                    value={ratingData.facility_rating} 
                    onChange={(val) => handleRatingChange('facility_rating', val)} 
                />
            </div>
            
            <div className="mb-8">
                <textarea 
                    className="w-full bg-white dark:bg-[#1c2436] border border-slate-200 dark:border-none rounded-2xl p-4 text-slate-800 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-emerald-500/40 transition-shadow min-h-[100px] resize-none" 
                    placeholder={t('del_rating_placeholder', 'Điều gì khiến quý khách chưa hài lòng 100% về dịch vụ?')}
                    value={ratingData.comment}
                    onChange={handleCommentChange}
                ></textarea>
            </div>
            
            <button 
                onClick={handleSubmit} 
                className="w-full relative group"
                disabled={isSubmitting}
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative bg-slate-900 dark:bg-black rounded-2xl py-4 flex items-center justify-center transition-colors">
                    <span className="text-white text-sm font-bold tracking-wide">
                        {isSubmitting ? t('btn_processing', 'Đang Xử Lý...') : t('del_rating_submit', 'Gửi Đánh Giá Kín')}
                    </span>
                </div>
            </button>
        </section>
    );
};

export default NpsRating;
