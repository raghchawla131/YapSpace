import { Request, Response } from "express";
import db from "../db";

export const info = (req: Request, res: Response) => {
  const q = "SELECT * from users WHERE user_id = ?";
  db.query(q, [req.body.user_id], (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data[0]);
  })
}