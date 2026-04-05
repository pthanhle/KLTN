import { useBrandsData } from './useBrandsData';
import { useBrandsTable } from './useBrandsTable';
import { useBrandsForm } from './useBrandsForm';

export const useBrandsLogic = (t) => {
    const { brands, setBrands, isLoading, stats } = useBrandsData();
    
    // Pass brands and setBrands down
    const tableLogic = useBrandsTable(brands, setBrands, t);
    
    // Pass setBrands and messageApi from tableLogic down
    const formLogic = useBrandsForm(setBrands, tableLogic.messageApi, t);

    return {
        // Data state
        brands: tableLogic.filteredBrands,
        isLoading,
        stats,
        
        // Table/List state
        searchTerm: tableLogic.searchTerm,
        contextHolder: tableLogic.contextHolder,
        handleSearch: tableLogic.handleSearch,
        handleDeleteBrand: tableLogic.handleDeleteBrand,

        // Form state
        isModalOpen: formLogic.isModalOpen,
        editingBrand: formLogic.editingBrand,
        setIsModalOpen: formLogic.setIsModalOpen,
        handleAddBrand: formLogic.handleAddBrand,
        handleEditBrand: formLogic.handleEditBrand,
        handleSaveBrand: formLogic.handleSaveBrand
    };
};
