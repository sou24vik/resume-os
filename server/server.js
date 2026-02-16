import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRouter.js";
import resumeRouter from "./routes/ResumeRoute.js";
import aiRouter from "./routes/aiRouter.js";

const app = express()
const PORT = process.env.PORT || 3000;

// Database Connection
await connectDB()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://resume-ri3rajv14-souvik-das-projects-3bda5339.vercel.app"],
    credentials: true
}))

app.get("/", (req, res) => res.send("App is Live..."))

app.use("/api/users", userRouter)
app.use("/api/resumes", resumeRouter)
app.use("/api/ai", aiRouter)

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);

})