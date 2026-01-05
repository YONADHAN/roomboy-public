import React from 'react';
import { Check } from 'lucide-react';

export default function WhyRoomboy() {
    const features = [
        "Local broker expertise",
        "Verified availability",
        "One point of contact",
        "Clear house rules upfront",
        "Transparent rent & terms",
        "Support throughout"
    ];

    return (
        <section className="py-20 bg-neutral-900 text-white overflow-hidden relative">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Why choose <span className="text-indigo-400">Roomboy</span>?
                        </h2>
                        <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                            We bring trust and professional management to your search. Get verified options, clear terms, and a reliable point of contact for all your needs.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-md lg:max-w-lg">
                        <div className="aspect-square bg-neutral-800 rounded-3xl border border-neutral-700 p-8 shadow-2xl relative">
                            {/* Abstract 'Card' representation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
                            <div className="flex flex-col h-full justify-center items-center text-center space-y-6">
                                <div className="text-6xl font-black text-white/10">100%</div>
                                <h3 className="text-2xl font-bold text-white">Trust & Transparency</h3>
                                <p className="text-neutral-400">
                                    Every listing is sourced and verified by us to ensure you get exactly what you see.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
