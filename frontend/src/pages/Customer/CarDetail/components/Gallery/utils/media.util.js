export const normalizeMediaGallery = (gallery) => {
    const photos = (gallery?.photos || []).map((url, idx) => ({
        id: `photo-${idx}`,
        type: 'photo',
        url: url,
        thumbnail: url
    }));

    const videos = (gallery?.videos || []).map((vid, idx) => ({
        id: `video-${idx}`,
        type: 'video',
        url: typeof vid === 'string' ? vid : vid.url,
        thumbnail: typeof vid === 'string' ? vid : (vid.thumbnail || vid.url),
        title: typeof vid === 'string' ? `Video ${idx + 1}` : vid.title
    }));

    return { photos, videos };
};

export const getEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    try {
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('embed/')[1]?.split('?')[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch (e) {
        return '';
    }
};
