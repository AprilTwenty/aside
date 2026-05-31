import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import { Prisma } from "@prisma/client/extension";


const [ email,]
const routerAuth = Router();

routerAuth.post("/register", asyncHandler (async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const [ username, email ] = req.body;

    const existUsername = await Prisma.user({
        where: {
            Or: [
                { username },
                { email }
            ]
        }
    })
    if (existUsername) {
        throw new AppError(`Already exist username or email`, 409);
    }
}))