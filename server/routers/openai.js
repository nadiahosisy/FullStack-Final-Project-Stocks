import express from "express";

import { getStockNews } from "../controllers/openai.js";

const router = express.Router();

router.route("/:stockName").get(getStockNews);

export default router;
