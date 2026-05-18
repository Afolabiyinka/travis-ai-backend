import { Router } from "express";
import { deleteAccount, editAccount, getUser } from "./account.controller";
import { authMiddleware } from "@/shared/middleware/authMiddleware";

export const AccountRouter = Router();


AccountRouter.use(authMiddleware)
AccountRouter.route("/")
    .get(getUser)
    .put(editAccount)
    .delete(deleteAccount);