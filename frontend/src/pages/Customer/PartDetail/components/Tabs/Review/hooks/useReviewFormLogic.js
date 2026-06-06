import { useState } from 'react';
import { App } from 'antd';
import { useSubmitPartReviewMutation } from '../../../../../../../services/queries/clientPart.queries';
import axiosClient from '../../../../../../../utils/axiosClient';
import { reviewFormSchema } from '../schemas';
import { formatVariantString } from '../utils';
import { REVIEW_CONSTANTS } from '../constants';

export const useReviewFormLogic = (part, selectedOptions, t) => {
    const { message } = App.useApp();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    const { mutate: submitReviewFn, isPending: isSubmittingReview } = useSubmitPartReviewMutation();

    const handleRatingChange = (val) => setRating(val);
    const handleCommentChange = (e) => setComment(e.target.value);

    const handleUploadMedia = async (options) => {
        const { file, onSuccess, onError } = options;
        setUploadingMedia(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await axiosClient.post('/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.success || res.url) {
                const imageUrl = res.url || res.data?.url || res;
                setUploadedImages(prev => [...prev, imageUrl]);
                onSuccess("Ok");
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            message.error(t('upload_error', 'Tải ảnh thất bại, vui lòng thử lại!'));
            onError({ err });
        } finally {
            setUploadingMedia(false);
        }
    };

    const handleRemoveImage = (urlToRemove) => {
        setUploadedImages(prev => prev.filter(url => url !== urlToRemove));
    };

    const handleReviewSubmit = () => {
        if (!part) return;

        if (rating === 0) {
            message.warning(t('rating_required', 'Vui lòng chọn số sao đánh giá!'));
            return;
        }
        if (!comment.trim()) {
            message.warning(t('comment_required', 'Vui lòng viết bình luận trước khi gửi đánh giá!'));
            return;
        }

        const validationResult = reviewFormSchema.safeParse({ rating, comment, images: uploadedImages });

        if (!validationResult.success) {
            const firstError = validationResult.error?.issues?.[0] || validationResult.error?.errors?.[0];
            if (firstError) {
                message.warning(firstError.message);
            } else {
                message.warning(t('action_error', 'Dữ liệu không hợp lệ'));
            }
            return;
        }

        const variantString = formatVariantString(selectedOptions) || REVIEW_CONSTANTS.DEFAULT_VARIANT;

        submitReviewFn({
            part_id: part._id || part.id,
            rating,
            comment: comment.trim(),
            variant: variantString,
            images: uploadedImages,
        }, {
            onSuccess: () => {
                message.success(t('msg_review_success', 'Cảm ơn bạn! Đánh giá của bạn đã được đăng.'));
                setRating(0);
                setComment('');
                setUploadedImages([]);
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
            }
        });
    };

    return {
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
    };
};

export default useReviewFormLogic;
