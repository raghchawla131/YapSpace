import React, { useContext, useEffect, useState } from "react";
import "./Yap.css";
import axios from "axios";

import { FaRegComment } from "react-icons/fa";
import { authContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";

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
  isReposted: boolean;
}

interface Props {
  profileUserId: number | null;
}

const Yap: React.FC<Props> = ({ profileUserId }) => {
  const { currentUser } = useContext(authContext) ?? {};
  const [yaps, setYaps] = useState<YapData[]>([]);
  const location = useLocation();

  const fetchYaps = async () => {
    try {
      let url;
      if (location.pathname.includes("/profile")) {
        url = "http://localhost:8000/api/yap/get_profile_yaps";
      } else {
        url = "http://localhost:8000/api/yap/get_yaps";
      }

      const res = await axios.post(url, {
        userId: currentUser,
        profileUserId: profileUserId,
      });
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
    const updatedYaps = yaps.map((yap) =>
      yap.yap_id === yap_id
        ? {
            ...yap,
            isLiked: !yap.isLiked,
            like_count: yap.like_count + (yap.isLiked ? -1 : 1),
          }
        : yap
    );
    setYaps(updatedYaps);
    if (currentUser) {
      try {
        const url = isLiked
          ? "http://localhost:8000/api/like/unlike_yap"
          : "http://localhost:8000/api/like/like_yap";
        const res = await axios.post(url, {
          user_id: currentUser,
          yap_id,
        });
        if (Array.isArray(res.data)) {
          setYaps(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleRepost = async (creator_id: number, original_yap_id: number, isReposted: boolean) => {
    if (currentUser === creator_id) {
      return;
    }

    const updatedYaps = yaps.map((yap) => 
      yap.yap_id === original_yap_id
        ? {
          ...yap,
          isReposted: !isReposted,
          repost_count: yap.repost_count + (yap.isReposted ? -1 : 1)
          }
        : yap
    );
    setYaps(updatedYaps);
    try {
      const url = isReposted
       ? "http://localhost:8000/api/repost/remove_repost_yap"
       : "http://localhost:8000/api/repost/repost_yap"
      const res = await axios.post(url, {
        creator_id: creator_id,
        original_yap_id: original_yap_id,
        currentUser: currentUser,
      });
      if (Array.isArray(res.data)) {
        setYaps(res.data);
      }
    } catch (error) {
      console.log(error);
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
                      //type error can be ignored
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
                  <div
                    onClick={() => {
                      toggleRepost(yap.user_id, yap.yap_id, yap.isReposted);
                    }}
                    className="yap__action yap__action--repost"
                  >
                    {yap.isReposted ? (
                      <ion-icon
                      className="yap__icon yap__icon--repost"
                      name="git-compare-sharp"
                    ></ion-icon>
                    ) : (
                      <ion-icon
                        className="yap__icon yap__icon--repost"
                        name="git-compare-outline"
                      ></ion-icon>
                    )}

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
