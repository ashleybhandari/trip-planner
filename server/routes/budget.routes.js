import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addToBudget,
  getBudget,
  removeFromBudget,
} from "../controllers/budget.controller.js";

const router = express.Router();
router.post("/trip/slug/:slug/budget", verifyToken, addToBudget);
router.get("/trip/slug/:slug/budget", verifyToken, getBudget);
router.delete("/trip/slug/:slug/budget/:id", verifyToken, removeFromBudget);
export default router;
