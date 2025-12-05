import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { LoginPayload, RegisterPayload } from "../types/auth";
import User from "../models/User";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginPayload;
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, lastName, firstName, password } = req.body as RegisterPayload;

  if (!email || !lastName || !firstName || !password) {
    return res.status(400).json({
      message:
        "Missing required fields: email, firstName, lastName, and password are all required.",
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
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: hashedPassword,
      username: `${firstName} ${lastName}`,
    });
    res.status(200).json({
      message: "User created succesfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register account",
      error,
    });
  }
};
