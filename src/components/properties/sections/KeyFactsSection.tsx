'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { SectionContainer } from '../layout/SectionContainer';
import { Users, Home, Calendar, Clock, Layers } from 'lucide-react';

interface Props {
    viewModel: PropertyViewModel;
}

export const KeyFactsSection: React.FC<Props> = ({ viewModel }) => {
    const { core } = viewModel;
    const attrs = core.attributes || {};

    const facts = [
        {
            key: 'preferred_tenants',
            label: 'Preferred Tenants',
            value: attrs['preferred_tenants'],
            icon: Users,
            priority: true // The Gatekeeper
        },
        {
            key: 'room_type',
            label: 'Room Type',
            value: attrs['room_type'],
            icon: Home
        },
        {
            key: 'availability',
            label: 'Availability',
            value: attrs['min_stay_months'] ? `Min ${attrs['min_stay_months']} Months` : 'Immediate',
            icon: Calendar
        },
        {
            key: 'notice_period',
            label: 'Notice Period',
            value: attrs['notice_period_days'] ? `${attrs['notice_period_days']} Days` : null,
            icon: Clock
        },
        {
            key: 'floor',
            label: 'Floor',
            value: attrs['floor_number'] !== undefined && attrs['total_floors'] !== undefined
                ? `${attrs['floor_number']} of ${attrs['total_floors']}`
                : null,
            icon: Layers
        }
    ];

    const validFacts = facts.filter(f => f.value !== null && f.value !== undefined && f.value !== '');

    if (validFacts.length === 0) return null;

    return (
        <SectionContainer title="Key Facts">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {validFacts.map((fact) => (
                    <div
                        key={fact.key}
                        className={`p-4 rounded-xl border ${fact.priority
                                ? 'bg-indigo-50 border-indigo-100'
                                : 'bg-white border-neutral-100'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <fact.icon
                                size={20}
                                className={fact.priority ? 'text-indigo-600' : 'text-neutral-400'}
                            />
                            <div>
                                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${fact.priority ? 'text-indigo-600' : 'text-neutral-500'
                                    }`}>
                                    {fact.label}
                                </p>
                                <p className="text-neutral-900 font-bold text-lg leading-tight">
                                    {fact.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
};
