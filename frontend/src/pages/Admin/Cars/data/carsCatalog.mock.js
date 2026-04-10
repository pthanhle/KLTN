import { DUMMY_CARS } from '../../../Customer/Cars/data/cars.mock';

// Extend customer mock data with Admin specific administrative fields
export const ADMIN_MOCK_CARS = DUMMY_CARS.map((car, index) => ({
    ...car,
    isDemoAvailable: index % 3 === 0, // Mock boolean
    status: index % 4 === 0 ? 'Draft' : index % 5 === 0 ? 'Archived' : 'Published'
}));
