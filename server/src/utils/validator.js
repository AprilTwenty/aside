import AppError from "./AppError.js";

export function validateRequired(value, fieldName) {
    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
        throw new AppError(`Missing required ${fieldName}`, 400);
    }
};

export function validateEmail(value, fieldName = "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        throw new AppError(`Invalid ${fieldName} format`, 400);
    }
};

export function validateStringLength(value, fieldName, min, max) {
    if (typeof value !== "string") {
        throw new AppError(`${fieldName} must be string`, 400);
    }
    if (value.length < min || value.length > max) {
        throw new AppError(`${fieldName} must be between ${min} and ${max} characters`, 400);
    }
};

export function validateUrl(url, fieldName = "url") {
    try {
        const urlObj = new URL(url);
        if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
            throw new Error();
        }
    } catch {
        throw new AppError(`Ivalid ${fieldName} format`, 400);
    }
};

export function parsePositiveInt(value, fieldName = "value") {
    const num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
        throw new AppError(`Invalid ${fieldName}`, 400);
    } 
    return num;
};

export function validateId(paramName) {
    return (req, res, next) => {
        try {
            parsePositiveInt(paramName, paramName);
            next();
        } catch {
            next(error);
        }
    };
};