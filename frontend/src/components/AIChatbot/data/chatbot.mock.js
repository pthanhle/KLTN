import { MOCK_PROFILE_CUSTOMER } from '@/pages/Shared/Profile/data/profile.mock';

export const mockQuickActions = [
    { id: 1, labelKey: 'quick_action_pricing' },
    { id: 2, labelKey: 'quick_action_booking' },
    { id: 3, labelKey: 'quick_action_consult' },
    { id: 4, labelKey: 'quick_action_sales' }
];

export const mapCustomerToChatbotProfile = (customer) => {
    return {
        name: customer?.full_name || "Guest",
        avatar: customer?.avatar || "",
        planKey: customer?.role?.role_name === "Customer" ? "plan_standard" : "plan_premium" 
    };
};

export const mockUserProfile = mapCustomerToChatbotProfile(MOCK_PROFILE_CUSTOMER);
