import React from 'react';
import { useContact } from '@/context/ContactContext';
import { X, Phone, Mail, Globe, MessageCircle, ExternalLink, User, Facebook, Instagram } from 'lucide-react';

// Custom components or Lucide aliases
const FacebookIcon = Facebook;
const InstagramIcon = Instagram;

export const ContactModal: React.FC = () => {
    const { isOpen, closeContact, contact, isLoading } = useContact();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={closeContact}
            />

            {/* Modal Panel */}
            <div className="relative w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 border border-border">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground">Contact Business</h3>
                    <button
                        onClick={closeContact}
                        className="p-2 -mr-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <div className="w-8 h-8 border-2 border-border border-t-indigo-600 rounded-full animate-spin" />
                            <p className="text-sm text-muted-foreground">Loading details...</p>
                        </div>
                    ) : contact ? (
                        <div className="space-y-6">
                            {/* Profile Info */}
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">{contact.displayName}</h2>
                                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                                </div>
                            </div>

                            {/* Phone Numbers */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Numbers</h4>
                                {contact.phoneNumbers.map((phone, idx) => (
                                    <a
                                        key={idx}
                                        href={`tel:${phone.number}`}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${phone.isPrimary
                                            ? 'bg-indigo-50 border-indigo-100 shadow-sm hover:border-indigo-200'
                                            : 'bg-card border-border hover:border-border/80'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${phone.isPrimary ? 'bg-indigo-600 text-white' : 'bg-muted text-muted-foreground'}`}>
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${phone.isPrimary ? 'text-indigo-900 dark:text-indigo-300' : 'text-foreground'}`}>{phone.label}</p>
                                                <p className="text-sm font-mono text-muted-foreground">{phone.number}</p>
                                            </div>
                                        </div>
                                        <ExternalLink size={16} className={phone.isPrimary ? 'text-indigo-400' : 'text-muted-foreground'} />
                                    </a>
                                ))}
                            </div>

                            {/* Socials & Email */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Email */}
                                {contact.email && (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-muted hover:border-border transition-all text-center group"
                                    >
                                        <Mail size={24} className="text-muted-foreground group-hover:text-indigo-600 mb-2 transition-colors" />
                                        <span className="text-xs font-semibold text-muted-foreground">Email</span>
                                    </a>
                                )}

                                {/* Social Links Dynamic Rendering */}
                                {contact.socialLinks?.map((social, idx) => {
                                    const platform = social.platform.toLowerCase();

                                    // Platform Config
                                    let icon = <Globe size={24} className="text-neutral-400 group-hover:text-neutral-600 mb-2 transition-colors dark:text-neutral-500 dark:group-hover:text-neutral-400" />;
                                    let label = platform;
                                    let styleClass = "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 dark:bg-neutral-900/50";
                                    let textClass = "text-neutral-600 dark:text-neutral-400";

                                    if (platform === 'whatsapp') {
                                        icon = <MessageCircle size={24} className="text-emerald-500 group-hover:scale-110 transition-transform mb-2 dark:text-emerald-400" />;
                                        label = "WhatsApp";
                                        styleClass = "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:hover:bg-emerald-950/50";
                                        textClass = "text-neutral-600 dark:text-emerald-200";
                                    } else if (platform === 'instagram') {
                                        icon = <div className="mb-2 transition-transform group-hover:scale-110"><InstagramIcon size={24} className="dark:text-pink-400" /></div>;
                                        label = "Instagram";
                                        styleClass = "border-pink-100 bg-pink-50/30 hover:bg-pink-50 hover:border-pink-200 dark:bg-pink-950/30 dark:border-pink-900/50 dark:hover:bg-pink-950/50";
                                        textClass = "text-neutral-600 dark:text-pink-200";
                                    } else if (platform === 'facebook') {
                                        icon = <FacebookIcon size={24} className="text-blue-600 group-hover:scale-110 transition-transform mb-2 dark:text-blue-400" />;
                                        label = "Facebook";
                                        styleClass = "border-blue-100 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-200 dark:bg-blue-950/30 dark:border-blue-900/50 dark:hover:bg-blue-950/50";
                                        textClass = "text-neutral-600 dark:text-blue-200";
                                    }

                                    return (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center group ${styleClass}`}
                                        >
                                            {icon}
                                            <span className={`text-xs font-semibold capitalize ${textClass}`}>{label}</span>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Website */}
                            {contact.website && (
                                <a
                                    href={contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full py-3 text-sm font-medium text-muted-foreground hover:text-indigo-600 transition-colors"
                                >
                                    <Globe size={16} className="mr-2" />
                                    Visit Website
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-neutral-500">
                            Unable to load contact information.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
