import React from "react";
import { FaRegComment } from "react-icons/fa";
import { addComment } from '../../../../server/controllers/comment';
import { useNavigate } from "react-router-dom";

const Discussion: React.FC = ({ rootComments }) => {
  const navigate = useNavigate();

  const addComment = () => {
    navigate('/add-comment/{comment_id}');
  };

  return (
    <>
      {rootComments.length > 0 ? (
        rootComments.map((comment) => {
          const {
            comment_id,
            yap_id,
            parent_comment_id,
            user_id,
            content,
            created_at,
            like_count,
            reply_count,
            username,
            profile_pic_url,
          } = comment;

          return (
            <div className=" m-3 flex gap-2">
              <div className=" flex gap-3">
                <img
                  className=" h-[50px] w-[50px] rounded-full"
                  src={profile_pic_url}
                  alt=""
                />
              </div>
              <div className=" flex flex-col gap-2">
                <div className=" flex gap-2">
                  <p className=" font-bold">{username}</p>
                  <p>{created_at}</p>
                </div>
                <div>
                  <p>{content}</p>
                </div>
                <div className=" flex items-center gap-6">
                  <div className=" flex items-center">
                    <ion-icon name="heart-outline"></ion-icon>
                    <p>1</p>
                  </div>
                  <div className=" flex items-center" onClick={() => addComment()}>
                    <FaRegComment />
                    <p>1</p>
                  </div>
                  <div className=" flex items-center">
                    <ion-icon name="repeat-outline"></ion-icon>
                    <p>1</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No comments available</p>
      )}
    </>
  );
};

export default Discussion;
