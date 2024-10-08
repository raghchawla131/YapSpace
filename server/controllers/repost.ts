import { Request, Response } from "express";
import db from "../db";

export const repostYap = (req: Request, res: Response) => {
  const { creator_id, original_yap_id, currentUser } = req.body;  

  // Check if the user has already reposted the yap
  const checkRepostQuery = `
    SELECT * FROM reposts WHERE original_yap_id = ? AND repost_user_id = ?`;
  const checkValues = [original_yap_id, currentUser];

  db.query(checkRepostQuery, checkValues, (err, results: any[]) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      // If a repost already exists, return a message
      return res.status(400).json("You have already reposted this yap.");
    }

    // If no repost exists, proceed with the repost operation
    const insertRepostQuery = `
      INSERT INTO reposts (creator_id, original_yap_id, repost_user_id, reposted_at)
      VALUES (?, ?, ?, ?)`;
    const insertValues = [creator_id, original_yap_id, currentUser, new Date()];

    db.query(insertRepostQuery, insertValues, (err, data: any[]) => {
      if (err) return res.status(500).json(err);

      const updateRepostCountQuery = `
        UPDATE yaps SET repost_count = repost_count + 1 WHERE yap_id = ?`;
      db.query(updateRepostCountQuery, [original_yap_id], (err, data: any[]) => {
        if (err) return res.status(500).json(err);

        res.status(200).json("Repost successful");
      });
    });
  });
};


export const removeRepostYap = (req: Request, res: Response) => {
  const { original_yap_id, currentUser } = req.body;
  const deleteRepostQuery = `
    DELETE FROM reposts
    WHERE original_yap_id = ? AND repost_user_id = ?`;
  const values = [original_yap_id, currentUser];

  db.query(deleteRepostQuery, values, (err, data: any[]) => {
    if (err) return res.status(500).json(err);

    const updateRepostCountQuery = `
      UPDATE yaps SET repost_count = repost_count - 1 WHERE yap_id = ?`;
    db.query(updateRepostCountQuery, [original_yap_id], (err, data: any[]) => {
      if (err) return res.status(500).json(err);

      res.status(200).json("Repost removed successfully");
    });
  });
};
