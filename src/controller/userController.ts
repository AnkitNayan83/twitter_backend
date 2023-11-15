import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            include: {
                tweet: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
            },
        });
        res.status(201).json({
            success: true,
            message: "User Created",
            newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "User with this credential exists",
        });
    }
};

export const updateUser = (req: Request, res: Response) => {
    res.send("update user...");
};

export const deleteUser = (req: Request, res: Response) => {
    res.send("delete user...");
};
