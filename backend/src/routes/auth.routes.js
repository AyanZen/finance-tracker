import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js";
// import {profile} from "../controllers/user.controller.js";
// import protect from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", protect, profile)

export default router;