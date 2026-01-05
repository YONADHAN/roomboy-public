import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
    className?: string; // Allow custom overrides if needed
}

export const SectionContainer: React.FC<Props> = ({ title, children, className = '' }) => {
    return (
        <section className={`py-8 border-t border-neutral-100 first:border-0 first:pt-0 ${className}`}>
            <h3 className="text-xl font-bold text-neutral-900 mb-6 tracking-tight">{title}</h3>
            {children}
        </section>
    );
};
