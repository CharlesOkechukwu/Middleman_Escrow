import React, { forwardRef, useState } from 'react';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { Input } from '../ui/input';


interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string;
  type: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ errorMsg, type, ...props }, ref) => {

    const [showPassword, setShowPassword] = useState(false);

    const getType = type === 'password'
      ? showPassword
        ? 'text'
        : type
      : type

    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }

    return (
      <>
        <div className='w-full flex items-center h-[63px] rounded-[10px] bg-white border border-grey1 px-5'>
          <Input
            type={getType}
            ref={ref}
            {...props}
            className='w-full border-none rounded-[10px] h-full bg-white'
          />
          {type === 'password' &&
            <span onClick={handleTogglePassword} className='block cursor-pointer'>
              {showPassword ? <IoEyeSharp className='text-xl text-[#B8B8B8]' /> : <IoEyeOffSharp className='text-xl text-[#B8B8B8]' />}
            </span>
          }
        </div>
        {errorMsg && <div className="text-red-500 text-xs mt-2">{errorMsg}</div>}
      </>
    )
  }
)