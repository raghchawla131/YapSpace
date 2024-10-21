import React, { useContext, useEffect, useState } from "react";
import "./Yap.css";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { authContext } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../utils/dateUtils";

interface User {
  id: number;
}

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

interface CommentData {
  comment_id: number;
  yap_id: number;
  user_id: number;
  content: string;
  parent_comment_id: number | null;
  // other properties of CommentData
}

interface Props {
  profileUserId: number | null;
  yap?: YapData;
}

const Yap: React.FC<Props> = ({ profileUserId, yap }) => {
  const { currentUser } = useContext(authContext) ?? {};
  const [yaps, setYaps] = useState<YapData[]>([]);
  const [comments, setComments] = useState<CommentData[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchYaps = async () => {
    try {
      let url;
      if (location.pathname.includes("/profile")) {
        url = "http://localhost:8001/api/yap/get_profile_yaps";
      } else {
        url = "http://localhost:8001/api/yap/get_yaps";
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

  const toggleLike = async (yap_id: number, isLiked: boolean) => {
    const updatedYaps = yaps.map((yap) =>
      yap.yap_id === yap_id
        ? {
            ...yap,
            isLiked: !isLiked, // Use isLiked directly
            like_count: yap.like_count + (isLiked ? -1 : 1), // Subtract when unliking, add when liking
          }
        : yap
    );
    setYaps(updatedYaps);

    if (currentUser) {
      try {
        const url = isLiked
          ? "http://localhost:8001/api/like/unlike_yap"
          : "http://localhost:8001/api/like/like_yap";
        await axios.post(url, {
          user_id: currentUser,
          yap_id,
        });
      } catch (error) {
        console.log(error);
        // Optional: Revert the like state in case of an error
        const revertedYaps = yaps.map((yap) =>
          yap.yap_id === yap_id
            ? {
                ...yap,
                isLiked, // revert to previous state
                like_count: yap.like_count + (isLiked ? 1 : -1), // revert like count
              }
            : yap
        );
        setYaps(revertedYaps);
      }
    }
  };

  const toggleRepost = async (
    creator_id: number, //yap.user_id
    original_yap_id: number, //yap.yap_id
    isReposted: boolean //yap.isReposted
  ) => {
    if (currentUser) {
      if (creator_id === currentUser) {
        console.log("You can't repost your own yap");

        return;
      }
    }

    try {
      const url = isReposted
        ? "http://localhost:8001/api/repost/remove_repost_yap"
        : "http://localhost:8001/api/repost/repost_yap";

      await axios.post(url, {
        creator_id,
        original_yap_id,
        currentUser,
      });

      // Update local state only after backend operation is successful
      const updatedYaps = yaps.map((yap) =>
        yap.yap_id === original_yap_id
          ? {
              ...yap,
              isReposted: !yap.isReposted,
              repost_count: yap.repost_count + (yap.isReposted ? -1 : 1),
            }
          : yap
      );
      setYaps(updatedYaps);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (
    yap_id: number,
    user_id: number,
    username: string,
    profile_pic_url: string,
    content: string,
    currentUser: number
  ) => {
    navigate(`/add-comment/${yap_id}`, {
      state: { user_id, username, profile_pic_url, content, currentUser },
    });
  };

  const handleYapClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    yap: YapData
  ) => {
    if (
      (e.target as HTMLElement).closest(".yap__action") || // Exclude yap__action elements
      (e.target as HTMLElement).closest(".yap__icon") || // Exclude yap__icon elements
      (e.target as HTMLElement).closest(".yap__avatar") || // Exclude yap__avatar elements
      (e.target as HTMLElement).closest(".yap__header") // Exclude yap__header elements
    ) {
      return;
    }

    navigate(`/yap-discussion/${yap.yap_id}`);
  };

  useEffect(() => {
    if (yap) {
      setYaps([yap]);
    } else {
      fetchYaps();
    }
  }, [currentUser, profileUserId, yap]);

  return (
    <>
      {yaps &&
        yaps.map((yap: YapData) => (
          <div key={yap.yap_id}>
            <div onClick={(e) => handleYapClick(e, yap)} className="yap">
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
                  <div
                    onClick={() => {
                      addComment(
                        yap.yap_id,
                        yap.user_id,
                        yap.username,
                        yap.profile_pic_url,
                        yap.content,
                        currentUser
                      );
                    }}
                    className="yap__action yap__action--comment"
                  >
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
