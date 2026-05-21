import { useCategoriesData } from './useCategoriesData';
import { useCategoriesTable } from './useCategoriesTable.jsx';

export const useCategoriesLogic = (t) => {
    const dataLogic = useCategoriesData();
    const tableLogic = useCategoriesTable(dataLogic.categories, dataLogic.reloadCategories, t);

    // TODO: Add Modal Form Logic later

    return {
        // Data state
        categories: tableLogic.filteredCategories,
        isLoading: dataLogic.isLoading,
        stats: dataLogic.stats,
        reloadCategories: dataLogic.reloadCategories,
        
        // Table/List state
        searchTerm: tableLogic.searchTerm,
        contextHolder: tableLogic.contextHolder,
        handleSearch: tableLogic.handleSearch,
        handleDeleteCategory: tableLogic.handleDeleteCategory,
    };
};
