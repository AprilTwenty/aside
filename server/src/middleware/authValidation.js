import AppError from "../utils/AppError.js";
import { normalizeDisplayName, normalizeEmail } from "../utils/sanitizer.js";
import { validateEmail, validateRequired, validateStringLength } from "../utils/validator.js";

export const registerValidation = (req, res, next) => {
    req.validated ??= {};
    req.validated.email = normalizeEmail(req.body.email);
    req.body.display_name = normalizeDisplayName(req.body.display_name);

    const { email, password, display_name } = req.body;
    validateRequired(email, "email");
    validateEmail(email, "email");
    
    validateRequired(password, "password");
    validateStringLength(password, "password", 8, 100);

    validateRequired(display_name, "display_name");
    validateStringLength(display_name, "display_name", 3, 50);

    next();
}

export const loginValidation = (req, res, next) => {
    const email = normalizeEmail(req.body.email);

    const { password } = req.body;

    validateRequired(email, "email");
    req.validated = {
        email: validateEmail(email, "email")
    }

    validateRequired(password, "password");
    validateStringLength(password, "password", 8, 200);

    next();
}