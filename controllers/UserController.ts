import { Request, Response } from "express";
import User from "../models/User";
import { updateProfilePayload } from "../types/user";

export const updateProfile = (req: Request, res: Response) => {
  const { email, password, username, profilePic } =
    req.body as updateProfilePayload;
};
