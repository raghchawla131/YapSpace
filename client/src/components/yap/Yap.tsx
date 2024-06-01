import React, { useEffect, useState } from "react";
import "./Yap.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";

const Yap = () => {
  const [yaps, setYaps] = useState([]);

  const fetchYaps = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/yap/get_yaps");
      setYaps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYaps();
  }, []);

  const getTimeDifference = (createdAt: string): string => {
    const createdAtDate = new Date(createdAt);
    const timeDifference = Date.now() - createdAtDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference}s`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference}m`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference}h`;
    } else {
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference}d`;
    }
  };

  return (
    <>
      {yaps &&
        yaps.map((yap: any) => (
          <div key={yap.yap_id}>
            <div className="yap">
              <div className="yap__left">
                <img className="yap__avatar" src={yap.profile_pic_url} alt="" />
              </div>
              <div className="yap__right">
                <div className="yap__header">
                  <div className="yap__username">
                    <p className="yap__username-text">{yap.username}</p>
                  </div>
                  <div className="yap__timestamp">
                    <p className="yap__timestamp-text">
                      {getTimeDifference(yap.created_at)}
                    </p>
                  </div>
                </div>
                <div className="yap__content">
                  <p className="yap__content-text">{yap.content}</p>
                </div>
                <div className="yap__actions">
                  <div className="yap__action yap__action--like">
                    <FaRegHeart className="yap__icon yap__icon--like" />
                    <p className="yap__count yap__count--like">543</p>
                  </div>
                  <div className="yap__action yap__action--comment">
                    <FaRegComment className="yap__icon yap__icon--comment" />
                    <p className="yap__count yap__count--comment">25</p>
                  </div>
                  <div className="yap__action yap__action--repost">
                    <LuRepeat2 className="yap__icon yap__icon--repost" />
                    <p className="yap__count yap__count--repost">28</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="yap__divider"></div>
          </div>
        ))}
    </>
  );
};

export default Yap;
