import express from "express"; 
import {verifyToken} from "../middleware/auth.js"
import {addChecklistItem,getChecklistById,  deleteChecklisItem,createEmptyChecklist, getAllChecklists} from "../controllers/checklist.controller.js"

const router = express.Router(); 
router.post("/trip/slug/:slug/checklist/:checklist_id", verifyToken, addChecklistItem); 
router.get("/trip/slug/:slug/checklist/:checklist_id", verifyToken, getChecklistById); 
router.delete("/trip/slug/:slug/checklist/:checklist_id/item/:checklist_item_id", verifyToken, deleteChecklisItem); 
router.post("/trips/slug/:slug/checklists", verifyToken, createEmptyChecklist);
router.get("/trips/slug/:slug/checklists", verifyToken, getAllChecklists);

export default router; 

