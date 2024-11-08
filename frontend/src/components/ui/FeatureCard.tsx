import React from 'react';


const FeatureCard: React.FC<FeatureCardProps> = (props) => {

  const { image, alt, cardDesc, cardTitle } = props;

  const imageUrl = new URL(`../../assets/images/features/${image}.png`, import.meta.url);

  return (
    <div className='bg-pry text-gray flex flex-col items-center rounded-[19px] h-[398px] w-[281px] py-[17px] px-5 gap-3.5'>
      <div className='w-[160px] h-[160px] rounded-full bg-pry-light flex items-center justify-center'>
        <div className='w-[123px] h-[123px] rounded-full bg-gray flex items-center justify-center'>
          <img src={`${imageUrl}`} alt={alt} />
        </div>
      </div>

      <div>
        <h4 className='font-semibold text-[31px] leading-[31px] tracking-tighter'>
          {cardTitle}
        </h4>
        <p className='pt-3'>
          {cardDesc}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
