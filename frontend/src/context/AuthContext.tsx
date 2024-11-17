import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import authServices from "@/services/auth";


type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (param: boolean) => void;
}

type AuthProviderProps = {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token')
  });
  // const navigate = useNavigate()

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}