export const KANBAN_STATUS = {
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

export const TASK_PRIORITY = {
    URGENT: 'URGENT',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};

// Backend roles: advisor, service, sale, inventory
export const ROLE_GROUPS = {
    SALES_AND_ADVISOR: ['advisor', 'sale'],
    TECHNICIANS: ['service'],
    INVENTORY: ['inventory'],
};

export const getKanbanColumnKeys = (role) => {
    if (!role) return { todo: 'kanban_todo_tech', inProgress: 'kanban_in_progress_tech', done: 'kanban_done_tech' };

    if (role === 'sale') return { todo: 'kanban_todo_sales', inProgress: 'kanban_in_progress_sales', done: 'kanban_done_sales' };
    if (role === 'advisor') return { todo: 'kanban_todo_advisor', inProgress: 'kanban_in_progress_advisor', done: 'kanban_done_advisor' };
    if (role === 'inventory') return { todo: 'kanban_todo_inventory', inProgress: 'kanban_in_progress_inventory', done: 'kanban_done_inventory' };
    if (role === 'service') return { todo: 'kanban_todo_tech', inProgress: 'kanban_in_progress_tech', done: 'kanban_done_tech' };

    return { todo: 'kanban_todo_tech', inProgress: 'kanban_in_progress_tech', done: 'kanban_done_tech' };
};

export const CHAT_SENDER = {
    STAFF: 'staff',
    CUSTOMER: 'customer'
};
