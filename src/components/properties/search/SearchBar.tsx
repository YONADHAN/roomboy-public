'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get('search') || '');

    const debouncedTerm = useDebounce(term, 500);

    useEffect(() => {
        // Prevent infinite loop: Only push if value differs from current URL
        const currentSearch = searchParams.get('search') || '';
        if (currentSearch === debouncedTerm) return;

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        // Reset page to 1 on new search
        currentParams.set('page', '1');

        if (debouncedTerm) {
            currentParams.set('search', debouncedTerm);
        } else {
            currentParams.delete('search');
        }
        router.push(`/properties?${currentParams.toString()}`);
    }, [debouncedTerm, router, searchParams]);

    return (
        <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-neutral-200 rounded-xl leading-5 bg-white placeholder-neutral-400 focus:outline-none focus:placeholder-neutral-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all shadow-sm"
                placeholder="Search by property name..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
        </div>
    );
}
