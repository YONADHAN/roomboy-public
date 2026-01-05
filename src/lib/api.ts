
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1/public';

interface ApiRequestOptions extends RequestInit {
    timeout?: number;
    next?: any;
}

export class ApiError extends Error {
    public status: number;
    public statusText: string;

    constructor(message: string, status: number, statusText: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
    }
}

async function fetchWithTimeout(resource: string, options: ApiRequestOptions = {}): Promise<Response> {
    const { timeout = 8000, ...fetchOptions } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${API_BASE_URL}${resource}`, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions.headers,
            },
        });
        return response;
    } finally {
        clearTimeout(id);
    }
}

export const api = {
    get: async <T>(endpoint: string, options?: ApiRequestOptions): Promise<T> => {
        const response = await fetchWithTimeout(endpoint, { ...options, method: 'GET' });

        if (!response.ok) {
            let errorMessage = 'An error occurred';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || response.statusText;
            } catch {
                errorMessage = response.statusText;
            }
            throw new ApiError(errorMessage, response.status, response.statusText);
        }

        return response.json();
    },
};
