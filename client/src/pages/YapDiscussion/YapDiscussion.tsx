import React, { useContext, useEffect, useState } from "react";
import "./YapDiscussion.css";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import axios from "axios";
import { IoMdArrowBack } from "react-icons/io";
import Yap from "../../components/yap/Yap";

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

const YapDiscussion: React.FC = () => {
  const { currentUser } = useContext(authContext) ?? {};
  const { yap_id } = useParams<{ yap_id: string }>();
  const [yap, setYap] = useState<YapData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);

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

  const fetchComments = async () => {
    // Implement the function to fetch comments
  };

  useEffect(() => {
    fetchYapData();
    fetchComments();
  }, [yap_id]);

  return (
    <>
      <div>
      <header className="yap-discussion-header">
        <div className="yap-discussion-header__back-icon">
          <IoMdArrowBack onClick={handleClose} className="yap-discussion-header__icon" />
        </div>
        <div className="yap-discussion-header__title">
          <h2>Yap</h2>
        </div>
      </header>
        <Yap yap={yap} />
      </div>
    </>
  );
};

export default YapDiscussion;
