import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cors({credentials:true}));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running");
});

export default app;
