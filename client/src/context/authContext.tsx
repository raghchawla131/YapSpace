import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  user_id: number;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (authData: {email: string, password: string}) => Promise<void>;
  signup: (authData: {email: string, password: string, username: string}) => Promise<void>;
}

interface LoginDataTypes {
  email: string;
  password: string;
}

interface SignupDataTypes extends LoginDataTypes {
  username: string;
}

export const authContext = createContext<AuthContextType | undefined>(undefined);

const getUserFromLocalStorage = (): User | null => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing JSON from localStorage', error);
    return null;
  }
};

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getUserFromLocalStorage);

  const login = async (authData: LoginDataTypes): Promise<void> => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      authData,
      { withCredentials: true, }
    );
    setCurrentUser(res.data);
  }

  const signup = async (authData: SignupDataTypes): Promise<void> => {
    await axios.post("http://localhost:8000/api/auth/signup", authData);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser]);

  return (
    <authContext.Provider value={{ currentUser, login, signup }}>
      {children}
    </authContext.Provider>
  )
}