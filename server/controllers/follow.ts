import { Request, Response } from "express";
import db from "../db";

export const followUser = (req: Request, res: Response) => {
  const { follower_id, following_id } = req.body;
  console.log(follower_id, following_id);
  
  const q =
    "INSERT INTO followers_following (follower_id, following_id) VALUES (?, ?)";
  db.query(q, [follower_id, following_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "User followed" });
  });
};

export const unfollowUser = (req: Request, res: Response) => {
  const { follower_id, following_id } = req.body;
  const q = "DELETE FROM followers_following WHERE follower_id = ? AND following_id = ?";
  db.query(q, [follower_id, following_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "User unfollowed" });
  });
}

export const isFollowing = (req: Request, res: Response) => {
  const { follower_id, following_id } = req.body;
  const q = "SELECT * FROM followers_following WHERE follower_id = ? AND following_id = ?";
  db.query(q, [follower_id, following_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Type assertion to treat `results` as an array of rows
    const rows = data as any[];

    // Check if the rows array has any items
    if (rows.length > 0) {
      res.status(200).json({ isFollowing: true });
    } else {
      res.status(200).json({ isFollowing: false });
    }
  });
};
