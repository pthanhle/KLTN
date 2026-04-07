import * as z from 'zod';

export const reviewFormSchema = z.object({
    rating: z.number().min(1, { message: 'Vui lòng chọn số sao đánh giá' }).max(5),
    comment: z.string().min(3, { message: 'Bình luận phải có ít nhất 3 ký tự' }).max(1000, { message: 'Bình luận không được vượt quá 1000 ký tự' }),
    images: z.array(z.string().url()).max(5, { message: 'Chỉ được tải lên tối đa 5 ảnh' }),
});

export const replyFormSchema = z.object({
    content: z.string().min(1, { message: 'Vui lòng nhập nội dung phản hồi' }).max(500, { message: 'Phản hồi không được vượt quá 500 ký tự' })
});
