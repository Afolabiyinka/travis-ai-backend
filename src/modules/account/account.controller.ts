import { RequestHandler, Response } from "express";
import { EditUserPayload } from "../auth/auth.types";
import { deleteAccountService, editAccountService, userService } from "./account.service";
import { ApiError } from "@/shared/types/errorTypes";

const getUser: RequestHandler = async (req, res, next) => {
    const id = req.user?.id;
    if (!id) {
        throw new ApiError(
            401,
            "Unauthorized",
            "UNAUTHORIZED",
        );
    }

    try {

        const user = await userService(id)
        return res.status(200).json({
            user: {
                username: user?.username,
                email: user?.email,
                createdAt: user?.createdAt,
                updatedAt: user?.updatedAt,

            },
        });

    } catch (err) {
        next(err)
    }
};

const editAccount: RequestHandler = async (req, res, next) => {
    const id = req.user?.id;
    if (!id) {
        throw new ApiError(
            401,
            "Unauthorized",
            "UNAUTHORIZED",
        );
    }


    try {
        await editAccountService(id, req.body as EditUserPayload)
        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err);
        next(err)
    }
};

const deleteAccount: RequestHandler = async (req, res, next) => {
    const id = req.user?.id;
    if (!id) {
        return next(new ApiError(
            401,
            "Unauthorized",
            "UNAUTHORIZED"
        ));
    }

    try {
        await deleteAccountService(id);

        return res.status(200).json({
            message: "Account deleted successfully"
        });
    } catch (err) {
        console.error("Controller Error:", err);
        next(err);
    }
};
export { getUser, editAccount, deleteAccount };