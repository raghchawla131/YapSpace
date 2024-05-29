import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authContext } from '../../context/authContext'
import "./CreatePost.css"

const CreatePost: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null);

  const {currentUser} = useContext(authContext);  
  
  const fetchUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/info", {user_id: currentUser})
      console.log(res.data);
      setUserInfo(res.data);
    } catch (error) {
      console.log(error);
      
    }  
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      <div>
        
      </div>
    </>
    
  )
}

export default CreatePost