import React from "react";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Discussion: React.FC = ({ rootComments }) => {
  const navigate = useNavigate();

  const addComment = (comment_id: number) => {
    navigate(`/add-comment/${comment_id}`);
  };

  const formattedTime = (created_at: Date) => {
    const date = new Date(created_at);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    return (
      <p className=" text-gray-400 text-opacity-60">{formattedTime} ago</p>
    );
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
            <div key={comment_id} className=" m-3 flex gap-2">
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
                  {formattedTime(created_at)}
                </div>
                <div>
                  <p>{content}</p>
                </div>
                <div className=" flex items-center gap-6">
                  <div className=" flex items-center">
                    <ion-icon name="heart-outline"></ion-icon>
                    <p>1</p>
                  </div>
                  <div
                    className=" flex items-center"
                    onClick={() => addComment(comment_id)}
                  >
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
