import { useHomeLogic } from './hooks/useHomeLogic';
import HeroSection from './components/Sections/HeroSection';
import BrandsSection from './components/Sections/BrandsSection';
import FeaturedCars from './components/Sections/FeaturedCars';
import RecentHistory from './components/Sections/RecentHistory';
import ExclusiveServices from './components/Sections/ExclusiveServices';
import TradeInPromote from './components/Sections/TradeInPromote';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleViewCarDetail,
        handleTradeIn,
        handleViewBrand,
        isLoading
    } = useHomeLogic();

    return (
        <div className="flex flex-col w-full font-sans animate-in fade-in duration-700">
            <HeroSection
                onViewCars={handleViewCars}
                onBookService={handleBookService}
            />

            <BrandsSection brands={brands} onBrandClick={handleViewBrand} isLoading={isLoading} />

            <FeaturedCars 
                cars={featuredCars} 
                isLoading={isLoading} 
                onCarClick={handleViewCarDetail} 
            />

            <RecentHistory 
                history={recentHistory} 
                isLoading={isLoading} 
                onCarClick={handleViewCarDetail} 
            />

            <ExclusiveServices />

            <TradeInPromote onTradeIn={handleTradeIn} />
        </div>
    );
};

export default Home;
