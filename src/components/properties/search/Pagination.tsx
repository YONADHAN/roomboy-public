'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export default function Pagination({ meta }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { page, totalPages } = meta;

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set('page', newPage.toString());
        router.push(`/properties?${currentParams.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-8 py-4">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
            >
                <ChevronLeft size={20} className="text-neutral-600" />
            </button>

            <span className="text-sm font-medium text-neutral-700 px-4">
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
            >
                <ChevronRight size={20} className="text-neutral-600" />
            </button>
        </div>
    );
}
