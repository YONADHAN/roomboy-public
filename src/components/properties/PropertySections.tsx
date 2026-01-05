'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { KeyFactsSection } from './sections/KeyFactsSection';
import { RulesSection } from './sections/RulesSection';
import { AmenitiesSection } from './sections/AmenitiesSection';
import { LocationSection } from './sections/LocationSection';

interface Props {
    viewModel: PropertyViewModel;
}

export const PropertySections: React.FC<Props> = ({ viewModel }) => {
    return (
        <div className="flex flex-col gap-6 lg:gap-10">
            {/* 1. Key Facts & Suitability (Critical) */}
            <KeyFactsSection viewModel={viewModel} />

            {/* 2. Rules & Lifestyle (Deal Breakers) */}
            <RulesSection viewModel={viewModel} />

            {/* 3. Amenities (Value) */}
            <AmenitiesSection viewModel={viewModel} />

            {/* 4. Location (Trust) */}
            <LocationSection viewModel={viewModel} />

            {/* 5. Any other generic sections can be appended here if needed via generic loop, 
                but we are enforcing strict Elimination Logic for now so we omit uncontrolled rendering */}
        </div>
    );
};
