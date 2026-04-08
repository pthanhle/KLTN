import { useBrandsData } from './useBrandsData';
import { useBrandsTable } from './useBrandsTable';
import { useBrandsForm } from './useBrandsForm';

export const useBrandsLogic = (t) => {
    const { brands, isLoading, stats } = useBrandsData();

    const tableLogic = useBrandsTable(brands, t);

    const formLogic = useBrandsForm(tableLogic.messageApi, t);

    return {
        brands: tableLogic.filteredBrands,
        isLoading,
        stats,

        searchTerm: tableLogic.searchTerm,
        contextHolder: tableLogic.contextHolder,
        handleSearch: tableLogic.handleSearch,
        handleDeleteBrand: tableLogic.handleDeleteBrand,

        isModalOpen: formLogic.isModalOpen,
        editingBrand: formLogic.editingBrand,
        setIsModalOpen: formLogic.setIsModalOpen,
        handleAddBrand: formLogic.handleAddBrand,
        handleEditBrand: formLogic.handleEditBrand,
        handleSaveBrand: formLogic.handleSaveBrand
    };
};
