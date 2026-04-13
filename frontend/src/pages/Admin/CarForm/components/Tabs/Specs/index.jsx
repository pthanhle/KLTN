import CoreSpecsCard from './components/CoreSpecsCard';
import AdvancedSpecsMatrix from './components/AdvancedSpecsMatrix';

const SpecsTab = () => {
    return (
        <div className="w-full pb-20 max-w-[1400px] mx-auto space-y-10">
            <CoreSpecsCard />
            <AdvancedSpecsMatrix />
        </div>
    );
};

export default SpecsTab;
