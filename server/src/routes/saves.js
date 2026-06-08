import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authenticate from "../middleware/authenticate.js";
import prisma from "../../prisma/client.js"
import { createSaveValidation, validateSaveId, validateSaveQuery } from "../middleware/saveValidation.js";
import { parsePositiveInt } from "../utils/validator.js";

const routerSaves = Router();

routerSaves.post("/", authenticate, createSaveValidation, asyncHandler(async(req, res) => {
    const { title, url, note } = req.body;
    const user = req.user;
    const createdPost = await prisma.saveItem.create({
        data: {
            user_id: user.id,
            title,
            url,
            note
        }
    })
    return res.status(201).json({
        success: true,
        message: "Created post successfully",
        data:createdPost
    });
}));

routerSaves.get("/", validateSaveQuery, asyncHandler(async(req, res) => {
    const { title, sort = "created_at", order = "desc", page = 1, limit = 50 } = req.validated;
    const safeOrder = order === "asc" ? "asc" : "desc";
    const allowedSortField = [
        "title",
        "created_at"
    ];
    const safeSort = allowedSortField.includes(sort) ? sort : "created_at";
    const whereClause = {
        ...(title && {
            title: {
                contains: title,
                mode: "insensitive"
            }
        })
    }
    const [ saves, total ] = await Promise.all([
        prisma.saveItem.findMany({
            where: whereClause,
            orderBy: {
                [safeSort]: safeOrder
            },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                user: {
                    select: {
                        display_name: true
                    }
                }
            }
        }),
        prisma.saveItem.count({
            where: whereClause
        })
    ]);
    const finalData = saves.map(item => ({
        id: item.id,
        user: item.user.display_name,
        title: item.title,
        url: item.url,
        note: item.note,
        created_at: item.created_at,
        updated_at: item.updated_at
    }));
    return res.status(200).json({
        success: true,
        data: finalData,
        pagination: {
            page: page,
            limit: limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    });
}));

routerSaves.get("/:id", validateSaveId, asyncHandler(async(req, res) => {
    const id = req.validated.id;
    const save = await prisma.saveItem.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    display_name: true
                }
            }
        }
    });
    if (!save) {
        throw new AppError(`Save item not found`, 404)
    }
    return res.status(200).json({
        success: true,
        data: {
            id: save.id,
            user: save.user.display_name,
            title: save.title,
            url: save.url,
            note: save.note,
            created_at: save.created_at,
            updated_at: save.updated_at
        }
    });
}));


export default routerSaves;