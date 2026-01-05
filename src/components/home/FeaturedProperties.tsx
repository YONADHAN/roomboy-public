import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { propertyService } from '@/services/property.service';
import PropertyCard from '@/components/properties/PropertyCard';

export default async function FeaturedProperties() {
    // Fetch latest 4 properties
    // We need to pass empty params but maybe limit? 
    // The service handles generic params. Ideally backend supports limit.
    // If not, we slice array.

    // getPublicProperties accepts generic params. 
    // Assuming backend returns sorted by latest.
    const { data: properties } = await propertyService.getPublicProperties({});
    const featured = properties.slice(0, 4);

    if (featured.length === 0) return null;

    return (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-10">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                            Latest Available Properties
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg">
                            Freshly listed rooms and PGs with verified availability directly from the broker.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {featured.map((property) => (
                        <div key={property._id} className="h-full">
                            <PropertyCard property={property} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/properties"
                        className="inline-flex items-center px-8 py-3 bg-background border border-border rounded-full text-foreground font-bold hover:bg-muted hover:border-border transition-all shadow-sm"
                    >
                        View all available listings <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
