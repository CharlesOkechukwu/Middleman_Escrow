import React from 'react';
import FeatureCard from '../ui/FeatureCard';
import { Button } from '../ui/button';

interface Props {

}

const OurFeatures: React.FC<Props> = (props) => {

  const cardItems = [
    {
      id: '1',
      image: 'image1',
      cardTitle: 'Secure Transactions',
      cardDesc: 'Experience peace of mind with our escrow services, ensuring both buyers and sellers are protected.',
      alt: 'badge icon'
    },
    {
      id: '2',
      image: 'image2',
      cardTitle: 'Instant Notifications',
      cardDesc: 'Stay up-to-date on your orders with real-time notifications about payments and deliveries',
      alt: 'notification icon'
    },
    {
      id: '3',
      image: 'image3',
      cardTitle: 'User-Friendly Interface',
      cardDesc: 'Our intuitive platform makes it easy to navigate, manage orders, and track payments with just a few clicks',
      alt: 'user icon'
    },
    {
      id: '4',
      image: 'image4',
      cardTitle: 'Dispute Resolution',
      cardDesc: 'Resolve conflicts quickly and fairly with our transparent dispute resolution system',
      alt: 'justice icon'
    },
  ]

  return (
    <section className='w-full mt-16 xl:mt-[140px]'>
      <section className='flex flex-col justify-between w-full h-full xl:h-[475px]'>
        <h3 className='text-pry-black text-xl font-semibold text-center lg:text-4xl'>
          Our Features
        </h3>
        <div className='flex flex-wrap justify-center xl:grid xl:grid-cols-4 xl:justify-items-center gap-[25px] pt-[34px]'>
          {
            cardItems.map(item => (
              <FeatureCard key={item.id} {...item} />
            ))
          }
        </div>
      </section>
      <div className='py-14'>
        <p className='text-center text-xl lg:text-3xl'>
          Ready to make secure transactions? Join now and start experiencing <br className='hidden xl:block' />hassle-free business management
        </p>

        <div className='mt-8 flex w-full gap-4 lg:gap-10 justify-center'>
          <Button className='bg-pry-black text-gray font-semibold rounded-[10px] h-14 w-[200px] text-xl'>
            Buy Now
          </Button>
          <Button variant='outline' className='bg-white border border-pry-black text-pry-black font-semibold rounded-[10px] text-xl h-14 w-[200px]'>
            Sell Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export default OurFeatures;
