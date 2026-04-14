// Mocks API call for fetching Youtube video metadata
export const apiMockFetchVideoMeta = (videoId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                title: `Youtube Source Video ${videoId}`,
                duration: '10:00', // Fake duration, real API would return real duration
                thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            });
        }, 800); // Fake network delay (800ms) to trigger skeleton UI
    });
};
