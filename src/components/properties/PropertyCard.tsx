import React from 'react';
import Link from 'next/link';
import { MapPin, Image as ImageIcon, Bed, Bath, Home, Users, Zap } from 'lucide-react';
import { PublicProperty } from '@/services/property.service';

interface Props {
    property: PublicProperty;
}

export default function PropertyCard({ property }: Props) {
    const { attributes } = property;

    // safe attribute extraction
    const propertyType = attributes.property_type || 'Property';
    const roomType = attributes.room_type;
    const furnishing = attributes.furnishing_status;
    const tenants = Array.isArray(attributes.preferred_tenants)
        ? attributes.preferred_tenants.join(', ')
        : attributes.preferred_tenants;

    const formattedPrice = property.price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    return (
        <Link
            href={`/properties/${property.propertyId}`}
            className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
        >
            {/* Image Section */}
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                {property.mainImage ? (
                    <img
                        src={property.mainImage}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon size={32} className="opacity-50" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-neutral-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm dark:bg-black/80 dark:text-white">
                    {propertyType}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 bg-neutral-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg dark:bg-white dark:text-black">
                    {formattedPrice}<span className="text-xs font-normal opacity-80 text-neutral-300 dark:text-neutral-600">/mo</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                {/* Location */}
                <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin size={14} className="text-indigo-600 mr-1.5 dark:text-indigo-400" />
                    <span className="text-xs font-medium uppercase tracking-wide truncate">
                        {property.location.city}
                        {property.location.address && `, ${property.location.address}`}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground leading-snug mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 dark:group-hover:text-indigo-400">
                    {property.title}
                </h3>

                {/* Features Divider */}
                <div className="mt-auto border-t border-dashed border-border pt-4">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {/* Feature 1: Room Type */}
                        {roomType && (
                            <div className="flex items-center text-muted-foreground">
                                <Bed size={16} className="text-muted-foreground/70 mr-2" />
                                <span className="text-sm font-medium">{roomType}</span>
                            </div>
                        )}

                        {/* Feature 2: Furnishing */}
                        {furnishing && (
                            <div className="flex items-center text-muted-foreground">
                                <Zap size={16} className="text-muted-foreground/70 mr-2" />
                                <span className="text-sm font-medium">{furnishing}</span>
                            </div>
                        )}

                        {/* Feature 3: Tenants */}
                        {tenants && (
                            <div className="flex items-center text-muted-foreground col-span-2">
                                <Users size={16} className="text-muted-foreground/70 mr-2 flex-shrink-0" />
                                <span className="text-sm font-medium truncate">{tenants}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
