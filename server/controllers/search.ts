import { Request, Response } from "express";
import db from "../db";

export const searchUser = (req: Request, res: Response) => {
  const searchValue = `%${req.body.username}%`;
  const userIdToExclude = req.body.user_id;
  const q = "SELECT * FROM users WHERE username LIKE ? AND user_id != ?";
  db.query(q, [searchValue, userIdToExclude], (err, data: any[]) => {
    if (err) return res.status(500).json(err);
    if(data.length > 0) {
      res.status(200).json(data);
    }
    else {
      res.status(404).json({message: "No users found"});
    }
  })
}