'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { AttributeSection } from '@/config/attribute.config';
import { Shield, Zap } from 'lucide-react';
import { useContact } from '@/context/ContactContext';

interface Props {
    viewModel: PropertyViewModel;
}

export const PricingCard: React.FC<Props> = ({ viewModel }) => {
    const { openContact } = useContact();
    const property = viewModel.core;
    const pricingSection = viewModel.sections[AttributeSection.Pricing];

    // Extract secondary pricing details if they exist
    // We already display the main rent from the core property object, so we look for others
    const secondaryCosts = pricingSection?.attributes.filter(attr => attr.key !== 'monthly_rent') || [];

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sticky top-24">
            {/* Header: Rent */}
            <div className="mb-6">
                <p className="text-sm text-neutral-500 font-medium mb-1">Monthly Rent</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-neutral-900">₹{viewModel.displayPrice.toLocaleString()}</span>
                </div>
            </div>

            {/* Action */}
            <button
                onClick={openContact}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm mb-6"
            >
                Contact Host
            </button>

            {/* Secondary Details */}
            {secondaryCosts.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-neutral-100">
                    {secondaryCosts.map(cost => (
                        <div key={cost.key} className="flex justify-between items-center text-sm">
                            <span className="text-neutral-500 flex items-center gap-2">
                                {cost.key === 'security_deposit' && <Shield size={14} />}
                                {cost.key === 'maintenance_charges' && <Zap size={14} />}
                                {cost.label}
                            </span>
                            <span className="font-medium text-neutral-900">
                                ₹{Number(cost.value).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <p className="text-xs text-neutral-400 mt-6 text-center">
                Review all rules and preferences before booking.
            </p>
        </div>
    );
};
