'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { FieldDefinition } from '@/services/property.service';

interface FilterSidebarProps {
    mobileOpen?: boolean;
    setMobileOpen?: (o: boolean) => void;
    fieldDefinitions: FieldDefinition[];
}

export default function FilterSidebar({ mobileOpen, setMobileOpen, fieldDefinitions }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Local state for rent inputs
    const [minRent, setMinRent] = useState(searchParams.get('min_rent') || '');
    const [maxRent, setMaxRent] = useState(searchParams.get('max_rent') || '');

    useEffect(() => {
        setMinRent(searchParams.get('min_rent') || '');
        setMaxRent(searchParams.get('max_rent') || '');
    }, [searchParams]);

    const updateFilterResult = (newParams: URLSearchParams) => {
        newParams.set('page', '1');
        router.push(`/properties?${newParams.toString()}`);
    };

    const handleCheck = (key: string, value: string, checked: boolean) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        // Multi-Select Logic for ALL fields
        const currentValues = currentParams.getAll(key);
        if (checked) {
            if (!currentValues.includes(value)) {
                currentParams.append(key, value);
            }
        } else {
            // Remove specific value
            const newValues = currentValues.filter(v => v !== value);
            currentParams.delete(key);
            newValues.forEach(v => currentParams.append(key, v));
        }

        updateFilterResult(currentParams);
    };

    const handleRentChange = (type: 'min_rent' | 'max_rent', value: string) => {
        if (type === 'min_rent') setMinRent(value);
        else setMaxRent(value);
    };

    const applyRentFilter = () => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        if (minRent) currentParams.set('min_rent', minRent);
        else currentParams.delete('min_rent');

        if (maxRent) currentParams.set('max_rent', maxRent);
        else currentParams.delete('max_rent');

        updateFilterResult(currentParams);
    };

    const isChecked = (key: string, value: string) => {
        return searchParams.getAll(key).includes(value);
    };

    // Filter out definitions dependent on having options (select/multi-select)
    const activeFilters = fieldDefinitions.filter(
        def => (def.dataType === 'select' || def.dataType === 'multi-select') && def.options && def.options.length > 0
    );

    return (
        <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:z-auto lg:h-auto lg:bg-transparent lg:w-64 flex-shrink-0
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b lg:hidden">
                <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
                <button onClick={() => setMobileOpen?.(false)} className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full">
                    <X size={20} />
                </button>
            </div>

            <div className="p-4 lg:p-0 space-y-8 overflow-y-auto max-h-screen lg:max-h-none pb-20 lg:pb-0">
                {/* Rent Range Section */}
                <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                        Monthly Rent (₹)
                    </h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minRent}
                            onChange={(e) => handleRentChange('min_rent', e.target.value)}
                            onBlur={applyRentFilter}
                            onKeyDown={(e) => e.key === 'Enter' && applyRentFilter()}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                        <span className="text-neutral-400">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxRent}
                            onChange={(e) => handleRentChange('max_rent', e.target.value)}
                            onBlur={applyRentFilter}
                            onKeyDown={(e) => e.key === 'Enter' && applyRentFilter()}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                {/* Dynamic Filters from DB */}
                {activeFilters.map((def) => (
                    <div key={def._id}>
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                            {def.label}
                        </h3>
                        <div className="space-y-2">
                            {def.options?.map((option) => (
                                <label key={option} className="flex items-center group cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-neutral-300 rounded focus:ring-indigo-500 transition-colors"
                                        checked={isChecked(def.fieldKey, option)}
                                        onChange={(e) => handleCheck(def.fieldKey, option, e.target.checked)}
                                    />
                                    <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
