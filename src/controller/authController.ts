import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "SUPER SECRET";

function generateOTP(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export const userLogin = async (req: Request, res: Response) => {
    const { email } = req.body;

    const emailOTP = generateOTP();
    const expirationDate = new Date(
        new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
    );

    try {
        const newToken = await prisma.token.create({
            data: {
                type: "EMAIL",
                emailToken: emailOTP,
                expirationDate,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: { email },
                    },
                },
            },
        });
        console.log(newToken);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "somethin1g went wrong",
            error,
        });
    }
};

export const tokenVerification = async (req: Request, res: Response) => {};
