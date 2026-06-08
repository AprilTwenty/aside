import { parsePositiveInt, validateRequired, validateStringLength, validateUrl } from "../utils/validator.js";

export const createSaveValidation = (req, res, next) => {
    const { title, url, note } = req.body;
    
    validateRequired(title, "title");
    validateStringLength(title, "title", 3, 200);

    validateRequired(url, "url");
    validateUrl(url, "url");

    if (note) {
        validateStringLength(note, "note", 1, 5000)
    }
    next();
}

export const validateSaveQuery = (req, res, next) => {
    try {
        const { page, limit, sort, order, title } = req.query;
        if (page !== undefined) {
            parsePositiveInt(page, "page");
        }
        if (limit !== undefined) {
            parsePositiveInt(limit, "limit");
        }
        if (sort !== undefined && !["title", "created_at"].includes(sort)) {
            throw new AppError(`Invalid sort field`, 400);
        }
        if (order !== undefined && !["asc", "desc"].includes(order)) {
            throw new AppError(`Invalid order`, 400);
        }
        if (title !== undefined && title.length > 255) {
            throw new AppError(`Title query too long`, 400);
        }
        next();
    } catch(error) {
        next(error);
    }
}