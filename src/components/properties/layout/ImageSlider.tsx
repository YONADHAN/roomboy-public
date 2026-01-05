'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';

interface ImageSliderProps {
    images: string[];
    video?: {
        type: 'youtube' | 'other';
        url: string;
        embedUrl: string;
        thumbnailUrl?: string;
    };
    title: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, video, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Filter out empty images just in case
    const validImages = images.filter(Boolean);

    // Determine slides: Video is always index 0 if it exists
    const hasVideo = !!video;
    const totalSlides = validImages.length + (hasVideo ? 1 : 0);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        setIsVideoPlaying(false); // Reset video state on slide change
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
        setIsVideoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsVideoPlaying(false);
    };

    if (totalSlides === 0) {
        return (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ImageIcon size={48} />
            </div>
        );
    }

    // Render Logic
    const isVideoSlide = hasVideo && currentIndex === 0;

    // Get current image URL (account for video offset)
    // If hasVideo is true: index 0 is video, index 1 is image[0]
    // If hasVideo is false: index 0 is image[0]
    const currentImageIndex = hasVideo ? currentIndex - 1 : currentIndex;
    const currentImageUrl = isVideoSlide ? (video?.thumbnailUrl || validImages[0]) : validImages[currentImageIndex];

    return (
        <div className="relative w-full h-full group bg-neutral-900 overflow-hidden">
            {/* Main Content Area */}
            <div className="absolute inset-0 flex items-center justify-center">
                {isVideoSlide ? (
                    isVideoPlaying ? (
                        <iframe
                            src={video?.embedUrl}
                            title="Property Video"
                            className="w-full h-full object-cover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div
                            className="relative w-full h-full cursor-pointer group/video"
                            onClick={() => setIsVideoPlaying(true)}
                        >
                            {/* Video Thumbnail */}
                            <img
                                src={currentImageUrl}
                                alt="Video Thumbnail"
                                className="w-full h-full object-cover opacity-90 transition-opacity group-hover/video:opacity-100"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover/video:bg-black/20">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover/video:scale-110">
                                    <Play size={32} className="text-neutral-900 ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-black/70 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
                                    Product Video
                                </span>
                            </div>
                        </div>
                    )
                ) : (
                    <img
                        src={currentImageUrl}
                        alt={`${title} - Photo ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover animate-in fade-in duration-300"
                    />
                )}
            </div>

            {/* Navigation Controls (Only if > 1 slide) */}
            {totalSlides > 1 && (
                <>
                    {/* Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-neutral-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10 hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-neutral-900 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10 hidden md:block"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots / Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {Array.from({ length: Math.min(totalSlides, 5) }).map((_, idx) => {
                            // Simple dot logic for first few, theoretically could be complex
                            // For now just show up to 5 dots or all if small
                            const isActive = idx === currentIndex;
                            return (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); goToSlide(idx); }}
                                    className={`w-2 h-2 rounded-full transition-all shadow-sm ${isActive
                                        ? 'w-6 bg-white'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            );
                        })}
                    </div>

                    {/* Count Indicator (Mobile mostly, or overlay) */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                        {currentIndex + 1} / {totalSlides}
                    </div>
                </>
            )}
        </div>
    );
};
