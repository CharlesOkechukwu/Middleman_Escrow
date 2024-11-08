import HeroSection from '@/components/landing/HeroSection';
import OurFeatures from '@/components/landing/OurFeatures';
import React from 'react';

interface Props {

}

const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <HeroSection />
      <OurFeatures />
    </>
  );
}

export default HomePage;
