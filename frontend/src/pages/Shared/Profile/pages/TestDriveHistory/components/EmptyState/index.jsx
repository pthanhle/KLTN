import EmptyStateHero from './EmptyStateHero';
import FeatureCards from './FeatureCards';

const EmptyState = ({ t }) => {
    return (
        <div className="flex flex-col gap-8 w-full animate-in fade-in zoom-in-[0.98] duration-700">
            <EmptyStateHero t={t} />
            <FeatureCards t={t} />
        </div>
    );
};

export default EmptyState;
