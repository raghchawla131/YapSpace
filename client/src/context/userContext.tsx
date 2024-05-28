import { createContext, ReactNode } from "react";

interface UserContextType {
  
}

export const userContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({children}: {children: ReactNode}) => {

  const fetchUserInfo = async() => {

  }

  return (
    <userContext.Provider value={{}}>
      {children}
    </userContext.Provider>
  )
}