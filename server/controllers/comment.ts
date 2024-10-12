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
  const { parent_comment_id } = req.query; // parent_comment_id from query params
  // console.log(yap_id, parent_comment_id);

  try {
    let query;
    let values;

    if (parent_comment_id === "null" || !parent_comment_id) {
      // Fetch root comments (no parent_comment_id)
      query = `
        SELECT * FROM comments
        WHERE yap_id = ?
        AND parent_comment_id IS NULL
        ORDER BY created_at ASC
      `;
      values = [yap_id];
    } else {
      // Fetch replies for a specific comment
      query = `
        SELECT * FROM comments
        WHERE yap_id = ?
        AND parent_comment_id = ?
        ORDER BY created_at ASC
      `;
      values = [yap_id, parent_comment_id];
    }

    // Execute the database query
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ error: "Failed to fetch comments" });
      }

      // Send back the comments as a response
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred while fetching comments" });
  }
};
