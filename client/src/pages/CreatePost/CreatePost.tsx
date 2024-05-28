import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authContext } from '../../context/authContext'
import "./CreatePost.css"

const CreatePost: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null);

  const {currentUser} = useContext(authContext);  
  
  const fetchUserData = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/info", userInfo)
      console.log(res);
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
        {
          userInfo && <p>{userInfo}</p>
        }
      </div>
    </>
    
  )
}

export default CreatePost