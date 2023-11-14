import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTweet = (req: Request, res: Response) => {
    res.send("Tweet created");
};

export const deleteTweet = (req: Request, res: Response) => {
    res.send("Tweet deleted");
};

export const updateTweet = (req: Request, res: Response) => {
    res.send("Tweet updated");
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
