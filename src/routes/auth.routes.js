import { Router } from "express";
import {
  login,
  logout,
  register,
  googleLogin,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/google", googleLogin);

export default router;
