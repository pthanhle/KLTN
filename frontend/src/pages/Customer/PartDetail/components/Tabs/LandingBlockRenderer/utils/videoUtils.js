/**
 * Phân tích và chuyển đổi Link Video sang định dạng Embed iframe
 * @param {string} url - Link YouTube hoặc Vimeo raw
 * @returns {string} - Link embed đã qua xử lý
 */
export const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    
    try {
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1];
        }
        
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
    } catch (e) {
        return '';
    }
};
