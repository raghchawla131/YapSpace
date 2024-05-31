import React, { useEffect, useState } from 'react'
import './Yap.css'
import axios from 'axios';

const Yap = () => {
  const [yaps, setYaps] = useState([]);

  const fetchYaps = async() => {
    try {
      const res = await axios.post('http://localhost:8000/api/yap/get_yaps');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchYaps();
  })

  return (
    <>
      <div className="yap">
        
      </div>
    </>
  )
}

export default Yap