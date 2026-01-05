
// src/app/properties/page.tsx
import { propertyService } from '@/services/property.service';
import Link from 'next/link';
import PropertyCard from '@/components/properties/PropertyCard';
import SearchLayout from '@/components/properties/search/SearchLayout';
import Pagination from '@/components/properties/search/Pagination';
import { MapPin, Search } from 'lucide-react';

export default async function PropertiesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;

    // Fetch properties and field definitions in parallel
    const [propertiesData, fieldDefinitions] = await Promise.all([
        propertyService.getPublicProperties(resolvedParams),
        propertyService.getFieldDefinitions('property')
    ]);

    const { data: properties, meta } = propertiesData;

    const locationParam = resolvedParams?.location;
    const locationQuery = Array.isArray(locationParam) ? locationParam[0] : locationParam;

    // Helper: Format location slug (kakkanad-kochi -> Kakkanad, Kochi)
    const formatLocation = (slug: string) => {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const locationDisplay = locationQuery ? formatLocation(locationQuery) : null;
    // Compact Header Logic
    const heading = locationDisplay ? `Properties in ${locationDisplay}` : 'Available Properties';

    // Dynamic subtext based on total count
    const subtext = locationDisplay
        ? `Explore rentals in ${locationDisplay}`
        : 'Verified properties';

    return (
        <section className="min-h-screen pb-20 bg-background">
            {/* 1. Compact Location Header */}
            <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-[64px] z-20"> {/* Adjusted sticky top to account for navbar */}
                <div className="container mx-auto px-4 py-3 md:py-4">
                    <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                        {locationQuery && <MapPin className="text-indigo-600 flex-shrink-0" size={20} />}
                        {heading}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                            ({meta?.total || properties.length})
                        </span>
                    </h1>
                </div>
            </div>

            {/* 2. Main Search Layout (Sidebar + Grid) */}
            <SearchLayout fieldDefinitions={fieldDefinitions}>
                {/* Grid Content */}
                {properties.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-muted/30">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <Search size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">No matches found</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                            Try adjusting your filters or search for a different location.
                        </p>
                        <Link
                            href="/properties"
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Clear all filters
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {meta && <Pagination meta={meta} />}
                    </>
                )}
            </SearchLayout>
        </section>
    );
}
