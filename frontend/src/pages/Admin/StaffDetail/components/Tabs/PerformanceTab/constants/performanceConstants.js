export const KANBAN_STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

export const TASK_PRIORITY = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};

export const ROLE_GROUPS = {
    SALES_AND_ADVISOR: ['SERVICE_ADVISOR', 'SALES_EXECUTIVE'],
    TECHNICIANS: ['TECHNICIAN', 'LEAD_TECHNICIAN', 'SHOP_FOREMAN']
};

export const getKanbanColumnKeys = (role) => {
    if (!role) return { todo: 'kanban_todo_tech', inProgress: 'kanban_in_progress_tech', done: 'kanban_done_tech' };

    if (role.includes('SALES')) return { todo: 'kanban_todo_sales', inProgress: 'kanban_in_progress_sales', done: 'kanban_done_sales' };
    if (role.includes('ADVISOR')) return { todo: 'kanban_todo_advisor', inProgress: 'kanban_in_progress_advisor', done: 'kanban_done_advisor' };
    if (role.includes('INVENTORY')) return { todo: 'kanban_todo_inventory', inProgress: 'kanban_in_progress_inventory', done: 'kanban_done_inventory' };
    if (role.includes('CASHIER') || role.includes('ACC')) return { todo: 'kanban_todo_cashier', inProgress: 'kanban_in_progress_cashier', done: 'kanban_done_cashier' };

    return { todo: 'kanban_todo_tech', inProgress: 'kanban_in_progress_tech', done: 'kanban_done_tech' };
};

export const CHAT_SENDER = {
    STAFF: 'staff',
    CUSTOMER: 'customer'
};
