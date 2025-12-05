import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

export const AuthRouter = Router();

AuthRouter.route("/login").post(loginUser);
AuthRouter.route("/signup").post(registerUser);
