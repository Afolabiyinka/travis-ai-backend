import { Request, Response } from "express";
import { UpdatePasswordPayload, updateProfilePayload } from "../types/user";
import bcrypt from "bcrypt";
import User from "../models/User";


export const getUserDetails = async (req: Request, res: Response) => { }
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { email, username, profilePic, id } =
      req.body as updateProfilePayload;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (email) user.email = email;
    if (username) user.username = username;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Details updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        _id: updatedUser._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, id } = req.body as UpdatePasswordPayload;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is not correct" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Delete user from DB
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateProfilePic = async (req: Request, res: Response) => {
  const { profilePic, id } = req.body;
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    if (profilePic) user.profilePic = profilePic;
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
