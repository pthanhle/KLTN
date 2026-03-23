import { useQuery, useMutation } from '@tanstack/react-query';
import { ContactAPI } from '../api/contact';

// Query: Fetch System Settings for Contact Page
export const useGetSystemSettings = (options = {}) => {
    return useQuery({
        queryKey: ['systemSettings', 'contact'],
        queryFn: () => ContactAPI.getContactConfig(),
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

// Mutation: Handle Form Submission
export const useSubmitContact = () => {
    return useMutation({
        mutationFn: (payload) => ContactAPI.submitContact(payload),
        onError: (error) => {
            console.error('[Mutation Error - Contact]:', error);
        }
    });
};
