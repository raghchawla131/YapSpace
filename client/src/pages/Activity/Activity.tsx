import { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/authContext'
import axios from 'axios';

interface Notification {
  id: number;
  user_id: number;
  triggered_by: number;
  type: string;
  yap_id?: number;
  content?: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsResponse {
  data: Notification[];
  message: string;
}

const Activity = () => {
  const { currentUser } = useContext(authContext) || {};
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = useCallback(async () => {
    if (currentUser) {
      try {
        const response = await axios.post<NotificationsResponse>(
          "http://localhost:8001/api/notification/getNotifications",
          {
            user_id: currentUser, 
            is_read: true,
            limit: 10,
            offSet: 0,
          }
        )        
        setNotifications(response.data.data);
      } catch (error) {
        console.log("Error fetching notifications", error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div>{currentUser}</div>
  )
}

export default Activity

function useCallback(arg0: () => Promise<void>, arg1: (User | null | undefined)[]) {
  throw new Error('Function not implemented.');
}
