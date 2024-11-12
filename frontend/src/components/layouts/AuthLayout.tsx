import React from 'react';
import { Outlet } from 'react-router-dom';

interface Props {

}

const AuthLayout: React.FC<Props> = (props) => {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
