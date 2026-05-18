import { ApiError } from "@/shared/types/errorTypes";
import { findUserByEmail } from "./auth.repository";
import { LoginPayload, SignupPayload } from "./auth.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/shared/libs/prisma";
import { generateToken } from "@/shared/utils/generateToken";

export const jwtSecret = process.env.JWT_SECRET!;


const loginService = async (payload: LoginPayload) => {
    const { email, password } = payload

    //Check if the user with the email exists 
    const user = await findUserByEmail(email)
    if (!user) {
        throw new ApiError(404, "User not found", "AUTH_INVALID_CREDENTIALS",
        )
    }
    const passwordMatch = await bcrypt.compare(
        password,
        user.password,
    );
    if (!passwordMatch) {
        throw new ApiError(404, "Incorrect Password", "AUTH_INVALID_CREDENTIALS",
        )
    }
    const token = generateToken(user.id)

    return { token }

}

const signUpService = async (payload: SignupPayload) => {
    const { email, password, username } = payload

    //Check it user with email exists
    const emailTaken = await findUserByEmail(email);
    if (emailTaken) {
        throw new ApiError(400, "Email already in use", "AUTH_EMAIL_EXISTS",);
    };

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating the user  in the database
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
    });

    //Creating a jwt token with the user id
    const token = generateToken(user.id)

    return { token }
}

export { loginService, signUpService }