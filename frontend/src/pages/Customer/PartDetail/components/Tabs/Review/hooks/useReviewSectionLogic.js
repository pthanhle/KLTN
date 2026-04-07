import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useReviewSectionLogic = (submitReview) => {
    const { t } = useTranslation('partDetail');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const handleReviewSubmit = () => {
        if (!comment.trim()) return;
        submitReview(rating, comment);
        setComment('');
    };

    const handleRatingChange = (val) => setRating(val);
    const handleCommentChange = (e) => setComment(e.target.value);

    return {
        t,
        rating,
        comment,
        handleRatingChange,
        handleCommentChange,
        handleReviewSubmit
    };
};
