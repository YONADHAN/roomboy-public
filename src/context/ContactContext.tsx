'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { BusinessContact, contactService } from '@/services/contact.service';

interface ContactContextType {
    contact: BusinessContact | null;
    isOpen: boolean;
    isLoading: boolean;
    openContact: () => void;
    closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contact, setContact] = useState<BusinessContact | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const openContact = useCallback(async () => {
        setIsOpen(true);

        // Fetch only on first open
        if (!hasFetched && !contact) {
            setIsLoading(true);
            try {
                const data = await contactService.getActiveContact();
                setContact(data);
                setHasFetched(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    }, [contact, hasFetched]);

    const closeContact = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <ContactContext.Provider value={{
            contact,
            isOpen,
            isLoading,
            openContact,
            closeContact
        }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error('useContact must be used within a ContactProvider');
    }
    return context;
};
