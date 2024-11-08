import React from 'react';

interface Props {

}

const HowItWorks: React.FC<Props> = (props) => {

  const howItWorks = [
    {
      id: '1',
      title: 'Buyer Sends Payment',
      text: 'Buyer securely sends payment to our escrow system.'
    },
    {
      id: '2',
      title: 'Funds Held Safely',
      text: 'Payment is held securely until the transaction is completed.'
    },
    {
      id: '3',
      title: 'Seller Fulfils the Order',
      text: 'The seller prepares and delivers the order as requested'
    },
    {
      id: '4',
      title: 'Buyer Receives and Inspects',
      text: 'Buyer receives the order and verifies its quality'
    },
    {
      id: '5',
      title: 'Complaint Period',
      text: 'A brief window for buyers to report any issues'
    },
    {
      id: '6',
      title: 'Funds Released to Seller',
      text: 'Once approved, funds are released to the seller'
    },
  ]

  return (
    <section className='w-full mt-24'>
      <h3 className='text-center font-semibold text-2xl xl:text-4xl text-pry-black tracking-tighter'>
        How Does It Work
      </h3>

      <div className='mt-14 w-full h-full lg:h-[463px] pl-6'>
        <ol className='p-2 list-decimal grid md:grid-cols-2 xl:grid-cols-3 gap-7 xl:gap-[74px] justify-items-center' type={"1"}>
          {
            howItWorks.map(item => (
              <li key={item.id} className='text-pry text-[28px] font-semibold'>
                <span className='text-[28px] leading-[28px] tracking-tighter'>
                  {item.title}
                </span>
                <p className='text-pry-black text-xl font-normal pt-[15px]'>
                  {item.text}
                </p>
              </li>
            ))
          }
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
