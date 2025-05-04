import express from "express"; 
import {verifyToken} from "../middleware/auth.js"
import {addToBudget,getBudget} from "../controllers/budget.controller.js"

const router = express.Router(); 
router.post("/trip/slug/:slug/budget", verifyToken, addToBudget); 
router.get("/trip/slug/:slug/budget", verifyToken, getBudget); 
export default router; 

