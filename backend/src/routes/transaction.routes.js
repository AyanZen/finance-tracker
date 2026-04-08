import express from "express";
import { addTransction, deleteTransaction, getTransantion } from "../controllers/transaction.controller.js";
import protect from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/", protect ,addTransction);
router.get("/", protect, getTransantion);
router.delete("/:id", protect, deleteTransaction);

export default router;
