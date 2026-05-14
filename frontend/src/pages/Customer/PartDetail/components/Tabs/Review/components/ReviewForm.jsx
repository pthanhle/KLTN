import React from 'react';
import { Button, Input, Rate, Upload, Image, Tooltip, Spin } from 'antd';
import { Upload as UploadIcon, X } from 'lucide-react';
import useReviewFormLogic from '../hooks/useReviewFormLogic';
import { REVIEW_CONSTANTS } from '../constants';

const { TextArea } = Input;

export const ReviewForm = ({ part, selectedOptions, t }) => {
    const {
        rating,
        comment,
        uploadedImages,
        uploadingMedia,
        isSubmittingReview,
        handleRatingChange,
        handleCommentChange,
        handleUploadMedia,
        handleRemoveImage,
        handleReviewSubmit
    } = useReviewFormLogic(part, selectedOptions, t);

    return (
        <div className="bg-slate-50 dark:bg-[#0a0a0b] p-6 sm:p-8 rounded-[2rem] border border-dashed border-slate-300 dark:border-white/10">
            <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('btn_write_review', 'Viết đánh giá của bạn')}</h4>
            <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('lbl_quality', 'Chất lượng:')}</span>
                    <Rate onChange={handleRatingChange} value={rating} className="text-yellow-500" />
                </div>
                
                <TextArea 
                    value={comment}
                    onChange={handleCommentChange}
                    style={{ resize: 'none' }}
                    className="!w-full !min-h-[120px] !rounded-2xl !border-slate-200 dark:!border-white/10 !bg-white dark:!bg-[#141416] !text-slate-900 dark:!text-white !text-sm !p-4 !shadow-none" 
                    placeholder={t('plh_review_input', 'Bạn chia sẻ cảm nhận tại đây...')}
                />

                {/* Uploaded Thumbnails Preview */}
                {uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {uploadedImages.map((url, idx) => (
                            <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                                <Image src={url} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                                <button 
                                    onClick={() => handleRemoveImage(url)}
                                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                    <Upload 
                        customRequest={handleUploadMedia} 
                        showUploadList={false}
                        accept="image/*,video/*"
                        multiple={false}
                        disabled={uploadingMedia || isSubmittingReview || uploadedImages.length >= 5}
                    >
                        <Tooltip title={uploadedImages.length >= 5 ? 'Tối đa 5 ảnh' : ''}>
                            <Button disabled={uploadingMedia || uploadedImages.length >= 5} type="text" className="!flex !items-center !gap-2 !text-sm !font-bold !text-slate-600 dark:!text-slate-400 hover:!text-yellow-500 !px-0 bg-transparent">
                                {uploadingMedia ? <Spin size="small" /> : <UploadIcon className="w-5 h-5" />}
                                {t('btn_upload_media', 'Tải ảnh/video')}
                            </Button>
                        </Tooltip>
                    </Upload>
                    <Button type="primary" loading={isSubmittingReview} onClick={handleReviewSubmit} className="!bg-slate-900 dark:!bg-yellow-500 !text-white dark:!text-black !px-8 !py-3 !h-auto !rounded-xl !font-bold border-0 hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20 dark:shadow-yellow-500/20 transition-all w-full sm:w-auto">
                        {t('btn_submit_review', 'Gửi đánh giá')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
