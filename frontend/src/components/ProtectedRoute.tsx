import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Props {
  // children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = () => {

  const { isAuthenticated } = useAuth();

  return (
    isAuthenticated
      ? <Outlet />
      : <Navigate to='/auth/login' replace />
  )
}
export default ProtectedRoute;
