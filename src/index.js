import express from "express";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());

// Prueba
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Routes
app.use("/api", tasksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
