import { Request, Response } from "express";
import db from "../db";

export const repostYap = (req: Request, res: Response) => {
  const { creator_id, original_yap_id, currentUser } = req.body;
  const insertRepostQuery = 
    `INSERT INTO reposts (creator_id, original_yap_id, repost_user_id, created_at) VALUES (?, ?, ?, ?)`;
  const values = [creator_id, original_yap_id, currentUser, new Date()];  
  db.query(insertRepostQuery, values, (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    const updateRepostCountQuery = 
      `UPDATE yaps set repost_count = repost_count + 1 WHERE yap_id = ?`;
    db.query(updateRepostCountQuery, [original_yap_id], (err, data: any[]) => {
      if(err) return res.status(500).json(err);
      res.status(200).json("Repost count updated successfully");
    })
  });
}

export const removeRepostYap = (req: Request, res: Response) => {
  const { original_yap_id, currentUser } = req.body;
  const deleteRepostQuery = `DELETE FROM reposts WHERE original_yap_id = ? AND repost_user_id = ?`;
  const values = [original_yap_id, currentUser];
  db.query(deleteRepostQuery, values, (err, data: any[]) => {
    if(err) return res.status(500).json(err);
    const updateRepostCountQuery = `UPDATE yaps set repost_count = repost_count - 1 WHERE yap_id = ?`;
    db.query(updateRepostCountQuery, [original_yap_id], (err, data: any[]) => {
      if(err) return res.status(500).json(err);
      res.status(200).json("Repost count updated successfully");
    })
  })
}
