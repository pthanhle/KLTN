export const calculateStockStatus = (item) => {
    const totalStock = item.inventory?.available_stock || 0;

    return {
        totalStock,
        isOutOfStock: totalStock <= 0,
        isLowStock: totalStock > 0 && totalStock <= 5
    };
};
