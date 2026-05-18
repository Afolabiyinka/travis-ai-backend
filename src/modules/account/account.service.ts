import { ApiError } from "@/shared/types/errorTypes";
import { deleteUserRepository, getUserRepository, updateUserRepository } from "./account.repository";
import { EditUserPayload } from "../auth/auth.types";

export const userService = async (id: string) => {

    try {
        const user = await getUserRepository(id)
        return user

    }
    catch (err) {
        console.error(err);
        throw new ApiError(
            500,
            "INTERNAL_SERVER_ERROR",
            "Something went wrong"
        );
    }
}

export const editAccountService = async (id: string, updates: EditUserPayload) => {
    try {
        const updatedUser = await updateUserRepository(id, updates);

        if (!updatedUser) {
            throw new ApiError(
                404,
                "Account not found",
                "The account you are trying to update does not exist"
            );
        }
    }
    catch (err) {
        throw new ApiError(
            500,
            "INTERNAL_SERVER_ERROR",
            "Something went wrong"
        );
    }
}

export const deleteAccountService = async (id: string) => {
    try {
        const deletedUser = await deleteUserRepository(id);

        if (!deletedUser) {
            throw new ApiError(
                404,
                "Not Found",
                "The account you are trying to delete does not exist."
            );
        }

        return deletedUser;
    } catch (err) {
        if (err instanceof ApiError) {
            throw err;
        }

        console.error("Delete Account Error:", err);
        throw new ApiError(
            500,
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred while deleting the account."
        );
    }
}