import express from "express";

import { getStockCharts } from "../controllers/yahoo.js";

const router = express.Router();

router.route("/:yahooStock").get(getStockCharts);

export default router;
