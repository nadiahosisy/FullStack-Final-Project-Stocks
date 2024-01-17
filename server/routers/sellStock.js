import express from "express";

import { sellStock } from "../controllers/sellStock.js";

const router = express.Router();

router.route("/:id").put(sellStock);

export default router;
