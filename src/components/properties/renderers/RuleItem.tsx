import React from 'react';
import { ComputedAttribute } from '@/models/property.view-model';
import { Check, X } from 'lucide-react';
import { ATTRIBUTE_CONFIG } from '@/config/attribute.config';

interface Props {
    // This component might receive multiple rule attributes, or a single one to render as a row
    // For now, let's assume we render individual rule attributes here
    attribute: ComputedAttribute;
}

export const RuleItem: React.FC<Props> = ({ attribute }) => {
    const isAllowed = !!attribute.value;
    const Icon = ATTRIBUTE_CONFIG[attribute.key]?.icon;

    if (attribute.type === 'array') {
        const items = attribute.value as string[];
        return (
            <div className="py-3 border-b border-neutral-100 last:border-0">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500">
                        {Icon ? <Icon size={20} /> : <div className="w-5 h-5" />}
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900 mb-2">{attribute.label}</p>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item: string, idx: number) => (
                                <span key={idx} className="inline-flex px-2.5 py-1 rounded-md text-sm bg-neutral-100 text-neutral-600 font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isAllowed ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {Icon ? <Icon size={20} /> : (isAllowed ? <Check size={20} /> : <X size={20} />)}
                </div>
                <span className="text-neutral-700 font-medium">{attribute.label}</span>
            </div>
            {attribute.type === 'boolean' && (
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${isAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isAllowed ? 'Allowed' : 'Not Allowed'}
                </span>
            )}
        </div>
    );
};
