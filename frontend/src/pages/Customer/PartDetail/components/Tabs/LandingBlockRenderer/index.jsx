import React from 'react';
import HeroBlock from './components/Blocks/HeroBlock';
import TextBlock from './components/Blocks/TextBlock';
import FeatureGridBlock from './components/Blocks/FeatureGridBlock';
import GalleryBlock from './components/Blocks/GalleryBlock';
import VideoBlock from './components/Blocks/VideoBlock';

const LandingBlockRenderer = ({ blocks, t }) => {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
        return <div className="text-slate-500 italic py-8 text-center">{t('parts:landing_empty', 'Nội dung đang được cập nhật...')}</div>;
    }

    return (
        <div className="space-y-12">
            {blocks.map((block, index) => {
                const key = block.id || `landing-block-${index}`;
                
                if (block.type === 'hero') {
                    return <HeroBlock key={key} block={block} t={t} />;
                }

                if (block.type === 'text') {
                    return <TextBlock key={key} block={block} t={t} />;
                }

                if (block.type === 'feature_grid') {
                    return <FeatureGridBlock key={key} block={block} t={t} />;
                }

                if (block.type === 'gallery') {
                    return <GalleryBlock key={key} block={block} t={t} />;
                }

                if (block.type === 'video') {
                    return <VideoBlock key={key} block={block} t={t} />;
                }

                return null;
            })}
        </div>
    );
};

export default LandingBlockRenderer;
