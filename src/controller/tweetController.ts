import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type AuthRequest = Request & { user?: User };

export const createTweet = async (req: AuthRequest, res: Response) => {
    const { content } = req.body;
    if (!content)
        return res.status(406).json({
            message: "Tweet description is required",
        });
    const user = req.user;
    if (!user)
        return res.status(401).json({
            message: "Authentication required",
        });

    try {
        const newTweet = await prisma.tweet.create({
            data: {
                desc: content,
                userId: user.id,
            },
        });
        res.status(201).json({
            message: "tweet created successfully",
            newTweet,
        });
    } catch (error) {
        res.status(500).json({
            message: "server not working",
        });
    }
};

export const deleteTweet = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id: Number(id) },
        });
        if (!tweet)
            return res.status(404).json({
                message: "no tweet with this id exists",
            });
        if (tweet.userId !== user?.id)
            return res.status(401).json({
                message: "You are not authoried to delete this tweet",
            });

        await prisma.tweet.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({
            message: "tweet deleted successfully",
        });
    } catch (error) {
        res.status(501);
    }
};

export const updateTweet = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const { content } = req.body;

    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id: Number(id) },
        });
        if (!tweet)
            return res.status(404).json({
                message: "no tweet with this id exists",
            });
        if (tweet.userId !== user?.id)
            return res.status(401).json({
                message: "You are not authoried to update this tweet",
            });

        const newTweet = await prisma.tweet.update({
            where: { id: Number(id) },
            data: { desc: content },
        });

        res.status(200).json({
            message: "tweet updated successfully",
            newTweet,
        });
    } catch (error) {
        res.status(501);
    }
};

export const getSingleTweet = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await prisma.tweet.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                user: true,
            },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "no tweet available with this id",
        });
    }
};

export const getAllTweet = async (req: Request, res: Response) => {
    try {
        const data = await prisma.tweet.findMany({
            include: {
                user: true,
            },
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "no tweets available",
        });
    }
};
