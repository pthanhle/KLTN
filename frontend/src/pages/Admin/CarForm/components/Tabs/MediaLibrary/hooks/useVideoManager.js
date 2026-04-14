import { useState } from 'react';
import { useMediaLibrary } from './useMediaLibrary';
import { getYoutubeVideoId } from '../utils/media.utils';
import { apiMockFetchVideoMeta } from '../data/media.data';

export const useVideoManager = () => {
    const { handleAddVideo, handleRemoveVideo } = useMediaLibrary();
    const [isLoading, setIsLoading] = useState(false);

    const onAddVideoSubmit = async (values, resetFormFields) => {
        setIsLoading(true);
        const { videoUrl } = values;
        const videoId = getYoutubeVideoId(videoUrl);
        
        if (!videoId) {
            setIsLoading(false);
            return;
        }

        try {
            // Mock fetching data from API (replaces hardcoding layout data)
            const videoMeta = await apiMockFetchVideoMeta(videoId);
            handleAddVideo({
                url: videoUrl,
                title: videoMeta.title,
                duration: videoMeta.duration,
                thumbnail: videoMeta.thumbnail
            });
            resetFormFields(); // clear input
        } catch (error) {
            console.error("Failed to fetch video config", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        onAddVideoSubmit,
        onRemoveVideo: handleRemoveVideo
    };
};
