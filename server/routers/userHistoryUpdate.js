import express from "express";

import { updateUserStockHistory } from "../controllers/userHistoryUpdate.js";

const router = express.Router();
router.route("/:id").put(updateUserStockHistory);

export default router;
