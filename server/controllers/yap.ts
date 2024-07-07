import { Request, Response } from "express";
import db from "../db";

export const createYap = (req: Request, res: Response) => {
  const q = `INSERT INTO yaps (user_id, content, created_at) VALUES (?, ?, ?)`;
  const values = [req.body.user_id, req.body.yapText, new Date()];
  db.query(q, values, (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Yap created successfully");
  });
};

export const getHomeYaps = (req: Request, res: Response) => {
  //this userId is of current logged in user
  const { userId } = req.body;
  const q = `
    SELECT 
  users.username, 
  users.profile_pic_url, 
  yaps.*, 
  IF(likes.user_id IS NULL, false, true) AS isLiked,
  IF(reposts.repost_user_id IS NULL, false, true) AS isReposted
FROM 
  users
JOIN 
  yaps ON users.user_id = yaps.user_id
LEFT JOIN 
  likes ON yaps.yap_id = likes.yap_id AND likes.user_id = ?
LEFT JOIN 
  reposts ON yaps.yap_id = reposts.original_yap_id AND reposts.repost_user_id = 5
ORDER BY 
  yaps.created_at DESC;
  `;
  db.query(q, [userId], (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getProfileYaps = (req: Request, res: Response) => {
  const { userId, profileUserId } = req.body;

  const q = `
SELECT 
  users.username, 
  users.profile_pic_url, 
  yaps.yap_id, 
  yaps.user_id, 
  yaps.content, 
  yaps.created_at, 
  yaps.like_count, 
  yaps.comment_count, 
  yaps.repost_count, 
  IF(likes.user_id IS NULL, false, true) AS isLiked,
  IF(reposts.repost_user_id IS NULL, false, true) AS isReposted
FROM 
  yaps
JOIN 
  users ON yaps.user_id = users.user_id
LEFT JOIN 
  likes ON yaps.yap_id = likes.yap_id AND likes.user_id = ?
LEFT JOIN 
  reposts ON yaps.yap_id = reposts.original_yap_id AND reposts.repost_user_id = ?
WHERE 
  yaps.user_id = ? OR reposts.repost_user_id = ?
ORDER BY 
  yaps.created_at DESC;
  `;

  db.query(
    q,
    [profileUserId, profileUserId, profileUserId, profileUserId],
    (err, data: any[]) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
