import React, { useContext, useEffect, useState } from "react";
import "./Yap.css";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { authContext } from "../../context/authContext";


interface YapData {
  username: string;
  profile_pic_url: string;
  yap_id: number;
  user_id: number;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  repost_count: number;
  isLiked: boolean;
}

const Yap = () => {
  const { currentUser } = useContext(authContext) ?? {};
  
  const [yaps, setYaps] = useState<YapData[]>([]);

  const fetchYaps = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/yap/get_yaps", {userId: currentUser});
      setYaps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {    
    fetchYaps();
  }, [currentUser]);

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

  const toggleLike = async (yap_id: number, isLiked: boolean) => {
    const updatedYaps = yaps.map(yap =>
      yap.yap_id === yap_id ? { ...yap, isLiked: !yap.isLiked, like_count: yap.like_count + (yap.isLiked ? -1 : 1) } : yap
    );
    setYaps(updatedYaps);
    if(currentUser) {
      try {
        const url = isLiked
          ? "http://localhost:8000/api/like/unlike_yap"
          : "http://localhost:8000/api/like/like_yap";
        const res = await axios.post(url, {
          user_id: currentUser,
          yap_id,
        });      
        if(Array.isArray(res.data)) {
          setYaps(res.data);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  return (
    <>
      {yaps &&
        yaps.map((yap: YapData) => (
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
                  <div
                    onClick={() => {
                      toggleLike(yap.yap_id, yap.isLiked);
                    }}
                    className="yap__action yap__action--like"
                  >
                    {yap.isLiked ? (
                      <ion-icon
                        className="yap__icon yap__icon--like"
                        name="heart"
                        style={{ color: "red" }}
                      ></ion-icon>
                    ) : (
                      <ion-icon
                        className="yap__icon yap__icon--like"
                        name="heart-outline"

                      ></ion-icon>
                    )}
                    <p className="yap__count yap__count--like">
                      {yap.like_count}
                    </p>
                  </div>
                  <div className="yap__action yap__action--comment">
                    <FaRegComment className="yap__icon yap__icon--comment" />
                    <p className="yap__count yap__count--comment">
                      {yap.comment_count}
                    </p>
                  </div>
                  <div className="yap__action yap__action--repost">
                    <LuRepeat2 className="yap__icon yap__icon--repost" />
                    <p className="yap__count yap__count--repost">
                      {yap.repost_count}
                    </p>
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
