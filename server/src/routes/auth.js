import { Router } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../../prisma/client.js"
import AppError from "../utils/AppError.js";
import { loginValidation, registerValidation } from "../middleware/authValidation.js";
import authenticate from "../middleware/authenticate.js";
import jwt from "jsonwebtoken";

const routerAuth = Router();

routerAuth.post("/register", registerValidation, asyncHandler (async (req, res) => {
    const { email } = req.validate;
    const { password, display_name } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new AppError(`Email is already registered`, 409);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
        data: {
            email,
            password_hash: passwordHash,
            display_name
        }
    });
    return res.status(201).json({
        success: true,
        data: {
            id: createdUser.id,
            email: createdUser.email,
            display_name: createdUser.display_name
        }
    });
}));

routerAuth.post("/login", loginValidation, asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        throw new AppError(`Invalid username or password`, 401);
    }
    if (!user.password_hash) {
    throw new AppError("Invalid username or password", 401);
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        throw new AppError(`Invalid username or password`, 401);
    }
    if (!process.env.SECRET_KEY) {
        throw new AppError(`Server configuration error`, 500);
    }
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            display_name: user.display_name
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "15m"
        }
    );
    return res.status(200).json({
        success: true,
        message: "Login successfully",
        token
    });
}));

routerAuth.get("/me", authenticate, asyncHandler(async(req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    });
    return res.status(200).json({
        success: true,
        data: user
    });
}))

export default routerAuth;