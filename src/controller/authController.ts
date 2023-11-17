import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "SUPER SECRET";

function generateOTP(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateJwtToken(tokenId: number): string {
    const jwtPayload = { tokenId };

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: "HS256",
        noTimestamp: true,
    });
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

export const tokenVerification = async (req: Request, res: Response) => {
    const { email, emailToken } = req.body;

    const DBtoken = await prisma.token.findUnique({
        where: { emailToken },
        include: {
            user: true,
        },
    });

    if (!DBtoken || !DBtoken.valid || email !== DBtoken?.user.email) {
        return res.status(401).json({
            message: "Wrong OTP",
        });
    }

    const currentTime = new Date();
    if (DBtoken.expirationDate < currentTime) {
        return res.status(401).json({
            message: "OTP Expired",
        });
    }

    const expirationDate = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
    );

    //Statefull JWT token
    const apiToken = await prisma.token.create({
        data: {
            type: "API",
            expirationDate,
            user: {
                connect: {
                    email,
                },
            },
        },
    });

    await prisma.token.update({
        where: {
            id: DBtoken.id,
        },
        data: {
            valid: false,
        },
    });

    const authToken = generateJwtToken(apiToken.id);

    res.status(200).json({ authToken });
};
