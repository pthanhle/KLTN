import { useTestDriveLogic } from './hooks/useTestDriveLogic';
import { PageLoader } from '@/components/ui/page-loader';
import CarSummary from './components/CarSummary';
import BookingForm from './components/BookingForm';

const TestDriveBookingPage = () => {
    const hookState = useTestDriveLogic();
    const { car } = hookState;

    if (!car) return <PageLoader />;

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b] py-16 px-4 flex items-center justify-center transition-colors">
            <div className="w-full max-w-[1240px] bg-white dark:bg-[#141416] rounded-[32px] md:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:md:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col md:flex-row">
                <CarSummary car={car} />
                <BookingForm hookState={hookState} />
            </div>
        </div>
    );
};

export default TestDriveBookingPage;
