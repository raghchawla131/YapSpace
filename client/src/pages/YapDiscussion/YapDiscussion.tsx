import React, { useContext, useEffect, useState } from "react";
import "./YapDiscussion.css";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import Yap from "../../components/yap/Yap";
import Discussion from "../../components/discussion/Discussion";

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
  parent_comment_id: number | null;
  user_id: number;
  content: string;
  // other properties of CommentData
}

const YapDiscussion: React.FC = () => {
  const { currentUser } = useContext(authContext) ?? {};
  const { yap_id } = useParams<{ yap_id: string }>();
  const [yap, setYap] = useState<YapData | null>(null);
  const [rootComments, setRootComments] = useState<CommentData[]>([]);
  const [nestedComments, setNestedComments] = useState<
    Record<number, CommentData[]>
  >({});

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const fetchYapData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/yap/get_yap_by_id",
        {
          userId: currentUser,
          yapId: yap_id,
        }
      );
      setYap(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (parentCommentId: number | null) => {
    try {
      const res = await axios.get(
        `http://localhost:8001/api/comment/get_root_comments/${yap_id}`,
        {
          params: {
            parent_comment_id: parentCommentId,
          },
        }
      );
      const comments: CommentData[] = res.data;
      if (parentCommentId === null) {
        setRootComments(comments);
      } else {
        setNestedComments((prev) => ({
          ...prev,
          [parentCommentId]: comments,
        }));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchYapData();
    fetchComments(null); //because you are clicking on root comment by default
  }, [yap_id]);

  return (
    <>
      <div>
        <header className="yap-discussion-header">
          <div className="yap-discussion-header__back-icon">
            <IoMdArrowBack
              onClick={handleClose}
              className="yap-discussion-header__icon"
            />
          </div>
          <div className="yap-discussion-header__title">
            <h2>Yap</h2>
          </div>
        </header>
        <Yap yap={yap} />
        <Discussion rootComments={rootComments} />
      </div>
    </>
  );
};

export default YapDiscussion;
