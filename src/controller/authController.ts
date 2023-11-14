import { Request, Response } from "express";

export const userRegister = (req: Request, res: Response) => {
    res.send("register");
};

export const userLogin = (req: Request, res: Response) => {
    res.send("Login");
};
