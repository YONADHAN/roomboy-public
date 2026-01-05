import { api } from '@/lib/api';

export interface PublicLocation {
    locationId: string;
    name: string;
    slug: string;
    city: string;
    state: string;
}

export const locationService = {
    getAll: async (): Promise<PublicLocation[]> => {
        /**
         * IMPORTANT:
         * cache: 'no-store' is REQUIRED during active content creation.
         * Otherwise Next.js will cache empty results.
         */
        return api.get<PublicLocation[]>('/locations', {
            cache: 'no-store',
        });
    },
};
