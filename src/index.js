import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken } from "./middlewares/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Prueba
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, tasksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
