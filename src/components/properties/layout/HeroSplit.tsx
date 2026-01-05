import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { ATTRIBUTE_CONFIG } from '@/config/attribute.config';
import { ImageSlider } from './ImageSlider';
import { MapPin } from 'lucide-react';

interface Props {
    viewModel: PropertyViewModel;
}

export const HeroSplit: React.FC<Props> = ({ viewModel }) => {
    const { core: property, images, video, description, highlights } = viewModel;

    return (
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 items-start">
            {/* Left: Media Slider */}
            <div className="w-full">
                <ImageSlider
                    images={images}
                    video={video}
                    title={property.title}
                />
            </div>

            {/* Right: Info Panel */}
            <div className="flex flex-col h-full justify-center space-y-6">

                {/* 1. Header & Location */}
                <div>
                    <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wide">
                            {property.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-3 tracking-tight leading-tight">
                        {property.title}
                    </h1>
                    <p className="text-neutral-500 font-medium flex items-center gap-2 text-lg">
                        <MapPin size={20} className="text-neutral-400" />
                        {property.location.city}, {property.location.address}
                    </p>
                </div>

                {/* 2. Highlights Row */}
                {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-3 pb-6 border-b border-neutral-100">
                        {highlights.map(attr => {
                            // Resolve Icon
                            const Icon = ATTRIBUTE_CONFIG[attr.key]?.icon;
                            return (
                                <div key={attr.key} className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg border border-neutral-100">
                                    {Icon && <Icon size={16} className="text-neutral-500" />}
                                    <span className="text-sm font-semibold text-neutral-700">{attr.value}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 3. Description (Truncated / Scrollable) */}
                {description && (
                    <div className="prose prose-neutral prose-sm max-w-none">
                        <p className="text-neutral-600 leading-relaxed text-base">
                            {description}
                        </p>
                    </div>
                )}

            </div>
        </header>
    );
};
