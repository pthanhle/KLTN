import { useCategoriesData } from './useCategoriesData';
import { useCategoriesTable } from './useCategoriesTable.jsx';

export const useCategoriesLogic = (t) => {
    const dataLogic = useCategoriesData();
    const tableLogic = useCategoriesTable(dataLogic.categories, dataLogic.reloadCategories, t);


    return {
        categories: tableLogic.filteredCategories,
        isLoading: dataLogic.isLoading,
        stats: dataLogic.stats,
        reloadCategories: dataLogic.reloadCategories,

        searchTerm: tableLogic.searchTerm,
        contextHolder: tableLogic.contextHolder,
        handleSearch: tableLogic.handleSearch,
        handleDeleteCategory: tableLogic.handleDeleteCategory,
    };
};
