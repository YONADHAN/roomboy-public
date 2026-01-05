'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { SectionContainer } from '../layout/SectionContainer';
import { Check, X, Info } from 'lucide-react';

interface Props {
    viewModel: PropertyViewModel;
}

export const RulesSection: React.FC<Props> = ({ viewModel }) => {
    const { core } = viewModel;
    const attrs = core.attributes || {};

    const rules = [
        {
            key: 'food',
            label: 'Food Preference',
            // Logic: non_veg_allowed "no" -> Veg Only. "yes" -> Non-Veg Allowed.
            value: attrs['non_veg_allowed'] === 'no' ? 'Veg Only' : 'Non-Veg Allowed',
            allowed: attrs['non_veg_allowed'] !== 'no',
            highlight: attrs['non_veg_allowed'] === 'no' // Highlight restriction
        },
        {
            key: 'smoking',
            label: 'Smoking',
            value: attrs['smoking_allowed'] === 'yes' ? 'Allowed' : 'Not Allowed',
            allowed: attrs['smoking_allowed'] === 'yes'
        },
        {
            key: 'pets',
            label: 'Pets',
            value: attrs['pets_allowed'] === 'yes' ? 'Allowed' : 'Not Allowed',
            allowed: attrs['pets_allowed'] === 'yes'
        },
        {
            key: 'visitors',
            label: 'Visitors',
            value: attrs['visitors_allowed'] === 'yes' ? 'Allowed' : 'Restricted',
            allowed: attrs['visitors_allowed'] === 'yes',
            details: attrs['visiting_hours']
        }
    ];

    // House rules text map be a string or array, handle string for now based on typical schema
    const houseRules = attrs['house_rules'];

    return (
        <SectionContainer title="Rules & Preferences">
            <div className="space-y-6">
                {/* Visual Grid for Binary Rules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rules.map((rule) => (
                        <div key={rule.key} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                            <span className="text-neutral-600 font-medium">{rule.label}</span>
                            <div className="flex items-center gap-2">
                                <span className={`font-semibold ${rule.highlight
                                        ? 'text-emerald-600' // Positive spin on Veg Only or similar constraints if viewed as feature
                                        : rule.allowed ? 'text-neutral-900' : 'text-neutral-500'
                                    }`}>
                                    {rule.value}
                                </span>
                                {rule.allowed ? (
                                    <Check size={18} className="text-emerald-500" />
                                ) : (
                                    <X size={18} className="text-neutral-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Details */}
                {houseRules && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg text-amber-900 text-sm">
                        <Info size={18} className="flex-shrink-0 mt-0.5" />
                        <p>{houseRules}</p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
};
