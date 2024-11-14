import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  showPwd: boolean;
  handleTogglePassword: () => void;
}

const ToggleEyeIcon: React.FC<Props> = ({ showPwd }) => {

  const [showPassword, setShowPassword] = useState(showPwd)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <button type='button' onClick={handleTogglePassword}>
      {showPassword ?
        <Eye className='text-[#B8B8B8]' />
        : <EyeOff className='text-[#B8B8B8]' />

      }
    </button>
  );
}

export default ToggleEyeIcon;
