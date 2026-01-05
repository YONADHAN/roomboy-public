'use client';

import React from 'react';
import { ContactProvider } from '@/context/ContactContext';
import { ContactModal } from '@/components/common/ContactModal';

export const ClientShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ContactProvider>
            {children}
            <ContactModal />
        </ContactProvider>
    );
};
