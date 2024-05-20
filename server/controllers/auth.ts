import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";

export const signup = (req: Request, res: Response) => {
  const q = "SELECT * from users WHERE EMAIL = ?";
  db.query(q, [req.body.email], (err, data: any[]) => {
    if (err) return res.status(500).json("err");
    //check if the user already exists
    if (data.length) return res.status(409).json("Email already in use");

    //password hashing using bcrypt    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);      
    
    //insert data into database if user does not exists
    const q = "INSERT INTO users (`email`, `password_hash`, `username`) VALUES (?, ?, ?)"
    const values = [
      req.body.email,
      hash,
      req.body.username,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("User created successfully");
    })
  });
};

export const login = (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};
