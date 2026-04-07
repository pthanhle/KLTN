import React from 'react';
import { Rate } from 'antd';

export const ReviewStats = ({ part, t }) => {
    const avgRating = part?.reviews_summary?.average || part?.rating || 0;
    const revCount = part?.reviews_summary?.total || part?.reviews_count || part?.reviews?.length || 0;

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-32">
            <div className="text-center mb-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t('lbl_avg_rating', 'Đánh giá trung bình')}</h4>
                <div className="text-6xl font-black text-slate-900 dark:text-white mb-2">{avgRating}</div>
                <div className="flex justify-center mb-2">
                    <Rate disabled value={avgRating} allowHalf className="text-yellow-500" />
                </div>
                <p className="text-sm text-slate-500 italic">{t('lbl_based_on', 'Dựa trên')} {revCount} {t('lbl_reviews', 'đánh giá')}</p>
            </div>
            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(stars => {
                    const dist = part?.reviews_summary?.distribution;
                    let percentage = 0;
                    if (Array.isArray(dist)) {
                        const item = dist.find(d => d.stars === stars || d.stars === String(stars));
                        percentage = item ? item.percentage : 0;
                    } else if (dist && typeof dist === 'object') {
                        percentage = dist[stars] || 0;
                    }

                    return (
                        <div key={stars} className="flex items-center gap-4">
                            <span className="text-xs font-bold w-4 text-slate-600 dark:text-slate-400">{stars}</span>
                            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-400 w-8">{percentage}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewStats;
