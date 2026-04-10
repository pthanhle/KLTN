import { useState, useEffect } from 'react';
import { BODY_STYLES } from '../../../Customer/Cars/data/cars.mock';

export const useDynamicTaxonomies = () => {
    const [brands, setBrands] = useState([]);
    const [bodyStyles, setBodyStyles] = useState([]);
    const [isLoadingTaxonomies, setIsLoadingTaxonomies] = useState(true);

    useEffect(() => {
        // Simulate fetching dynamic taxonomies from BE
        const fetchTaxonomies = async () => {
            setIsLoadingTaxonomies(true);
            setTimeout(() => {
                setBrands([
                    { value: 'Porsche', label: 'Porsche' },
                    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
                    { value: 'BMW', label: 'BMW' },
                    { value: 'Audi', label: 'Audi' },
                    { value: 'Lexus', label: 'Lexus' }
                ]);
                // We map from Customer's mocked BODY_STYLES
                setBodyStyles(
                    BODY_STYLES.filter(b => b.value !== 'Tất cả')
                );
                setIsLoadingTaxonomies(false);
            }, 500);
        };

        fetchTaxonomies();
    }, []);

    const addBrandConfig = (newBrand) => {
        const formattedBrand = { value: newBrand.name, label: newBrand.name };
        setBrands(prev => [...prev, formattedBrand]);
    };

    const addBodyStyleConfig = (newBodyStyle) => {
        const formattedStyle = { value: newBodyStyle.name, label: newBodyStyle.name };
        setBodyStyles(prev => [...prev, formattedStyle]);
    };

    return { brands, bodyStyles, isLoadingTaxonomies, addBrandConfig, addBodyStyleConfig };
};
