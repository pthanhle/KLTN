import { useState } from 'react';
import { useLikePartReviewMutation, useReplyPartReviewMutation, useDeletePartReviewReplyMutation, useDeletePartReviewMutation } from '../../../../../../../services/queries/clientPart.queries';
import { useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { replyFormSchema } from '../schemas';

export const useReviewActions = (t) => {
    const { message, modal } = App.useApp();
    const [localLikes, setLocalLikes] = useState({});
    const { mutate: likeReviewFn } = useLikePartReviewMutation();
    const { mutate: replyReviewFn, isPending: isReplying } = useReplyPartReviewMutation();
    const { mutate: deleteReplyFn } = useDeletePartReviewReplyMutation();
    const { mutate: deleteReviewFn } = useDeletePartReviewMutation();
    const queryClient = useQueryClient();

    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const handleLike = (reviewId, currentLikes) => {
        const isCurrentlyLiked = localLikes[reviewId]?.liked;
        const currentLocalCount = localLikes[reviewId]?.count ?? currentLikes ?? 0;

        setLocalLikes(prev => ({
            ...prev,
            [reviewId]: {
                liked: !isCurrentlyLiked,
                count: isCurrentlyLiked ? Math.max(0, currentLocalCount - 1) : currentLocalCount + 1
            }
        }));

        likeReviewFn(reviewId, {
            onError: () => {
                setLocalLikes(prev => ({
                    ...prev,
                    [reviewId]: {
                        liked: isCurrentlyLiked,
                        count: currentLocalCount
                    }
                }));
            }
        });
    };

    const toggleReplyBox = (id) => {
        if (activeReplyId === id) {
            setActiveReplyId(null);
        } else {
            setActiveReplyId(id);
            setReplyContent('');
        }
    };

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const submitReply = (reviewId, callback) => {
        const validationResult = replyFormSchema.safeParse({ content: replyContent });
        
        if (!validationResult.success) {
            message.warning(validationResult.error.errors[0].message);
            return;
        }

        replyReviewFn({ reviewId, content: replyContent }, {
            onSuccess: () => {
                message.success(t('reply_success', 'Đã thêm phản hồi thành công!'));
                setActiveReplyId(null);
                setReplyContent('');
                queryClient.invalidateQueries(['clientPart']); // Refresh UI
                if (callback) callback();
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Gặp lỗi khi gửi phản hồi, vui lòng thử lại!'));
            }
        });
    };

    const confirmDeleteReply = (reviewId, replyId, callback) => {
        modal.confirm({
            title: t('lbl_delete_reply_title', 'Xóa phản hồi'),
            content: t('msg_confirm_delete_reply', 'Bạn có chắc chắn muốn xóa phản hồi này?'),
            okText: t('btn_delete', 'Xóa'),
            okType: 'danger',
            cancelText: t('btn_cancel', 'Hủy'),
            centered: true,
            maskClosable: true,
            onOk: () => {
                deleteReplyFn({ reviewId, replyId }, {
                    onSuccess: () => {
                        message.success(t('reply_delete_success', 'Đã xóa phản hồi thành công!'));
                        queryClient.invalidateQueries(['clientPart']);
                        if (callback) callback();
                    },
                    onError: (err) => {
                        message.error(err.response?.data?.message || t('action_error', 'Gặp lỗi khi xóa phản hồi, vui lòng thử lại!'));
                    }
                });
            }
        });
    };

    const confirmDeleteReview = (reviewId, callback) => {
        modal.confirm({
            title: t('lbl_delete_review_title', 'Xóa đánh giá'),
            content: t('msg_confirm_delete_review', 'Bạn có chắc chắn muốn xóa đánh giá này?'),
            okText: t('btn_delete', 'Xóa'),
            okType: 'danger',
            cancelText: t('btn_cancel', 'Hủy'),
            centered: true,
            maskClosable: true,
            onOk: () => {
                deleteReviewFn(reviewId, {
                    onSuccess: () => {
                        message.success(t('review_delete_success', 'Đã xóa đánh giá thành công!'));
                        queryClient.invalidateQueries(['clientPart']);
                        if (callback) callback();
                    },
                    onError: (err) => {
                        message.error(err.response?.data?.message || t('action_error', 'Gặp lỗi khi xóa đánh giá, vui lòng thử lại!'));
                    }
                });
            }
        });
    };

    return {
        localLikes,
        handleLike,
        activeReplyId,
        replyContent,
        isReplying,
        toggleReplyBox,
        handleReplyChange,
        submitReply,
        confirmDeleteReply,
        confirmDeleteReview
    };
};

export default useReviewActions;
