import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DefaultLayout } from './components/layouts/DefaultLayout';
import HomePage from './pages/home';
import AuthLayout from './components/layouts/AuthLayout';
import LoginPage from './pages/auth/login';
import SignUp from './pages/auth/sign-up';



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
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
