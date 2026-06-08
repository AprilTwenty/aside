import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authenticate = (req, res, next) => {
    const authHeader =  req.headers.authorization;

    if (!authHeader) {
        throw new AppError(`Authentication required`, 401);
    }
    const [ type, token ] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        throw new AppError(`Invalid authorization format`, 401);
    }

    const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
    );
    req.user = decoded;
    next();
}
export default authenticate;