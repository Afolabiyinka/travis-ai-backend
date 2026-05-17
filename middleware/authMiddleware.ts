import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { DecodedUser } from "../types/auth";

import { configDotenv } from "dotenv";
import User from "../models/User";

configDotenv();
const jwtsecret = process.env.JWT_SECRET || "";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }

    const decoded = jwt.verify(token, jwtsecret) as DecodedUser;

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Token expired",
      });
    }
    console.log(err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
