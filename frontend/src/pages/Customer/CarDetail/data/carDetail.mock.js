// Global colors are now natively inside DUMMY_CARS

import { DUMMY_CARS } from '../../Cars/data/cars.mock';

export const getMockCarDetail = (id) => {
    const baseCar = DUMMY_CARS.find(c => String(c.id) === String(id)) || DUMMY_CARS[0];
    
    return {
        ...baseCar,
        // Override or append detail-specific properties if any:
        stock: baseCar.stock || 1,
        isDemoAvailable: String(id) !== '2' // Fake out of demo stock for Car ID 2
    };
};
