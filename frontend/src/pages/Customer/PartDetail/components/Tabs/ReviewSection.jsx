import React, { useState } from 'react';
import { Button, Input, Rate, Image } from 'antd';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

export const ReviewSection = ({ part, submitReview }) => {
    const { t } = useTranslation('parts');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleReviewSubmit = () => {
        if (!comment.trim()) return;
        submitReview(rating, comment);
        setComment('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Part A: Summary */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-32">
                    <div className="text-center mb-8">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t('lbl_avg_rating', 'Đánh giá trung bình')}</h4>
                        <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">{part.reviews_summary.average}</div>
                        <div className="flex justify-center mb-2">
                            <Rate disabled defaultValue={part.reviews_summary.average} allowHalf className="text-yellow-500" />
                        </div>
                        <p className="text-sm text-slate-500 italic">{t('lbl_based_on', 'Dựa trên')} {part.reviews_summary.total} {t('lbl_reviews', 'đánh giá')}</p>
                    </div>
                    <div className="space-y-3">
                        {part.reviews_summary.distribution.map(d => (
                            <div key={d.stars} className="flex items-center gap-4">
                                <span className="text-xs font-bold w-4 text-slate-600 dark:text-slate-400">{d.stars}</span>
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${d.percentage}%` }}></div>
                                </div>
                                <span className="text-xs text-slate-400 w-8">{d.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Part B & C: Write & Stream */}
            <div className="lg:col-span-8 space-y-12">
                {/* Write Form */}
                <div className="bg-slate-100 dark:bg-slate-900/50 p-6 sm:p-8 rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-700">
                    <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('btn_write_review', 'Viết đánh giá của bạn')}</h4>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('lbl_quality', 'Chất lượng:')}</span>
                            <Rate onChange={setRating} value={rating} className="text-yellow-500" />
                        </div>
                        <TextArea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ resize: 'none' }}
                            className="!w-full !min-h-[120px] !rounded-2xl !border-slate-200 dark:!border-slate-800 !bg-white dark:!bg-slate-900 !text-sm !p-4 !shadow-none" 
                            placeholder={t('plh_review_input', 'Bạn chia sẻ cảm nhận tại đây...')}
                        />
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                            <Button type="text" className="!flex !items-center !gap-2 !text-sm !font-bold !text-slate-600 dark:!text-slate-400 hover:!text-yellow-500 !px-0 bg-transparent">
                                <Upload className="w-5 h-5" />
                                {t('btn_upload_media', 'Tải ảnh/video')}
                            </Button>
                            <Button type="primary" onClick={handleReviewSubmit} className="!bg-slate-900 dark:!bg-yellow-500 !text-white dark:!text-black !px-8 !py-3 !h-auto !rounded-xl !font-bold border-0 hover:opacity-90 transition-all w-full sm:w-auto">
                                {t('btn_submit_review', 'Gửi đánh giá')}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stream */}
                <div className="space-y-8">
                    {part.reviews?.map(r => (
                        <div key={r.id} className="pb-8 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 p-0.5 shrink-0">
                                        <Image src={r.avatar} alt={r.user} preview={false} className="w-full h-full object-cover rounded-full" rootClassName="w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-slate-900 dark:text-white">{r.user}</h5>
                                        </div>
                                        <p className="text-xs text-slate-400">{r.date} • {t('lbl_variant', 'Phân loại')}: {r.variant}</p>
                                    </div>
                                </div>
                                <Rate disabled defaultValue={r.rating} className="text-yellow-500 text-sm" />
                            </div>
                            <p className="text-sm leading-relaxed mb-4 text-slate-700 dark:text-slate-300">{r.content}</p>
                            
                            {r.images && r.images.length > 0 && (
                                <div className="flex gap-2 mb-4 overflow-x-auto custom-scrollbar">
                                    {r.images.map((img, i) => (
                                        <Image key={i} className="w-24 h-24 object-cover rounded-xl border border-slate-200 dark:border-slate-800 transition-transform duration-300 hover:scale-105" src={img} alt="Review attachment" rootClassName="w-24 h-24 flex-shrink-0" />
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-6">
                                <Button type="text" className="!p-0 !h-auto !flex !items-center !gap-1.5 !text-xs !font-bold !text-slate-500 hover:!text-yellow-500 bg-transparent transition-colors">
                                    {t('btn_like', 'Thích')} ({r.likes})
                                </Button>
                                <Button type="text" className="!p-0 !h-auto !flex !items-center !gap-1.5 !text-xs !font-bold !text-slate-500 hover:!text-yellow-500 bg-transparent transition-colors">
                                    {t('btn_reply', 'Phản hồi')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                {part.reviews_count > part.reviews?.length && (
                    <div className="text-center pt-8">
                        <Button className="!px-10 !py-6 !h-auto !border-2 !border-slate-200 dark:!border-slate-800 !rounded-2xl !text-sm !font-bold hover:!bg-slate-100 dark:hover:!bg-slate-900 transition-colors bg-white dark:bg-transparent text-slate-900 dark:text-white">
                            {t('btn_see_all_reviews', 'Xem tất cả đánh giá')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
