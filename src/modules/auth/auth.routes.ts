import { Router } from "express";
import { login, logout, signup } from "./auth.controller";
import { validate } from "@/shared/middleware/validation";
import { loginSchema, signupSchema } from "./auth.validation";
import { authLimiter } from "@/shared/middleware/rateLimiters";


export const AuthRouter = Router();

AuthRouter.use(authLimiter)

AuthRouter.route("/login").post(validate(loginSchema), login);
AuthRouter.route("/signup").post(validate(signupSchema), signup);
AuthRouter.route("/logout").post(logout)
