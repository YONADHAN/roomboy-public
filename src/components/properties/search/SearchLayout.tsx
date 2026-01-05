'use client';

import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import SearchBar from './SearchBar';
import { Filter } from 'lucide-react';

import { FieldDefinition } from '@/services/property.service';

export default function SearchLayout({ children, fieldDefinitions }: { children: React.ReactNode, fieldDefinitions: FieldDefinition[] }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Mobile Filter Toggle & Search (Stacked) */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6 lg:mb-8">
                <div className="flex gap-3 w-full lg:w-auto lg:flex-1">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="lg:hidden flex items-center justify-center px-4 py-3 bg-card border border-border rounded-xl text-foreground font-semibold shadow-sm hover:bg-muted"
                    >
                        <Filter size={20} />
                    </button>
                    <SearchBar />
                </div>
            </div>

            <div className="flex gap-8 items-start">
                <FilterSidebar
                    mobileOpen={mobileFiltersOpen}
                    setMobileOpen={setMobileFiltersOpen}
                    fieldDefinitions={fieldDefinitions}
                />

                {/* Backdrop for mobile */}
                {mobileFiltersOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                )}

                <div className="flex-1 w-full min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
