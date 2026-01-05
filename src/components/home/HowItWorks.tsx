import React from 'react';
import { Search, ClipboardCheck, MessageCircle } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Browse Available Rooms",
            description: "Browse through our curated list of available rooms and PGs."
        },
        {
            icon: ClipboardCheck,
            title: "Check Rules & Rent",
            description: "Review house rules, amenities, and verify pricing upfront."
        },
        {
            icon: MessageCircle,
            title: "Contact Broker",
            description: "Connect with our trusted broker to arrange a visit and finalize."
        }
    ];

    return (
        <section className="py-20 bg-background border-t border-border">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-4">How Roomboy Works</h2>
                    <p className="text-muted-foreground">Simple, transparent, and direct. Get settled in 3 easy steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-400">
                                <step.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed px-4">
                                {step.description}
                            </p>

                            {/* Connector Line (Desktop Only) - Not implemented for simplicity, but could be added */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
