import { DUMMY_CARS, BRAND_LIST } from '../../Cars/data/cars.mock';

export const MOCK_FEATURED_CARS = DUMMY_CARS.slice(0, 4).map(car => ({
    ...car,
    subtitle: `${car.brandName} • ${car.engine} • ${car.bodyStyle}`
}));

export const MOCK_RECENT_HISTORY = DUMMY_CARS.slice(4, 8).map((car, index) => ({
    ...car,
    time: index === 0 ? 'Đã xem 2 giờ trước' : index === 1 ? 'Đã xem 5 giờ trước' : index === 2 ? 'Đã xem hôm qua' : 'Đã xem 2 ngày trước'
}));

export const MOCK_BRANDS_LIST = BRAND_LIST.map(brand => brand.name).slice(0, 6);
