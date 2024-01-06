import express from "express";

import {
  updateUserStockHistory,
  getUserStockHistory,
} from "../controllers/userStockHistory.js";

const router = express.Router();
router.route("/:id").put(updateUserStockHistory);

router.route("/:id").get(getUserStockHistory);

export default router;
