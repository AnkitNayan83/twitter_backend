import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER SECRET";

const prisma = new PrismaClient();

type AuthRequest = Request & { user?: User };

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const jwtToken = authHeader?.split(" ")[1];
    if (!jwtToken) {
        return res.status(401).json({
            message: "you are not authorized",
        });
    }

    try {
        const payload = (await jwt.verify(jwtToken, JWT_SECRET)) as { tokenId: number };
        const dbToken = await prisma.token.findUnique({
            where: {
                id: payload.tokenId,
            },
            include: {
                user: true,
            },
        });

        if (!dbToken?.valid || dbToken.expirationDate < new Date()) {
            return res.status(401).json({
                message: "API token expired",
            });
        }

        req.user = dbToken.user;
    } catch (error) {
        return res.status(401);
    }

    next();
}
