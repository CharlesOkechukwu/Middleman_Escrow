import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DefaultLayout } from './components/layouts/DefaultLayout';
import HomePage from './pages/home';
import AuthLayout from './components/layouts/AuthLayout';
import LoginPage from './pages/auth/login';
import SignUp from './pages/auth/sign-up';
import ResetPassword from './pages/auth/reset-password';
import ResetSuccess from './pages/auth/reset-success';
import VerifyEmail from './pages/auth/verify-email';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/dashboard/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';



const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />
      },
      {
        path: '/auth/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/auth/reset-success',
        element: <ResetSuccess />
      },
      {
        path: '/auth/verify-email',
        element: <VerifyEmail />
      },
    ]
  },
  {
    path: 'dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster />
    </>
  )
}

export default App
