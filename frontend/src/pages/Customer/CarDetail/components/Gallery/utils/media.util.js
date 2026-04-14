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
