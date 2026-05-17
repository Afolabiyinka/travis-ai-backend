import type { Request, Response } from "express";
import { LoginPayload, RegisterPayload } from "../types/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
    | "none"
    | "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};



import User from "../models/User";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginPayload;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required fields: email and password are required.",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1hr" },
    );
    return res.status(200).json({
      message: "Login succesfull",
      token,
      user: { username: user.username, _id: user._id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body as RegisterPayload;

  if (!email || !password || !username) {
    return res.status(400).json({
      message:
        "Missing required fields: email, username and password are all required.",
    });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({
        message: "Email is already taken",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET || "secretkey",
      { expiresIn: "1hr" },
    );
    res.status(200).json({
      message: "User created succesfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register account",
    });
  }
};
