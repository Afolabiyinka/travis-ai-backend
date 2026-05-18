import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export function generateToken(id: string) {
    const token = jwt.sign(
        {
            id: id,
        },
        jwtSecret,
        {
            expiresIn: "7d",
        }
    );
    return token
}