import { parsePositiveInt } from "../utils/validator.js";

export const validateParamId = (req, res, next) => {
    try {
        req.validated ??= {};
        req.validated = {
            id: parsePositiveInt(req.params.id, "id")
        }
        next();
    } catch (error) {
        next(error);
    }
};