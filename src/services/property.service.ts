import { api } from '@/lib/api';

// Public-safe property interface
export interface PublicProperty {
    _id: string;
    propertyId: string; // Used as the URL identifier
    title: string;
    price: number;
    location: {
        address: string;
        city: string;
    };
    mainImage: string;
    images?: string[]; // Optional array of additional images
    category: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    attributes: Record<string, any>; // Dynamic backend attributes
}

export interface FieldDefinition {
    _id: string;
    fieldKey: string;
    label: string;
    dataType: 'string' | 'number' | 'boolean' | 'select' | 'multi-select';
    options?: string[];
}

export const propertyService = {
    /**
     * Fetch field definitions for filters
     */
    getFieldDefinitions: async (entityType: string = 'property'): Promise<FieldDefinition[]> => {
        return api.get<FieldDefinition[]>(`/field-definitions?entityType=${entityType}`, {
            cache: 'force-cache'
        });
    },
    /**
     * Fetch public properties (optionally filtered by query params)
     * cache: 'no-store' ensures newly created properties show immediately
     */
    getPublicProperties: async (
        searchParams?: Record<string, string | string[] | undefined>
    ): Promise<{ data: PublicProperty[]; meta: any }> => {
        const params = new URLSearchParams();

        if (searchParams) {
            Object.entries(searchParams).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else {
                    params.append(key, value);
                }
            });
        }

        const queryString = params.toString() ? `?${params.toString()}` : '';

        const response = await api.get<{ data: PublicProperty[]; meta: any }>(`/properties${queryString}`, {
            cache: 'no-store',
        });
        return response; // Return the full object { data, meta }
    },

    /**
     * Fetch a single property by ID (mapped to 'slug' in URL)
     */
    getPropertyById: async (propertyId: string): Promise<PublicProperty> => {
        // The backend endpoint /properties/slug/:slug handles propertyId lookup as well
        return api.get<PublicProperty>(`/properties/slug/${propertyId}`, {
            cache: 'no-store',
        });
    },
};
