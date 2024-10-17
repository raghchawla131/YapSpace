import { Request, Response } from "express";
import db from "../db";
import { Query } from "mysql2/typings/mysql/lib/protocol/sequences/Query";

export const addComment = (req: Request, res: Response) => {
  const { yap_id, parent_comment_id, user_id, content } = req.body;
  const insertCommentQuery =
    "INSERT INTO comments (yap_id, parent_comment_id, user_id, content) VALUES (?, ?, ?, ?)";
  db.query(
    insertCommentQuery,
    [yap_id, parent_comment_id, user_id, content],
    (err, data) => {
      if (err)
        return res.status(500).json({ message: "Error adding comment", err });
      res.status(201).json({ message: "Comment added successfully" });
    }
  );
};
export const getComments = async (req: Request, res: Response) => {
  const { yap_id } = req.params;

  try {
    // SQL query to fetch comments with the user's username and profile_pic_url
    const query = `
      SELECT 
   comments.comment_id, 
  comments.yap_id, 
  comments.parent_comment_id, 
  comments.user_id, 
  comments.content, 
  comments.created_at, 
  comments.like_count, 
  comments.reply_count, 
  users.username, 
  users.profile_pic_url
FROM comments
JOIN users ON comments.user_id = users.user_id
WHERE comments.yap_id = ?
AND comments.parent_comment_id IS NULL
ORDER BY comments.created_at ASC;

    `;

    const values = [yap_id];

    // Execute the query
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ error: "Failed to fetch comments" });
      }

      // Send back the comments with user data
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      error: "An unexpected error occurred while fetching comments",
    });
  }
};
