export const calculateContractStats = (contracts = []) => {
    return {
        total: contracts.length,
        pending: contracts.filter(c => c.status === 'draft' || c.status === 'contract_pending').length,
        completed: contracts.filter(c => c.status === 'paid' || c.status === 'delivered').length,
        totalRevenue: contracts.filter(c => c.status === 'paid' || c.status === 'delivered')
            .reduce((sum, c) => sum + (c.pricing_snapshot?.grand_total || 0), 0)
    };
};
