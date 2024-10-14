import { comment } from "postcss";
import React from "react";

const Discussion: React.FC = ({ rootComments }) => {
  return (
    <>
      {rootComments.length > 0 ? (
        rootComments.map((comment) => {
          // Destructure properties within the function body
          const { comment_id, yap_id, parent_comment_id, user_id, content, created_at, like_count, reply_count } = comment; // Indirect destructuring
          
          return ( // Return JSX after destructuring
            <div key={comment_id}>
              <p>{content}</p>
              <p>{yap_id}</p>
              <h1>{created_at}</h1>
              {/* You can use other properties here if needed */}
            </div>
          );
        })
      ) : (
        <p>No comments available</p> // Fallback message for no comments
      )}
    </>
  )
}

export default Discussion;