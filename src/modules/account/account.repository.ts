import prisma from "@/shared/libs/prisma";
import { EditUserPayload } from "../auth/auth.types";

export const getUserRepository = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

export const updateUserRepository = async (
    id: string,
    updates: EditUserPayload
) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return null;
    }

    return await prisma.user.update({
        where: { id },
        data: updates,
    });
};

export const deleteUserRepository = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        return null;
    }

    return await prisma.user.delete({
        where: { id },
    });
};