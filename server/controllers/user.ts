import { Request, Response } from "express";
import db from "../db";

export const info = (req: Request, res: Response) => {
  const q = "SELECT * FROM users WHERE user_id = ?";
  db.query(q, [req.body.user_id], (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    if(data.length > 0) {
      const userData = data[0];
      delete userData.password_hash;
      res.status(200).json(userData);
    }
    else {
      res.status(404).json({message: "User not found"});
    }
  })
}