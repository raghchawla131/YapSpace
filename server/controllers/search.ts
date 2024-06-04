import { Request, Response } from "express";
import db from "../db";

export const searchUser = (req: Request, res: Response) => {
  const searchValue = `%${req.body.username}%`;
  const q = "SELECT * FROM users WHERE username LIKE ?";
  db.query(q, [searchValue], (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    if(data.length > 0) {
      res.status(200).json(data);
    }
    else {
      res.status(404).json({message: "No users found"});
    }
  })
}