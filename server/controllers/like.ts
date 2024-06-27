import { Request, Response } from "express";
import db from "../db";

export const likeYap = (req: Request, res: Response) => {
  const { user_id, yap_id } = req.body;
  const insertLikeQuery =
    "INSERT INTO likes (yap_id, user_id, created_at) VALUES (?, ?, ?)";
  const values = [yap_id, user_id, new Date()];
  db.query(insertLikeQuery, values, (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    const updateLikeCountQuery =
      "UPDATE yaps SET like_count = like_count + 1 WHERE yap_id = ?";
    db.query(updateLikeCountQuery, [yap_id], (err, data: any[]) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Yap liked successfully");
    });
  });
};

export const unlikeYap = (req: Request, res: Response) => {
  const { user_id } = req.body;
  const { yap_id } = req.body;
  const deleteLikeQuery = "DELETE FROM likes WHERE yap_id = ? AND user_id = ?";
  const values = [yap_id, user_id];
  db.query(deleteLikeQuery, values, (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    const updateLikeCountQuery =
      "UPDATE yaps SET like_count = like_count - 1 WHERE yap_id = ?";
    db.query(updateLikeCountQuery, [yap_id], (err, data: any[]) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Yap unliked successfully");
    });
  });
};
