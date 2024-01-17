import express from "express";

import {
  sellStock,
  getUserLatestStockPrices,
} from "../controllers/sellStock.js";

const router = express.Router();

router.route("/:id").put(sellStock);
router.route("/:id").get(getUserLatestStockPrices);

export default router;
