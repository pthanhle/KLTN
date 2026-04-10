import GeneralInfoCard from './components/GeneralInfoCard';
import SeoShortcutCard from './components/SeoShortcutCard';
import ClassificationCard from './components/ClassificationCard';
import StatusCard from './components/StatusCard';
import CoverPreviewCard from './components/CoverPreviewCard';

const OverviewTab = () => {
    return (
        <div className="w-full pb-20">
            {/* Form Container */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-10 items-start">
                
                {/* Left Column: Core Info */}
                <div className="xl:col-span-2 space-y-8">
                    <GeneralInfoCard />
                    <SeoShortcutCard />
                </div>

                {/* Right Column: Classification & Status */}
                <div className="space-y-6">
                    <ClassificationCard />
                    <StatusCard />
                    <CoverPreviewCard />
                </div>
                
            </div>
        </div>
    );
};

export default OverviewTab;
