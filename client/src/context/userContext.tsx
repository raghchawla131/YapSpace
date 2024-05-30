import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface UserInfo {
  user_id: number;
  email: string;
  username: string;
  profile_pic_url: string | null;
  bio: string | null;
  name: string | null;
}

interface UserContextType {
  userInfo: UserInfo | null;
  fetchUserInfo: (currentUser: number) => Promise<void>;
}

export const userContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({children}: {children: ReactNode}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async(currentUser: number): Promise<void> => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/info", {
          user_id: currentUser,
        });        
        setUserInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <userContext.Provider value={{ userInfo, fetchUserInfo }}>
      {children}
    </userContext.Provider>
  )
}