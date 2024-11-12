import React, { useState } from 'react';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { authFormSchema } from '@/lib/utils';



const formSchema = authFormSchema

interface Props {
  name: FieldPath<z.infer<typeof formSchema>>;
  control: Control<z.infer<typeof formSchema>>;
  type: string;
  placeholder: string;
  inputId: string;
}

const CustomInput: React.FC<Props> = (props) => {

  const [showPassword, setShowPassword] = useState(false)

  const {
    name,
    control,
    type,
    placeholder,
    inputId
  } = props;

  const getType = type === 'password'
    ? showPassword
      ? 'text'
      : type
    : type

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3'>
              <Input
                id={inputId}
                type={getType}
                placeholder={placeholder}
                {...field}
                className='w-full border-none rounded-[10px] h-full bg-white'
              />
              {
                type === 'password'
                && (
                  <button type='button' onClick={handleTogglePassword}>
                    {showPassword ?
                      <Eye className='text-[#B8B8B8]' />
                      : <EyeOff className='text-[#B8B8B8]' />

                    }
                  </button>
                )
              }

            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
