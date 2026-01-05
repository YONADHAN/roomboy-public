import React from 'react';
import { ComputedAttribute } from '@/models/property.view-model';
import { CheckCircle2 } from 'lucide-react'; // Fallback icon

interface Props {
    attribute: ComputedAttribute;
}

export const AmenityGrid: React.FC<Props> = ({ attribute }) => {
    const items: string[] = Array.isArray(attribute.value) ? attribute.value : [];

    if (items.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <CheckCircle2 size={18} className="text-neutral-400 shrink-0" />
                    <span className="text-sm font-medium text-neutral-700">{item}</span>
                </div>
            ))}
        </div>
    );
};
