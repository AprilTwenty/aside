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
        req.validated ??= {};
        const { page, limit, sort, order, title } = req.query;
        if (page !== undefined) {
            req.validated.page = parsePositiveInt(page, "page");
        }
        if (limit !== undefined) {
           req.validated.limit = Math.min(parsePositiveInt(limit, "limit"), 500);
        }
        if (sort !== undefined) {
            if (!["title", "created_at"].includes(sort)) {
                throw new AppError(`Invalid sort field`, 400);
            }
            req.validated.sort = sort;
        }
        if (order !== undefined) {
            if (!["asc", "desc"].includes(order)) {
                throw new AppError(`Invalid order`, 400);
            }
            req.validated.order = order;
        }
        if (title !== undefined) {
            if (title.length > 255) {
                throw new AppError(`Title query too long`, 400);
            }
            req.validated.title = title;
        }
        next();
    } catch(error) {
        next(error);
    }
};

export const validateSaveId = (req, res, next) => {
    try {
        req.validated = {
            id: parsePositiveInt(req.params.id, "id")
        }
        next();
    } catch (error) {
        next(error)
    }
};