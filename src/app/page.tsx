import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import FeaturedLocations from '@/components/home/FeaturedLocations';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import HowItWorks from '@/components/home/HowItWorks';
import WhyRoomboy from '@/components/home/WhyRoomboy';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <TrustStrip />
      <FeaturedLocations />
      <FeaturedProperties />
      <HowItWorks />
      <WhyRoomboy />
      <CallToAction />
    </main>
  );
}
