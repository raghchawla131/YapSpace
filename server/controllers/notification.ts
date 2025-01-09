import { Request, Response } from "express";
import db from "../db";

export const getNotifications = (req: Request, res: Response) => {
  const { user_id, is_read, limit, offSet } = req.query;

  if(!user_id) return res.status(400).json({message: "user_id is required"});
  const q = "SELECT * FROM notifications where user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
  const values: any[] = [user_id, Number(limit), Number(offSet)];
  db.query(q, values, (err, data) => {
    if(err) {
      console.error("Database error", err);
      return res.status(500).json({message: "Failed to fetch notifications", error: err})
    }
    return res.status(200).json({message: "Notifications fetched successfully", data});
  })
}

export const createNotification = (req: Request, res: Response) => {
  const { user_id, triggered_by, type, yap_id, content, is_read = false } = req.body;

  // Base query and values
  const fields = ["user_id", "triggered_by", "type", "is_read"];
  const placeholders = ["?", "?", "?", "?"];
  const values = [user_id, triggered_by, type, is_read];

  // Add optional fields dynamically
  if (yap_id) {
    fields.push("yap_id");
    placeholders.push("?");
    values.push(yap_id);
  }
  if (content) {
    fields.push("content");
    placeholders.push("?");
    values.push(content);
  }

  const query = `INSERT INTO notifications (${fields.join(", ")}) VALUES (${placeholders.join(", ")})`;

  // Execute query
  db.query(query, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Failed to create notification", error: err });
    }
    return res.status(201).json({ message: "Notification created successfully", data });
  });
};
