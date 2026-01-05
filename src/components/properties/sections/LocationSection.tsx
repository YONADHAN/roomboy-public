'use client';

import React from 'react';
import { PropertyViewModel } from '@/models/property.view-model';
import { SectionContainer } from '../layout/SectionContainer';
import { MapPin, Navigation } from 'lucide-react';

interface Props {
    viewModel: PropertyViewModel;
}

export const LocationSection: React.FC<Props> = ({ viewModel }) => {
    const { core } = viewModel;
    const attrs = core.attributes || {};

    // Resolve Coordinates: Check keys from core coordinates (preferred) or attributes
    const lat = core.coordinates?.lat || attrs['latitude'] || (core.location as any)?.latitude;
    const lng = core.coordinates?.lng || attrs['longitude'] || (core.location as any)?.longitude;

    const hasCoordinates = lat && lng;

    // Resolve Landmarks
    const rawLandmarks = attrs['nearby_landmarks'];
    let landmarks: string[] = [];

    if (Array.isArray(rawLandmarks)) {
        landmarks = rawLandmarks.filter(l => l && typeof l === 'string' && l.trim().length > 0);
    } else if (typeof rawLandmarks === 'string') {
        const split = rawLandmarks.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (split.length > 0) landmarks = split;
    }

    // Hide section ONLY if BOTH map and landmarks are missing
    if (!hasCoordinates && landmarks.length === 0) return null;

    return (
        <SectionContainer title="Neighbourhood">
            {/* Main Layout: Stack */}
            <div className="flex flex-col gap-6">

                {/* 1. Real Map View (Top) */}
                {hasCoordinates && (
                    <div className="w-full bg-neutral-100 rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] min-h-[350px] relative shadow-sm border border-neutral-200">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${(Number(lng) - 0.01).toFixed(6)}%2C${(Number(lat) - 0.01).toFixed(6)}%2C${(Number(lng) + 0.01).toFixed(6)}%2C${(Number(lat) + 0.01).toFixed(6)}&layer=mapnik&marker=${Number(lat).toFixed(6)}%2C${Number(lng).toFixed(6)}`}
                            style={{ border: 0 }}
                            title="Property Location"
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                        {/* Attribution */}
                        <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] rounded shadow-sm text-neutral-500">
                            <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                © OpenStreetMap contributors
                            </a>
                        </div>
                    </div>
                )}

                {/* 2. Location Info & Actions (Below Map) */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    {/* Info Block */}
                    <div className="space-y-4 flex-1">

                        {/* Locality & City */}
                        {(core.location.address || core.location.city) && (
                            <div className="space-y-1">
                                {core.location.address && (
                                    <h4 className="flex items-start text-neutral-900 font-medium">
                                        <MapPin size={18} className="mr-2 text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <span className="font-bold text-neutral-500 text-xs uppercase tracking-wider block mb-0.5">Locality</span>
                                            {core.location.address}
                                        </span>
                                    </h4>
                                )}
                                {core.location.city && (
                                    <h4 className="flex items-start text-neutral-900 font-medium pl-[26px]">
                                        <span>
                                            <span className="font-bold text-neutral-500 text-xs uppercase tracking-wider block mb-0.5">City</span>
                                            {core.location.city}
                                        </span>
                                    </h4>
                                )}
                            </div>
                        )}

                        {/* Landmarks List - Moved here */}
                        {landmarks.length > 0 && (
                            <div className="pt-2">
                                <h4 className="flex items-center text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">
                                    <Navigation size={14} className="mr-2" />
                                    Nearby Landmarks
                                </h4>
                                <ul className="flex flex-wrap gap-2">
                                    {landmarks.map((lm: string, idx: number) => (
                                        <li key={idx} className="flex items-center text-sm text-neutral-700 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100 shadow-sm">
                                            {lm}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Directions Button (Side on desktop, Bottom on mobile) */}
                    {hasCoordinates && (
                        <div className="flex-shrink-0 pt-1">
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                                <MapPin size={18} className="mr-2" />
                                Get Directions
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </SectionContainer>
    );
};
