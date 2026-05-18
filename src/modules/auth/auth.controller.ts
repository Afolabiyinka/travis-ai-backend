import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import { LoginPayload, SignupPayload } from "./auth.types";
import { loginService, signUpService } from "./auth.service";
import { cookieOptions } from "@/shared/utils/cookieOptions";

const login: RequestHandler = async (req, res, next) => {
    try {
        const { token } = await loginService(req.body as LoginPayload)

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        next(err)
    }
};

const signup: RequestHandler = async (req, res, next) => {
    try {
        const { token } = await signUpService(req.body as SignupPayload)
        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
        next(err)
    }
};

const logout: RequestHandler = async (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.clearCookie("token", cookieOptions);
    res.json({ message: "Logged out" });
};


export { login, signup, logout, };
