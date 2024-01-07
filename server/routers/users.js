import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import User from "../models/User.js";

const router = express.Router({
  mergeParams: true,
});

import advancedResult from "../middleware/advancedResult.js";
import { protect, authorize } from "../middleware/auth.js";

//router.use(protect);
//router.use(authorize("admin"));
//router.use(authorize("user"));

router.route("/").get(advancedResult(User), getUsers).post(createUser);

router.route("/:id").get(getUser, User).put(updateUser).delete(deleteUser);

export default router;
