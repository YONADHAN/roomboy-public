'use client';

import React from 'react';
import { ComputedAttribute } from '@/models/property.view-model';
import { AttributeSection, AttributeType, ATTRIBUTE_CONFIG } from '@/config/attribute.config';
import { Check, X } from 'lucide-react';
import { AmenityGrid } from './renderers/AmenityGrid';
import { RuleItem } from './renderers/RuleItem';

interface Props {
    attribute: ComputedAttribute;
}

export const AttributeRenderer: React.FC<Props> = ({ attribute }) => {
    const { type, value, label, section } = attribute;
    // Look up the icon from the client-side config
    const Icon = ATTRIBUTE_CONFIG[attribute.key]?.icon;

    // Delegate to specialized renderers based on Section or Type
    if (section === AttributeSection.Amenities && type === AttributeType.Array) {
        return <AmenityGrid attribute={attribute} />;
    }

    if (section === AttributeSection.Rules) {
        return <RuleItem attribute={attribute} />;
    }

    // Default Renderers
    switch (type) {
        case AttributeType.Currency:
        case AttributeType.Number:
            return (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
                    <div className="p-2.5 bg-white shadow-sm rounded-lg text-neutral-400">
                        {Icon && <Icon size={20} />}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-lg font-bold text-neutral-900">
                            {type === AttributeType.Currency ? '₹' : ''}{Number(value).toLocaleString()}
                        </p>
                    </div>
                </div>
            );

        case AttributeType.Text:
            return (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50/50 border border-neutral-100">
                    <div className="p-2.5 bg-white shadow-sm rounded-lg text-neutral-400">
                        {Icon && <Icon size={20} />}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-base font-semibold text-neutral-900">{value}</p>
                    </div>
                </div>
            );

        case AttributeType.Paragraph:
            return (
                <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                        {value}
                    </p>
                </div>
            );

        case AttributeType.Boolean:
            // Fallback boolean renderer (if not in Rules section)
            return (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                    <span className="text-neutral-700 flex items-center gap-2">
                        {Icon && <Icon size={16} className="text-neutral-400" />}
                        {label}
                    </span>
                    <span className={`flex items-center gap-1.5 text-sm font-medium px-2.5 py-0.5 rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {value ? <Check size={14} /> : <X size={14} />}
                        {value ? 'Yes' : 'No'}
                    </span>
                </div>
            );

        case AttributeType.Array:
            if (!Array.isArray(value)) return null;
            return (
                <div className="flex flex-col space-y-2">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{label}</p>
                    <div className="flex flex-wrap gap-2">
                        {value.map((item: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700 border border-neutral-200">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            );

        case AttributeType.YouTube:
            let videoId = '';
            try {
                if (value.includes('youtube.com')) {
                    videoId = new URL(value).searchParams.get('v') || '';
                } else if (value.includes('youtu.be')) {
                    videoId = value.split('/').pop() || '';
                }
            } catch (e) { console.warn('Invalid YouTube URL', value); }

            if (!videoId) return null;

            return (
                <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-md">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                        title={label}
                        allowFullScreen
                        className="border-0"
                    />
                </div>
            );

        default:
            return null;
    }
};
