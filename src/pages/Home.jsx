import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCities from '@/components/home/FeaturedCities';
import AllCitiesSection from '@/components/home/AllCitiesSection';
import HowItWorks from '@/components/home/HowItWorks';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCities />
      <AllCitiesSection />
      <HowItWorks />
    </div>
  );
}