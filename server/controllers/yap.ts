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

export const getYaps = (req: Request, res: Response) => {
  const q = `
  SELECT 
  users.username, users.profile_pic_url, yaps.*
FROM 
  users
JOIN 
  yaps
ON 
  users.user_id = yaps.user_id
ORDER BY 
  yaps.created_at DESC;
  `;
  db.query(q, (err, data: any[]) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};
