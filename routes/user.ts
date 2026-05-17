import { Router } from "express";
import {
  changePassword,
  deleteAccount,
  updateProfile,
  updateProfilePic,
} from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

export const UserRouter = Router();

UserRouter.route("/").put(updateProfile);
UserRouter.route("/change-password").put(authMiddleware, changePassword);
UserRouter.route("/delete").delete(deleteAccount);
UserRouter.route("/profile-pic").put(updateProfilePic);
