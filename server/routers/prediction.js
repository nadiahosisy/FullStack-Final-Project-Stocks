import express from "express";

import { makePrediction } from "../controllers/prediction.js";

const router = express.Router();

router.route("/:stockName").get(makePrediction);

export default router;
