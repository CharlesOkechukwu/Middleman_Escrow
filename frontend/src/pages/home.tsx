import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import OurFeatures from '@/components/landing/OurFeatures';
import Subscribe from '@/components/landing/Subscribe';
import React from 'react';

interface Props {

}

const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <section className='w-full lg:w-[900px] xl:w-1197 mx-auto px-5 xl:px-0'>
        <HeroSection />
        <OurFeatures />
        <HowItWorks />
      </section>
      <Subscribe />
    </>
  );
}

export default HomePage;
