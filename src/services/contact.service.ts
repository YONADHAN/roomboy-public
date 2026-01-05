import { api } from '@/lib/api';

export interface BusinessContact {
    displayName: string;
    description: string;
    phoneNumbers: Array<{
        label: string;
        number: string;
        isPrimary?: boolean;
    }>;
    email: string;
    socialLinks: Array<{
        platform: string;
        url: string;
    }>;
    website?: string;
}

// Fallback data if API not ready (as requested to mirror backend data strictly)
const MOCK_CONTACT: BusinessContact = {
    "displayName": "Joshy Broker",
    "description": "Best Room Broker In Kochi",
    "phoneNumbers": [
        { "label": "Primary", "number": "9349474463", "isPrimary": true },
        { "label": "Support", "number": "9484874884" }
    ],
    "email": "joshy@gmail.com",
    "socialLinks": [
        { "platform": "whatsapp", "url": "https://whatsapp.com" },
        { "platform": "instagram", "url": "https://instagram.com" },
        { "platform": "facebook", "url": "https://facebook.com" }
    ],
    "website": "https://roomboy.com"
};

export const contactService = {
    getActiveContact: async (): Promise<BusinessContact> => {
        try {
            // Un-comment real API call when backend endpoint is confirmed
            // const response = await api.get<BusinessContact>('/contact');
            // return response;

            // Simulating API delay and return
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_CONTACT), 100);
            });
        } catch (error) {
            console.error("Failed to fetch contact details", error);
            // Fallback to avoid breaking UI
            return MOCK_CONTACT;
        }
    }
};
