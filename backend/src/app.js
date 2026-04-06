import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("✅ Backend is running");
});

export default app;
