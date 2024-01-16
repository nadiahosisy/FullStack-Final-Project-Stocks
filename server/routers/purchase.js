import express from "express";

import { purchaseStock } from "../controllers/purchase.js";

const router = express.Router();

router.route("/:id").put(purchaseStock);

export default router;
