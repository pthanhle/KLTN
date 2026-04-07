import React from 'react';
import { Button, Rate, Image, Input } from 'antd';
import { useSelector } from 'react-redux';
import { Trash2, Send } from 'lucide-react';
import { useReviewActions } from '../hooks/useReviewActions';

export const ReviewList = ({ part, t }) => {
    const { 
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
    } = useReviewActions(t);

    const currentUser = useSelector((state) => state.auth.user);

    return (
        <div className="space-y-8">
            {part.reviews?.map(r => (
                <div key={r.id} className="pb-8 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-4 relative group">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 p-0.5 shrink-0">
                                <Image src={r.avatar} alt={r.user} preview={false} className="w-full h-full object-cover rounded-full" rootClassName="w-full h-full" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h5 className="font-bold text-slate-900 dark:text-white">
                                        {r.user === 'Khách Hàng' ? t('lbl_default_user', 'Khách Hàng') : r.user}
                                    </h5>
                                </div>
                                <p className="text-xs text-slate-400">{r.date} • {t('lbl_variant', 'Phân loại')}: {r.variant}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Rate disabled defaultValue={r.rating} className="text-yellow-500 text-sm" />
                            {currentUser?._id === r.user_id && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 -mt-1 -mr-2 bg-white dark:bg-slate-950 p-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                                    <Button 
                                        type="text" 
                                        size="small" 
                                        onClick={() => confirmDeleteReview(r._id || r.id)}
                                        className="!w-6 !h-6 !p-0 !min-w-0 !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 !flex items-center justify-center rounded-full"
                                        title={t('btn_delete', 'Xóa')}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-4 text-slate-700 dark:text-slate-300">{r.content}</p>
                    
                    {r.images && r.images.length > 0 && (
                        <div className="flex gap-3 mb-4 overflow-x-auto custom-scrollbar">
                            {r.images.map((img, i) => (
                                <Image 
                                    key={i} 
                                    width={96} 
                                    height={96} 
                                    src={img} 
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-xl border border-slate-200 dark:border-slate-800 transition-transform duration-300 hover:scale-105" 
                                    alt="Review attachment" 
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-6">
                        <Button 
                            type="text" 
                            className={`!p-0 !h-auto !flex !items-center !gap-1.5 !text-xs !font-bold hover:!text-yellow-500 bg-transparent transition-colors ${localLikes[r.id]?.liked ? '!text-yellow-500' : '!text-slate-500'}`}
                            onClick={() => handleLike(r._id || r.id, r.likes)}
                        >
                            {t('btn_like', 'Thích')} ({localLikes[r._id || r.id]?.count ?? r.likes ?? 0})
                        </Button>
                        <Button 
                            type="text" 
                            onClick={() => toggleReplyBox(r.id || r._id)}
                            className="!p-0 !h-auto !flex !items-center !gap-1.5 !text-xs !font-bold !text-slate-500 hover:!text-yellow-500 bg-transparent transition-colors"
                        >
                            {t('btn_reply', 'Phản hồi')} {r.replies?.length > 0 ? `(${r.replies.length})` : ''}
                        </Button>
                    </div>

                    {/* Reply Input Box */}
                    {activeReplyId === (r.id || r._id) && (
                        <div className="mt-6 mb-2 pl-4 sm:pl-12 flex gap-3 animate-[fadeIn_0.3s_ease-out]">
                            {/* Dynamically assigned user avatar */}
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center text-slate-500 font-bold text-[10px] uppercase shadow-sm">
                                {currentUser?.avatar ? (
                                    <Image src={currentUser.avatar} alt={currentUser.full_name || t('lbl_you', 'Bạn')} preview={false} className="w-full h-full object-cover" rootClassName="w-full h-full" />
                                ) : (
                                    currentUser?.full_name ? currentUser.full_name.charAt(0).toUpperCase() : t('lbl_you', 'Bạn')
                                )}
                            </div>
                            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-1.5 shadow-sm focus-within:ring-4 focus-within:ring-yellow-500/10 focus-within:border-yellow-500 transition-all duration-300">
                                <Input.TextArea
                                    value={replyContent}
                                    onChange={handleReplyChange}
                                    placeholder={t('plh_reply', 'Viết phản hồi của bạn...')}
                                    autoSize={{ minRows: 2, maxRows: 5 }}
                                    className="!border-0 !shadow-none !bg-transparent focus:!ring-0 resize-none !px-4 !py-3 !text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
                                />
                                <div className="flex justify-between items-center px-2 py-1.5 border-t border-slate-100 dark:border-slate-800/50 mt-1">
                                    <div className="text-[10px] text-slate-400 font-medium pl-2">
                                        Trả lời với tư cách <span className="font-bold text-slate-700 dark:text-slate-300">{currentUser?.full_name || t('lbl_you', 'Bạn')}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            type="text" 
                                            onClick={() => toggleReplyBox(r.id || r._id)} 
                                            className="!rounded-2xl !px-4 !h-9 hover:!bg-slate-100 dark:hover:!bg-slate-800 !text-slate-500 hover:!text-slate-700 dark:hover:!text-slate-300 font-bold transition-all flex items-center gap-1.5 group/cancel"
                                        >
                                            {t('btn_cancel', 'Hủy')}
                                        </Button>
                                        <Button 
                                            type="primary" 
                                            loading={isReplying}
                                            onClick={() => submitReply(r.id || r._id)} 
                                            disabled={!replyContent.trim()}
                                            className="!rounded-2xl !px-6 !h-9 !bg-slate-900 dark:!bg-yellow-500 !text-white dark:!text-black border-0 font-bold shadow-lg shadow-slate-900/20 dark:shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 group/send"
                                        >
                                            {t('btn_send', 'Gửi')}
                                            <Send className="w-3.5 h-3.5 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Admin/User Replies Rendering */}
                    {r.replies && r.replies.length > 0 && (
                        <div className="mt-4 pl-4 sm:pl-10 border-l-2 border-slate-100 dark:border-slate-800 space-y-4">
                            {r.replies.map((reply, revIdx) => {
                                const isAdmin = reply.role === 'admin' || reply.role === 'staff';
                                const isOwner = currentUser?._id === reply.user_id;

                                return (
                                    <div key={revIdx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-[1.5rem] relative group border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center font-bold text-[10px] ${isAdmin ? 'border-[1.5px] border-yellow-500 bg-yellow-500 text-black shadow-sm' : 'border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                                                    {reply.avatar ? (
                                                        <Image src={reply.avatar} alt={reply.user} preview={false} className="w-full h-full object-cover" rootClassName="w-full h-full" />
                                                    ) : (
                                                        reply.user ? reply.user.charAt(0).toUpperCase() : 'U'
                                                    )}
                                                </div>
                                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                                    {reply.user === 'Khách Hàng' ? t('lbl_default_user', 'Khách Hàng') : reply.user}
                                                </span>
                                                {isAdmin && (
                                                    <span className="text-[10px] text-slate-400 border bg-white dark:bg-slate-800 px-1.5 rounded uppercase font-bold tracking-wider shadow-sm">
                                                        {t('lbl_admin_role', 'Quản trị viên')}
                                                    </span>
                                                )}
                                            </div>
                                            {isOwner && (
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 -mt-2 -mr-2 bg-slate-50 dark:bg-slate-900/50 p-1 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:z-10">
                                                    <Button 
                                                        type="text" 
                                                        size="small" 
                                                        onClick={() => confirmDeleteReply(r._id || r.id, reply._id)}
                                                        className="!w-5 !h-5 !p-0 !min-w-0 !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 !flex items-center justify-center rounded-full"
                                                        title={t('btn_delete', 'Xóa')}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 relative pl-8">
                                            {reply.content}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
            
            {part.reviews_count > part.reviews?.length && (
                <div className="text-center pt-8">
                    <Button className="!px-10 !py-6 !h-auto !border-2 !border-slate-200 dark:!border-slate-800 !rounded-2xl !text-sm !font-bold hover:!bg-slate-100 dark:hover:!bg-slate-900 transition-colors bg-white dark:bg-transparent text-slate-900 dark:text-white">
                        {t('btn_see_all_reviews', 'Xem tất cả đánh giá')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewList;
