import { useState } from 'react';

export const useNpsRatingLogic = (initialData) => {
    const [ratingData, setRatingData] = useState({
        advisor_rating: initialData?.advisor_rating || 0,
        tech_rating: initialData?.tech_rating || 0,
        facility_rating: initialData?.facility_rating || 0,
        comment: initialData?.comment || ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(initialData?.is_submitted || false);

    const handleRatingChange = (field, value) => {
        setRatingData(prev => ({ ...prev, [field]: value }));
    };

    const handleCommentChange = (e) => {
        setRatingData(prev => ({ ...prev, comment: e.target.value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(res => setTimeout(res, 600));
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    return {
        ratingData,
        isSubmitting,
        isSubmitted,
        handleRatingChange,
        handleCommentChange,
        handleSubmit
    };
};
