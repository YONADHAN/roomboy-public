import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { locationService } from '@/services/location.service';

export default async function FeaturedLocations() {
    // Determine fetch size (we need 4, but fetch all available)
    const locations = await locationService.getAll().catch(() => []);

    // Pick top locations (or specific ones if we had a priority field, for now first 4)
    const featured = locations.slice(0, 4);

    if (featured.length === 0) return null;

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Popular Locations
                        </h2>
                        <p className="text-muted-foreground">
                            Explore properties in the most trending areas
                        </p>
                    </div>
                    {/* View All link could go here */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {featured.map((loc) => (
                        <Link
                            key={loc.locationId}
                            href={`/properties?location=${loc.slug}`}
                            className="group relative h-40 md:h-48 rounded-2xl overflow-hidden bg-card border border-border"
                        >
                            {/* Gradient Overlay as placeholder for image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:scale-105 transition-transform duration-500"></div>

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors dark:group-hover:bg-white/5"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <div className="w-10 h-10 mb-3 rounded-full bg-background shadow-sm flex items-center justify-center text-indigo-600 group-hover:-translate-y-1 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-600 transition-colors">
                                    {loc.name}
                                </h3>
                                <div className="mt-2 text-xs font-medium text-muted-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    View properties <ArrowRight size={12} className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
