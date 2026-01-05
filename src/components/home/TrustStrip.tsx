import React from 'react';
import { ShieldCheck, MapPin, BadgeIndianRupee, UserCheck } from 'lucide-react';

export default function TrustStrip() {
    const items = [
        { icon: ShieldCheck, label: "Verified Listings" },
        { icon: BadgeIndianRupee, label: "Transparent Rent & Rules" },
        { icon: MapPin, label: "Real Locations" },
        { icon: UserCheck, label: "Single Trusted Contact" }
    ];

    return (
        <section className="bg-white border-b border-neutral-100 py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center md:justify-around gap-6 md:gap-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-neutral-700">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <item.icon size={20} strokeWidth={2.5} />
                            </div>
                            <span className="font-semibold text-sm md:text-base tracking-tight">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
