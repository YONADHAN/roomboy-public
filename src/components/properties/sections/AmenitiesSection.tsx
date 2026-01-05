'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { SectionContainer } from '../layout/SectionContainer';
import { Wifi, Zap, Wind, Tv, Shield, Box, Car, Monitor } from 'lucide-react';
import { AttributeSection } from '@/config/attribute.config';

interface Props {
    viewModel: PropertyViewModel;
}

// Map common amenity keys to Lucide icons
const ICON_MAP: Record<string, any> = {
    'wifi': Wifi,
    'internet': Wifi,
    'ac': Wind,
    'air_conditioner': Wind,
    'power_backup': Zap,
    'tv': Tv,
    'security': Shield,
    'cctv': Shield,
    'lift': Box,
    'elevator': Box,
    'parking': Car,
    'gym': Monitor, // Placeholder
};

export const AmenitiesSection: React.FC<Props> = ({ viewModel }) => {
    // We can pull from the pre-computed sections to get the processed list of amenities
    // or parse raw headers. Using computed section is safer as it handles labels.
    const amenitiesSection = viewModel.sections['Amenities'];

    // Fallback if section naming is different, or just use raw attributes
    const rawAmenities = viewModel.core.attributes?.['amenities'];

    // Normalize into list of { label, icon }
    let displayList: Array<{ label: string, icon?: any, key: string }> = [];

    // Strategy 1: Use computed section (if defined in config)
    if (amenitiesSection && amenitiesSection.attributes && amenitiesSection.attributes.length > 0) {
        displayList = amenitiesSection.attributes.map(attr => ({
            label: attr.label || attr.key, // Fallback to key if label missing
            icon: ICON_MAP[attr.key.toLowerCase()] || Box,
            key: attr.key
        }));
    }
    // Strategy 2: Raw Array of strings (preferred/common in backend)
    else if (Array.isArray(rawAmenities) && rawAmenities.length > 0) {
        displayList = rawAmenities
            .filter(Boolean) // Filter empty strings
            .map((am: string) => ({
                label: am,
                icon: ICON_MAP[am.toLowerCase().replace(/\s+/g, '_')] || Box,
                key: am
            }));
    }

    if (displayList.length === 0) return null;

    // Sort: Premium items first (Wifi, AC, Power Backup)
    const PRIORITY_KEYS = ['wifi', 'ac', 'air_conditioner', 'power_backup', 'fridge', 'refrigerator'];
    displayList.sort((a, b) => {
        const aPrio = PRIORITY_KEYS.some(k => a.key.toLowerCase().includes(k)) ? 1 : 0;
        const bPrio = PRIORITY_KEYS.some(k => b.key.toLowerCase().includes(k)) ? 1 : 0;
        return bPrio - aPrio;
    });

    return (
        <SectionContainer title="Amenities & Facilities">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {displayList.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.key} className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors text-center shadow-sm border border-transparent hover:border-neutral-200">
                            <Icon size={24} className="text-neutral-700 mb-2" />
                            <span className="text-sm font-medium text-neutral-600 leading-tight">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </SectionContainer>
    );
};
