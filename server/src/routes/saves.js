import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import authenticate from "../middleware/authenticate.js";
import prisma from "../../prisma/client.js"
import { createSaveValidation, validateSaveQuery } from "../middleware/saveValidation.js";

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
    const { title, page = 1, limit = 50, sort = "created_at", order = "desc" } = req.query;
    const safeOrder = order === "asc" ? "asc" : "desc";
    const allowedSortField = [
        "title",
        "created_at"
    ];
    const safeSort = allowedSortField.includes(sort) ? sort : "created_at";
    const pageInt = parseInt(page, 10) || 1;
    const limitParse = parseInt(limit, 10) || 50;
    const limitInt = Math.min(limitParse, 500);
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
            skip: (pageInt - 1) * limitInt,
            take: limitInt,
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
            page: pageInt,
            limit: limitInt,
            total,
            totalPages: Math.ceil(total / limitInt)
        }
    });
}));


export default routerSaves;