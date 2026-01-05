'use client'
'use client';

import React, { useState } from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { MapPin, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageSlider } from './ImageSlider';

interface Props {
    viewModel: PropertyViewModel;
}

export const PropertyHero: React.FC<Props> = ({ viewModel }) => {
    const { core: property, images, video, highlights, description } = viewModel;
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Column: Media Slider */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square xl:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
                <ImageSlider
                    images={images}
                    video={video}
                    title={property.title}
                />
            </div>

            {/* Right Column: Property Details */}
            <div className="flex flex-col justify-center">
                {/* Header Section */}
                <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wide mb-4">
                        {property.category}
                    </span>

                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-4 tracking-tight leading-[1.1]">
                        {property.title}
                    </h1>

                    <div className="flex items-center text-neutral-500 font-medium text-lg">
                        <MapPin size={20} className="text-neutral-400 mr-2 flex-shrink-0" />
                        <span className="truncate">
                            {property.location.city}, {property.location.address}
                        </span>
                    </div>
                </div>

                {/* Highlights / Chips Grid */}
                {highlights.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3 opacity-80">
                            Highlights
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {highlights.map((attr) => (
                                <div
                                    key={attr.key}
                                    className="inline-flex items-center px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 font-medium"
                                >
                                    <Check size={14} className="text-emerald-500 mr-2" />
                                    {attr.label}: {attr.value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description (Truncated) */}
                {description && (
                    <div className="flex flex-col items-start">
                        <div className={`relative prose prose-neutral prose-lg text-neutral-600 transition-all duration-300 overflow-hidden ${isDescExpanded ? 'max-h-[500px]' : 'max-h-[140px]'
                            }`}>
                            <p className="whitespace-pre-line leading-relaxed">
                                {description}
                            </p>

                            {/* Gradient Fade for Collapsed State - Moved INSIDE text container */}
                            {!isDescExpanded && description.length > 150 && (
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                            )}
                        </div>

                        {/* Toggle Button */}
                        {description.length > 150 && (
                            <button
                                onClick={() => setIsDescExpanded(!isDescExpanded)}
                                className="mt-3 text-indigo-600 font-semibold text-sm flex items-center hover:text-indigo-700 transition-colors z-10"
                            >
                                {isDescExpanded ? (
                                    <>Show Less <ChevronUp size={16} className="ml-1" /></>
                                ) : (
                                    <>Read More <ChevronDown size={16} className="ml-1" /></>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
