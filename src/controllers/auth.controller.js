import * as authService from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../schema/auth.schema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils.js";

export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", issues: validatedData.error.issues });
    }
    const { email, password } = validatedData.data;

    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const validatedData = registerSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", issues: validatedData.error.issues });
    }
    const { email, password, name } = validatedData.data;

    const validatedUser = await authService.getUserByEmail(email);
    if (validatedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authService.createUser(email, hashedPassword, name);
    res.status(200).json({
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
