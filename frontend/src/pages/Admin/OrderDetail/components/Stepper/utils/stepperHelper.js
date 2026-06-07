export const getStepStatus = (orderStatus, index) => {
    let isCompleted = false;
    let isCurrent = false;

    switch (orderStatus) {
        case 'PENDING':
            isCompleted = index < 1;
            isCurrent = index === 1;
            break;
        case 'CONFIRMED':
            isCompleted = index < 2;
            isCurrent = index === 2;
            break;
        case 'PROCESSING': // packed — nhân viên đang/đã đóng gói
            isCompleted = index < 3;
            isCurrent = index === 3;
            break;
        case 'PACKED':
            isCompleted = index < 3;
            isCurrent = index === 3;
            break;
        case 'SHIPPED': // đang giao hàng
        case 'SHIPPING':
            isCompleted = index < 4;
            isCurrent = index === 4;
            break;
        case 'DELIVERED':
        case 'COMPLETED':
            isCompleted = index <= 5;
            isCurrent = false;
            break;
        default:
            break;
    }

    return { isCompleted, isCurrent };
};

export const getActiveColorClass = (idx) => {
    switch (idx) {
        case 1: return 'text-yellow-600 dark:text-yellow-500';
        case 2: return 'text-blue-600 dark:text-blue-500';
        case 3: return 'text-indigo-600 dark:text-indigo-500';
        case 4: return 'text-orange-600 dark:text-orange-500';
        default: return 'text-slate-600 dark:text-slate-500';
    }
};
