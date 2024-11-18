import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import NavIcon from './NavIcon';



interface Props {
  name: string;
  path: string;
  dropdown: boolean;
  icon: string;
  id: string;
}

const SideNavItem: React.FC<Props> = (props) => {
  const { name, path, dropdown, icon, id } = props;
  console.log(id)
  return (
    <>
      <div className='flex gap-x-2.5 items-center'>
        <NavIcon icon={icon} />
        <NavLink to={path} className='capitalize'>
          {name}
        </NavLink>
      </div>
      {/* {dropdown ?
        (
          <Accordion type="single" collapsible>
            <AccordionItem value={`item-${id}`} className='border-none'>
              <AccordionTrigger className='py-0 text-[16px] font-normal'>
                <div className='flex gap-x-2.5 items-center'>
                  <NavIcon icon={icon} />
                  <h5 className='capitalize'>
                    {name}
                  </h5>
                </div>
              </AccordionTrigger>
              <AccordionContent className='pl-7 pt-2'>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        
        )
        : (
          <div className='flex gap-x-2.5 items-center'>
            <NavIcon icon={icon} />
            <NavLink to={path} className='capitalize'>
              {name}
            </NavLink>
          </div>
        )
      } */}

    </>
  );
}

export default SideNavItem;
