import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks/:userId", getTasks);
router.post("/tasks/:userId", createTask);
router.put("/tasks/:userId/:taskId", updateTask);
router.delete("/tasks/:userId/:taskId", deleteTask);

export default router;
