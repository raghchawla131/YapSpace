import { Request, Response } from "express";
import db from "../db";

export const createYap = (req: Request, res: Response) => {
  const q = `INSERT INTO yaps (user_id, content, created_at) VALUES (?, ?, ?)`;
  const values = [req.body.user_id, req.body.yapText, new Date()];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("Yap created successfully");
  });
}