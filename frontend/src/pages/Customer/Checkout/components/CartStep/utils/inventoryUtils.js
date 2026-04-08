export const calculateStockStatus = (item) => {
    const totalStock = item.inventory 
        ? ((item.inventory.showroom || 0) + (item.inventory.warehouse || 0)) 
        : (item.stock || 0);

    return {
        totalStock,
        isOutOfStock: totalStock === 0,
        isLowStock: totalStock > 0 && totalStock <= 5
    };
};
