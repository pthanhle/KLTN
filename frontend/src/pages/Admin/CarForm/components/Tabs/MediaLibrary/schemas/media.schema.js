export const getMediaRules = (t) => ({
    videoUrl: [
        { required: true, message: t('val_videoUrlRequired', 'Vui lòng nhập URL YouTube') },
        { 
            pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, 
            message: t('val_videoUrlInvalid', 'URL YouTube không hợp lệ') 
        }
    ]
});
