import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const q =
      "SELECT `fname`, `lname`, `phone`, `email`, `birthday`, `img` FROM users WHERE id = ? ";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json(data[0]);
    });
  };
  
  export const updateProfile = (req, res) => {
    const { fname, lname, phone, birthday } = req.body.userData;
    const img = req.body.img;
    
    const userId = req.params.id;
  
    const q = 'UPDATE users SET fname=?, lname=?, phone=?, birthday=?, img=? WHERE id=?';
  
    db.query(q, [fname, lname, phone, birthday, img, userId], (err, result) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json({ message: 'Profile updated successfully' });
    });
  };