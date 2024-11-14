import { createContext, ReactNode, useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom';


type AuthContextType = {
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  // const navigate = useNavigate()

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
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