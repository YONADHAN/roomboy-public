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
            <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                    <h3 className="text-lg font-bold text-neutral-900">Contact Business</h3>
                    <button
                        onClick={closeContact}
                        className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-3">
                            <div className="w-8 h-8 border-2 border-neutral-200 border-t-indigo-600 rounded-full animate-spin" />
                            <p className="text-sm text-neutral-500">Loading details...</p>
                        </div>
                    ) : contact ? (
                        <div className="space-y-6">
                            {/* Profile Info */}
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                    <User size={28} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-neutral-900">{contact.displayName}</h2>
                                    <p className="text-sm text-neutral-500">{contact.description}</p>
                                </div>
                            </div>

                            {/* Phone Numbers */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Phone Numbers</h4>
                                {contact.phoneNumbers.map((phone, idx) => (
                                    <a
                                        key={idx}
                                        href={`tel:${phone.number}`}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${phone.isPrimary
                                            ? 'bg-indigo-50 border-indigo-100 shadow-sm hover:border-indigo-200'
                                            : 'bg-white border-neutral-200 hover:border-neutral-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${phone.isPrimary ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${phone.isPrimary ? 'text-indigo-900' : 'text-neutral-900'}`}>{phone.label}</p>
                                                <p className="text-sm font-mono text-neutral-600">{phone.number}</p>
                                            </div>
                                        </div>
                                        <ExternalLink size={16} className={phone.isPrimary ? 'text-indigo-400' : 'text-neutral-300'} />
                                    </a>
                                ))}
                            </div>

                            {/* Socials & Email */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Email */}
                                {contact.email && (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-all text-center group"
                                    >
                                        <Mail size={24} className="text-neutral-400 group-hover:text-indigo-600 mb-2 transition-colors" />
                                        <span className="text-xs font-semibold text-neutral-600">Email</span>
                                    </a>
                                )}

                                {/* Social Links Dynamic Rendering */}
                                {contact.socialLinks?.map((social, idx) => {
                                    const platform = social.platform.toLowerCase();

                                    // Platform Config
                                    let icon = <Globe size={24} className="text-neutral-400 group-hover:text-neutral-600 mb-2 transition-colors" />;
                                    let label = platform;
                                    let styleClass = "border-neutral-200 hover:border-neutral-300";

                                    if (platform === 'whatsapp') {
                                        icon = <MessageCircle size={24} className="text-emerald-500 group-hover:scale-110 transition-transform mb-2" />;
                                        label = "WhatsApp";
                                        styleClass = "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-200";
                                    } else if (platform === 'instagram') {
                                        icon = <div className="mb-2 transition-transform group-hover:scale-110"><InstagramIcon size={24} /></div>;
                                        label = "Instagram";
                                        styleClass = "border-pink-100 bg-pink-50/30 hover:bg-pink-50 hover:border-pink-200";
                                    } else if (platform === 'facebook') {
                                        icon = <FacebookIcon size={24} className="text-blue-600 group-hover:scale-110 transition-transform mb-2" />;
                                        label = "Facebook";
                                        styleClass = "border-blue-100 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-200";
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
                                            <span className="text-xs font-semibold text-neutral-600 capitalize">{label}</span>
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
                                    className="flex items-center justify-center w-full py-3 text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors"
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
