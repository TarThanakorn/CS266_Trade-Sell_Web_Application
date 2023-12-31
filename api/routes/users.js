import express from "express"
import {
    getUser,
    updateProfile,
  } from "../controllers/user.js";

const router = express.Router()

router.get("/:id", getUser);
router.put("/:id", updateProfile);

export default router