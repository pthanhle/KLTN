import { useHomeLogic } from './hooks/useHomeLogic';
import HeroSection from './components/HeroSection';
import BrandsSection from './components/BrandsSection';
import FeaturedCars from './components/FeaturedCars';
import RecentHistory from './components/RecentHistory';
import ExclusiveServices from './components/ExclusiveServices';
import TradeInPromote from './components/TradeInPromote';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleTradeIn
    } = useHomeLogic();

    return (
        <div className="flex flex-col w-full font-sans animate-in fade-in duration-700">
            <HeroSection
                onViewCars={handleViewCars}
                onBookService={handleBookService}
            />

            <BrandsSection brands={brands} />

            <FeaturedCars cars={featuredCars} />

            <RecentHistory history={recentHistory} />

            <ExclusiveServices />

            <TradeInPromote onTradeIn={handleTradeIn} />
        </div>
    );
};

export default Home;
