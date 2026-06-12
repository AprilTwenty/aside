import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authenticate from "../middleware/authenticate.js";
import prisma from "../../prisma/client.js"
import { createSaveValidation, validateSaveQuery, validateSavePatch } from "../middleware/saveValidation.js";
import AppError from "../utils/AppError.js";
import { validateParamId } from "../middleware/commonValidation.js";

const routerSaves = Router();

routerSaves.post("/", authenticate, createSaveValidation, asyncHandler(async(req, res) => {
    const { title, url, note, hostname } = req.validated;
    const user = req.user;
    const createdPost = await prisma.saveItem.create({
        data: {
            user_id: user.id,
            title,
            url,
            note,
            ...(hostname !== undefined && { source_domain: hostname })
            
        }
    });
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
        "created_at",
        "source_domain"
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
        source_domain: item.source_domain,
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

routerSaves.get("/:id", validateParamId, asyncHandler(async(req, res) => {
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
            source_domain: save.source_domain,
            created_at: save.created_at,
            updated_at: save.updated_at
        }
    });
}));

routerSaves.patch("/:id", authenticate, validateSavePatch, asyncHandler(async(req, res) => {
    const { id, title, url, note, hostname } = req.validated;
    if (title === undefined && url === undefined && note === undefined && hostname === undefined) {
        throw new AppError(`At least one field is required`, 400);
    }
    const saveChange = {
        ...(title !== undefined && { title: title }),
        ...(url !== undefined && { url: url }),
        ...(note !== undefined && { note: note }),
        ...(hostname !== undefined && { source_domain: hostname })
    };
    const existSave = await prisma.saveItem.findUnique({
        where: {
            id
        }
    });
    if (!existSave) {
        throw new AppError(`Save id ${id} not found`, 404);
    }
    if (existSave.user_id !== req.user.id) {
        throw new AppError(`Forbidden`, 403);
    }
    const savePatch = await prisma.saveItem.update({
        where: {
            id: id
        },
        data: saveChange,
        include:{
            user: {
                select: {
                    display_name: true
                }
            }
        }
    });
    return res.status(200).json({
        success: true,
        data: {
            id: savePatch.id,
            user: savePatch.user.display_name,
            title: savePatch.title,
            url: savePatch.url,
            note: savePatch.note,
            source_domain: savePatch.source_domain,
            created_at: savePatch.created_at,
            updated_at: savePatch.updated_at
        }
    });
}));

routerSaves.delete("/:id", authenticate, validateParamId, asyncHandler(async(req, res) => {
    const id = req.validated.id;
    const existSave = await prisma.saveItem.findUnique({
        where: {
            id: id
        }
    })
    if (!existSave) {
        throw new AppError(`Save id ${id} not found`, 404);
    }
    if (existSave.user_id !== req.user.id) {
        throw new AppError(`Forbidden`, 403);
    }
    await prisma.saveItem.delete({
        where: {
            id : id
        }
    });
    return res.status(200).json({
        success: true,
        message: "Save deleted successfully"
    });
}));

export default routerSaves;