import React from 'react';
import { useReviewSectionLogic } from './hooks/useReviewSectionLogic';
import ReviewStats from './components/ReviewStats';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

export const ReviewSection = ({ part, selectedOptions, t }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
                <ReviewStats part={part} t={t} />
            </div>

            <div className="lg:col-span-8 space-y-12">
                <ReviewForm 
                    part={part}
                    selectedOptions={selectedOptions}
                    t={t}
                />

                <ReviewList part={part} t={t} />
            </div>
        </div>
    );
};

export default ReviewSection;
