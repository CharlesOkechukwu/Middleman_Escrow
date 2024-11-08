import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import OurFeatures from '@/components/landing/OurFeatures';
import React from 'react';

interface Props {

}

const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <HeroSection />
      <OurFeatures />
      <HowItWorks />
    </>
  );
}

export default HomePage;
